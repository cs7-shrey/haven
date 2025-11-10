import { useHotelPageChatStore } from "@/store/useHotelPageChatStore"
import { useCallback, useEffect, useRef, useState } from "react"
import { getHotelInfoFormatted } from "@/lib/utils";
import { type MessageFields } from "@/store/useHotelPageChatStore";
import { textChat } from "@/lib/chat";
import { AudioService } from "@/lib/audioService";

export const useHotelChat = (hotelName: string, hotelLocation: string) => {
    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
    
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const webSocketRef = useRef<WebSocket | null>(null);

    const { canSpeak, setWaitingForMessage, setCanSpeak } = useHotelPageChatStore()

    const [isSocketConnecting, setIsSocketConnecting] = useState<boolean>(false);
    const [settingUp, setSettingUp] = useState<boolean>(false);

    const connectChatSocket = useCallback(async () => {
        setIsSocketConnecting(true);
        const ws = new WebSocket(
            `${BASE_URL}/hotel/ws/chat?hotel_name=${hotelName}&hotel_location=${hotelLocation}`
        );

        const res = await new Promise((resolve, reject) => {
            ws.onopen = () => {
                const info = getHotelInfoFormatted();
                ws.send(JSON.stringify({'hotel_info': info}));
                resolve(true);
            }

            ws.onerror = () => {
                reject(false);
            }
        })

        setIsSocketConnecting(false);
        console.log(res);

        if(!res) {
            webSocketRef.current = null;
            setSocket(null);
            return null;
        }
        webSocketRef.current = ws;
        setSocket(ws);

        // TODO: setup closing and error handlers
        return ws;
    }, [BASE_URL, hotelName, hotelLocation])

    const audioChatCleanup = useCallback(() => {
        setCanSpeak(false);
        if (audioServiceRef.current) {
            audioServiceRef.current.cleanup()
            audioServiceRef.current = null
        }
        setSettingUp(false);
    }, [setCanSpeak, setSettingUp])
    useEffect(() => {
        const { setMessages } = useHotelPageChatStore.getState();
        setMessages([]);
        connectChatSocket();
        const disconnectChatSocket = async () => {
            webSocketRef.current?.close();
            webSocketRef.current = null;
            setSocket(null);
        }
        return () => {
            disconnectChatSocket();
            audioChatCleanup();
        }
    }, [connectChatSocket, audioChatCleanup]);    

    const onSendMessage = async (userMessage: string, setUserMessage: (useMessage: string) => void) => {
        if (userMessage.trim().length == 0) return
        const ws = webSocketRef.current;
        if (!ws) {
            return
        }
        const { messages: prevMessages, setMessages } = useHotelPageChatStore.getState();
        const questionAnswer: MessageFields[] = []
        setMessages([...prevMessages, {
            sender: "user",
            text: userMessage,
            mode: "text"
        }])
        questionAnswer.push({
            sender: "user",
            text: userMessage,
            mode: "text"
        })
        console.log("got here");
        setUserMessage('')
        const llmMsg = await textChat(ws, userMessage)
        if (!llmMsg || llmMsg?.length === 0) {
            setMessages(prevMessages)
            return
        }
        console.log(llmMsg);
        questionAnswer.push({
            sender: "bot",
            text: llmMsg,
            mode: "text"
        })
        setMessages([...prevMessages, ...questionAnswer]);
    }

    const audioServiceRef = useRef<AudioService | null>(null)

    const toggleStreaming = async () => {
        if(settingUp) return;

        if(canSpeak) {
            audioChatCleanup();

            if (webSocketRef.current?.readyState === WebSocket.OPEN) {
                webSocketRef.current.send("stop_recording");

                const { messages: prevMessages, setMessages } = useHotelPageChatStore.getState();

                webSocketRef.current.onmessage = (serverMessage) => {
                    const llmMessage = serverMessage.data
                    setMessages([...prevMessages, {
                        sender: "bot",
                        text: llmMessage,
                        mode: "text"
                    }])
                    setWaitingForMessage(false);
                }
                webSocketRef.current.onerror = () => {
                    setWaitingForMessage(false);
                    audioChatCleanup();
                    console.error("an error occured while sending text message")
                }
                webSocketRef.current.onclose = () => {
                    setWaitingForMessage(false);
                }
                setWaitingForMessage(true);
            }
            return;            
        }

        if(!webSocketRef.current || webSocketRef.current.readyState !== WebSocket.OPEN) {
            return          // TODO: raise some toast
        }

        webSocketRef.current.send("voice")      // TODO: change to enum
        setSettingUp(true);

        const audioService = new AudioService();
        audioServiceRef.current = audioService
        await audioService.initialize();
        

        audioServiceRef.current?.onAudioData((buffer) => {
            if (webSocketRef.current?.readyState === WebSocket.OPEN) {
                webSocketRef.current.send(buffer)
            }
        })
        setCanSpeak(true);
        setSettingUp(false);
    }

    return {
        isSocketConnecting, socket, connectChatSocket, onSendMessage, toggleStreaming, settingUp
    } as const;
}