import { create } from "zustand";
export interface MessageFields {
    sender: "user" | "bot";
    text: string;
    mode: "text" | "voice"
}
interface HotelPageChatStore {
    messages: MessageFields[];
    textSocket: WebSocket | null;
    audioSocket: WebSocket | null;
    canSpeak: boolean;
    waitingForMessage: boolean;
    setMessages: (messages: MessageFields[]) => void;
    setTextSocket: (socket: WebSocket | null) => void;
    setAudioSocket: (socket: WebSocket) => void;
    setCanSpeak: (canSpeak: boolean) => void;
    setWaitingForMessage: (waitingForMessage: boolean) => void;
    connectAudioSocket: (lang: 'en' | 'hi') => Promise<WebSocket | void>;
    disconnectAudioSocket: () => void;
}
const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL
export const useHotelPageChatStore = create<HotelPageChatStore>((set, get) => ({
    messages: [],
    textSocket: null,
    audioSocket: null,
    canSpeak: false,
    waitingForMessage: false,
    setMessages: (messages) => set({ messages }),
    setTextSocket: ( socket ) => set({textSocket: socket}),
    setAudioSocket: ( socket ) => set({ audioSocket: socket}),
    setCanSpeak: (canSpeak: boolean) => set({ canSpeak }),
    setWaitingForMessage: (waitingForMessage) => set({ waitingForMessage }),
    connectAudioSocket: async (lang) => {
        //
        if (get().audioSocket?.readyState === WebSocket.OPEN) {
            get().audioSocket?.close()
        }
        if (get().textSocket?.readyState !== WebSocket.OPEN) {
            return
        }
        const audioSocket = new WebSocket(`${BASE_URL}/ws/audio/${lang}?service=chat`);
        const res = await new Promise((resolve, reject) => {
            audioSocket.onopen = () => {
                // console.log("Audio WebSocket connected!");;
                resolve(true)
            }
            // here, an error would mean a connection error
            audioSocket.onerror = () => {
                reject(false)
            }
        })
        if (!res ) {
            if (audioSocket.readyState === WebSocket.OPEN) audioSocket.close();
            set({ audioSocket: null })
            set({ canSpeak: false})
            return
        }
        set({ audioSocket })
        set({ canSpeak: true})
        return audioSocket
    },
    disconnectAudioSocket: () => {
        set({ canSpeak: false})
        if (!get().audioSocket || get().audioSocket?.readyState == WebSocket.CLOSED || get().audioSocket?.readyState == WebSocket.CLOSING) return
        get().audioSocket?.close()
    }
}));