from fastapi import WebSocket, APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from app.services.ai import llm
from app.services.transcription.speech import Speech
from app.schemas import TokenData
from app.oauth2 import socket_get_current_client

from app.services.transcription.socket_manager import RealtimeTranscriptionSession
from app.database import get_db
from app.services.filters_processing import process_llm_filters

import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.schemas import SearchHotelsRequest, SearchFilters

load_dotenv()

API_KEY = os.getenv('SPEECHMATICS_API_KEY')
PATH_TO_FILE = "received_audio.wav"
CONNECTION_URL = "wss://eu2.rt.speechmatics.com/v2"

router = APIRouter(tags=["foo"])

@router.websocket("/ws/audio/{language}")
async def audio_websocket(
    ws: WebSocket,
    language: str,
    current_user: TokenData = Depends(socket_get_current_client),
    db: Session = Depends(get_db)
):
    await ws.accept()

    session = RealtimeTranscriptionSession(user_id=current_user.user_id, ws=ws, language=language)

    json_data = await ws.receive_json()

    previous_filters =  json_data['previous_filters']
    previous_ai_message = json_data['previous_message']

    session.ws_speech = Speech(connection_url=CONNECTION_URL, api_key=API_KEY, language_code=language, audio_encoding='pcm_s16le', max_delay=2)
    session.setup_logging()

    await session.start_transcription_task()

    try:
        await session.run_realtime_transcription()
        print("Transcript: ", session.transcript)

    except Exception as e:
        print('Error during transcription:', e)
    
    transcript = session.transcript

    if not transcript:
        raise HTTPException(status_code=400, detail="No transcript received from the session")

    print('sending to gemini...', transcript)

    response = await llm.invoke(transcript, previous_filters, previous_ai_message)     
    filters_dict = llm.parse_llm_response(response.text)
    response = await process_llm_filters(filters_dict, SearchHotelsRequest, SearchFilters, db)      # BUG : here the VoiceSearchSchema should expect place as a string but instead the SearchHotelsRequestSchema has place as a 'Place' type

    hotels = response['data']
    response['data'] = [dict(hotel) for hotel in hotels]

    await ws.send_json(jsonable_encoder(response))
    await ws.close()