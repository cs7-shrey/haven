import { create } from 'zustand'
import { Language } from '@/lib/language';
interface SocketState {
    audioSocket: WebSocket | null;
    canSpeak: boolean;
    lang: Language;
    waitingForMessage: boolean;
    setAudioSocket: (socket: WebSocket) => void;
    setCanSpeak: (canSpeak: boolean) => void;
    setLang: (lang: Language) => void;
    setWaitingForMessage: (wfm: boolean) => void
    connectAudioSocket: () => Promise<WebSocket | void>;
    disconnectAudioSocket: () => void;
}
const BASE_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const useSocketStore = create<SocketState>()((set, get) => ({
    audioSocket: null,
    canSpeak: false,
    lang: Language.English,
    waitingForMessage: false,
    setAudioSocket: (socket: WebSocket) => set({ audioSocket: socket }),
    setCanSpeak: (canSpeak: boolean) => set({ canSpeak }),  
    setLang: (lang) => set({lang}),
    setWaitingForMessage: ( waitingForMessage ) => set({waitingForMessage}),    
    connectAudioSocket: async () => {
        if (get().audioSocket?.readyState === WebSocket.OPEN) {
            get().disconnectAudioSocket();
        }

        // the llm web socket is open
        const audioSocket = new WebSocket(`${BASE_SOCKET_URL}/ws/audio/${get().lang}`);

        const res = await new Promise((resolve, reject) => {
            audioSocket.onopen = () => {
                console.log("Audio WebSocket connected!");
                resolve(true)
            }
            // here, an error would mean a connection error
            audioSocket.onerror = () => {
                reject(false)
            }
        })

        if (!res) {
            audioSocket.close()
            set({ audioSocket: null });
            set({ canSpeak: false });
        }
        else {
            // TODO: ADD THE AWAIT ON 'speak' MESSAGE AND SEE IF IT'S ANY USEFUL
            set({ audioSocket });
            set({ canSpeak: true});
            return audioSocket
        }
    },
    disconnectAudioSocket: () => {
        const skt = get().audioSocket
        if (skt?.readyState === WebSocket.OPEN) {
            skt.close();
        }
        set({ audioSocket: null });
    },
}))