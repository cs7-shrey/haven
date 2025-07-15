import { useState, useRef, useEffect, useCallback } from "react";
import { AudioService } from "@/lib/audioService";
import { useSocketStore } from "@/store/useSocketStore";
import { useHotelStore } from "@/store/useHotelStore";
import { generateCurrentFiltersAsString } from "@/lib/utils";
import type { BackendFilters, Status, Hotel } from "@/types";

interface Options {
    onFiltersReceived: (filters: BackendFilters, status: Status, hotelData: Hotel[]) => void
}
export const useVoiceSearch = ({ onFiltersReceived }: Options) => {
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | undefined>(undefined);
    const audioServiceRef = useRef<AudioService>(undefined);

    const {
        audioSocket,
        connectAudioSocket,
        setWaitingForMessage,
    } = useSocketStore();

    const audioServiceCleanup = useCallback(() => {
        // close the web socket connection
        if (audioServiceRef.current) {
            audioServiceRef.current.cleanup();
            audioServiceRef.current = undefined
        }
    }, []);

    useEffect(() => {
        return () => {
            audioServiceCleanup();
        };
    }, [audioServiceCleanup]);

    const toggleStreaming = async () => {
        if (isStreaming) {
            if (audioSocket?.readyState === WebSocket.OPEN) {
                audioSocket.send("stop_recording");
                setWaitingForMessage(true);
            }
            audioServiceCleanup();
            setIsStreaming(false);
        } else {
            try {
                const audioSocket = await connectAudioSocket();
                if(!audioSocket) {
                    throw new Error("Failed to start voice search");
                }

                const { infoMessage } = useHotelStore.getState();

                // Send previous state
                audioSocket.send(
                    JSON.stringify({
                        "previous_filters": generateCurrentFiltersAsString(), 
                        "previous_message": infoMessage
                    })
                );

                // Set trigger for result
                audioSocket.onmessage = (message) => {
                    try {
                        const jsonResponse = JSON.parse(message.data);
                        if (jsonResponse.status) {
                            const filters = jsonResponse.filters;
                            onFiltersReceived(filters, jsonResponse.status, jsonResponse.data);
                        }
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                }
                audioSocket.onclose = () => {
                    setIsStreaming(false)
                    setWaitingForMessage(false);
                    audioServiceCleanup();
                    console.log("WebSocket disconnected!");
                }
                audioSocket.onerror = (error) => {
                    console.error("An error in audio web socket", error);
                }
                
                // Start audio service for media streaming
                const audioService = new AudioService()
                await audioService.initialize()

                audioServiceRef.current = audioService
                sourceNodeRef.current = audioService.getSourceNode()

                // Start streaming
                audioServiceRef.current?.onAudioData((buffer) => {
                    if (audioSocket?.readyState === WebSocket.OPEN) {
                        audioSocket.send(buffer)
                    }
                })
                setIsStreaming(true);
            } catch (error) {
                console.error("Error starting audio stream:", error);
                audioServiceCleanup();
                setIsStreaming(false);
            }
        }
    };

    return {
        toggleStreaming, isStreaming, sourceNodeRef
    } as const;
}