import { useHotelPageChatStore } from '@/store/useHotelPageChatStore'
import { Mic } from 'lucide-react'
import React from 'react'

interface Props {
    toggleStreaming: () => void;
    disabled: boolean;
}
const Voice: React.FC<Props> = ({ toggleStreaming, disabled }) => {
    // web socket connections
    const { canSpeak } = useHotelPageChatStore()
    console.log("canSpeak: ", canSpeak);

    return (
        <button 
            className={`text-secondary/80 rounded-full size-10 ${canSpeak ? 'animate-pulse' : ''}`} 
            onClick={() => toggleStreaming()}
            disabled={disabled}
        >
            <Mic size={20} className='my-auto mx-auto' color={`${canSpeak ? 'red' : 'black'}`} />
        </button>
    )
}

export default Voice
