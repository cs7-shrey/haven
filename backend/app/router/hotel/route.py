import asyncio
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, WebSocket, Query, WebSocketDisconnect, WebSocketException
from sqlalchemy.orm import Session
import os

from app.database import get_db
from app.schemas import ChatMode, TokenData
from app.oauth2 import get_current_client, socket_get_current_client
from app.services.crud.hotel.info import get_hotel_info_by_id, get_hotel_room_info
from app.services.hotel_info_agent import HotelChatAgent
from app.services.queues import queue_maps
from app.services.transcription.socket_manager import RealtimeTranscriptionSession
from app.services.transcription.speech import Speech

from .schemas import HotelInfoResponse, HotelRoomResponse

router = APIRouter(prefix="/hotel", tags=["hotel"])

load_dotenv()

API_KEY = os.getenv('SPEECHMATICS_API_KEY')
PATH_TO_FILE = "received_audio.wav"
CONNECTION_URL = "wss://eu2.rt.speechmatics.com/v2"

@router.get("/{id}", response_model=HotelInfoResponse)
async def get_hotel_data(id: int, db: Session = Depends(get_db)):
    try:
        return get_hotel_info_by_id(id, db)
    except Exception as e:
        print(e)

@router.get("/{id}/rooms", response_model=list[HotelRoomResponse])
async def get_hotel_rooms(id: int, db: Session = Depends(get_db)):
    try:
        return get_hotel_room_info(id, db)
    except Exception as e:
        print(e)
        

@router.websocket("/exp/{id}/ws/chat")  
async def hotel_chat_ws(
    ws: WebSocket, 
    hotel_name: str = Query(...), 
    hotel_location: str = Query(...), 
    current_user: TokenData = Depends(socket_get_current_client)
):
    await ws.accept()
    json_data = await ws.receive_json()
    agent = HotelChatAgent(hotel_name=hotel_name, location=hotel_location, hotel_info=json_data['hotel_info'])
    while True:
        try:
            mode = await ws.receive_text()
            print(mode)
            print(mode == ChatMode.text)
            if mode == ChatMode.text:
                message = await ws.receive_text()
                response = await agent.talk(message)
                await ws.send_text(response)
            elif mode == ChatMode.voice:
                # create a queue and await for transcript
                transcript_queue = queue_maps['chat']
                transcript_queue[current_user.user_id] = asyncio.Queue()
                print('queue created')
                transcript = ''
                while not transcript:
                    transcript = await transcript_queue[current_user.user_id].get()
                reponse = await agent.talk(transcript)
                await ws.send_text(reponse)
        except WebSocketDisconnect:
            print('chat ws disconnected') 
            return
        except WebSocketException:
            print("an error occured in web socket")
            return
        
@router.websocket("/ws/chat")  
async def exp_chat_ws(
    ws: WebSocket, 
    hotel_name: str = Query(...), 
    hotel_location: str = Query(...), 
    current_user: TokenData = Depends(socket_get_current_client),
    language: str = Query("en")
):
    await ws.accept()
    
    # Receive hotel info after accepting connection
    json_data = await ws.receive_json()
    agent = HotelChatAgent(hotel_name=hotel_name, location=hotel_location, hotel_info=json_data['hotel_info'])

    # Start the chat session
    while True:
        try:
            mode = await ws.receive_text()

            if mode == ChatMode.text:
                message = await ws.receive_text()
                response = await agent.talk(message)
                await ws.send_text(response)

            elif mode == ChatMode.voice:
                session = RealtimeTranscriptionSession(
                    user_id=current_user.user_id, 
                    ws=ws, 
                    language=language
                )
                print(CONNECTION_URL, API_KEY, language)
                session.ws_speech = Speech(
                    connection_url=CONNECTION_URL, 
                    api_key=API_KEY, 
                    language_code=language, 
                    audio_encoding='pcm_s16le', 
                    max_delay=2
                )
                session.setup_logging()
                await session.start_transcription_task()

                try:
                    await session.run_realtime_transcription()
                    transcript = session.transcript

                    response = await agent.talk(transcript)
                    await ws.send_text(response)

                except Exception as e:
                    print('Error during transcription:', e)
                    await ws.send_text("Error occured in voice mode. Please try again.")

        except WebSocketDisconnect:
            print('chat ws disconnected') 
            return
        except WebSocketException:
            print("an error occured in web socket")
            return