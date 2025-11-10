import asyncio
from enum import Enum
from fastapi import APIRouter, WebSocket, Depends
import io
import speechmatics

from app.services.transcription.speech import Speech

class SessionState(Enum):
    WAITING_FOR_CONFIG = "waiting_for_config"
    READY_FOR_AUDIO = "ready_for_audio"
    RECEIVING_AUDIO = "receiving_audio"
    PROCESSING_AUDIO = "processing_audio"
    PROCESSING_LLM = "processing_llm"
    COMPLETE = "complete"

class VoiceSearchSession:
    def __init__(self, user_id: int, ws: WebSocket, language: str):
        self.user_id = user_id
        self.ws = ws
        self.language = language
        self.state = SessionState.WAITING_FOR_CONFIG

        # Session data
        self.current_filters_string = ""
        self.previous_ai_message = ""

        # Audio data
        self.audio_data = b""
        self.transcript = ""
        self.ws_speech: Speech | None = None
        self.send_task: asyncio.Task | None = None

        # Timestamps
        self.audio_start_time = None
        self.transcription_start_time = None
    

    def setup_logging(self):
        def print_transcript(msg):
            print(f"[   FULL] {msg['metadata']['transcript']}")
        self.ws_speech.add_event_handler(
            event_name=speechmatics.models.ServerMessageType.AddTranscript,
            event_handler=print_transcript,
        )

    async def start_transcription_task(self):
        self.state = SessionState.READY_FOR_AUDIO
        await self.ws_speech.start()
        self.send_task = asyncio.create_task(self.ws_speech.send_audio_from_queue())
    
    async def run_realtime_transcription(self):
        if self.send_task is None:
            raise RuntimeError("Transcription task not started. Call start_transcription_task first.")
        
        self.state = SessionState.RECEIVING_AUDIO
        try: 
            while True:
                    message = await self.ws.receive()
                    if 'bytes' in message: 
                        audio_chunk = message['bytes']
                        self.audio_data += audio_chunk
                        await self.ws_speech.audio_queue.put(audio_chunk)
                    
                    elif 'text' in message:
                        text = message['text']
                        if text == 'stop_recording':
                            await self.ws_speech.audio_queue.put(None)
                            self.state = SessionState.PROCESSING_AUDIO
                            break
                
        except Exception as e:
            print(f"Error receiving message: {e}")
            raise
    
        finally:
            await self.send_task
            await self.ws_speech.run(io.BytesIO(self.audio_data))
            self.transcript = self.ws_speech.transcript
    
    async def process_with_llm(self, transcript: str):
        """
        Process the transcript with the LLM and update the session state.
        """
        self.state = SessionState.PROCESSING_LLM
        # Simulate LLM processing
        pass        # TODO: complete this