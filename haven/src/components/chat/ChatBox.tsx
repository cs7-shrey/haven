import React, { useEffect, useRef } from 'react'
import InputMessage from './InputMessage'
import Message from './Message'
import { Circle, X } from 'lucide-react'
import { useHotelPageChatStore } from '@/store/useHotelPageChatStore'
import { useHotelChat } from '@/hooks/useHotelChat'

interface Props {
    onClose: () => void
    hotelName?: string;
    hotelLocation?: string;
}

// TODO: Fix this possibly empty hotelName and hotelLocation
const ChatBox: React.FC<Props> = ({ onClose, hotelName = "", hotelLocation = "" }) => {
    const { messages, waitingForMessage } = useHotelPageChatStore();
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef?.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const { isSocketConnecting, socket, 
        connectChatSocket, onSendMessage, toggleStreaming, settingUp
    } = useHotelChat(hotelName, hotelLocation);

    const onClick = () => {
        console.log("got here");
        console.log(socket?.readyState);
        if(
            socket?.readyState == WebSocket.OPEN 
            || socket?.readyState == WebSocket.CONNECTING
        ) return;
        connectChatSocket();
    }

    const widgetColor = socket?.readyState === WebSocket.OPEN ? 'rgb(108,161,72)' 
        : isSocketConnecting  ? 'rgb(20,20,20)' 
            : (!socket || socket?.readyState === WebSocket.CLOSED) ? 'rgb(218,74,34)' : 'rgb(0,200,0)'

    const widgetText = socket?.readyState === WebSocket.OPEN ? 'connected' 
        : isSocketConnecting ? 'connecting' 
            : (!socket || socket?.readyState === WebSocket.CLOSED) ? 'disconnected' : 'error'


    return (
        <div className="sm:w-[80%] md:w-[30rem] sm:ml-auto m-4 border-4 flex flex-col gap-2 relative rounded-2xl bg-white h-[95vh] px-4 pb-4">
            <div className='mb-auto sticky flex justify-between h-24 border-b-2'>
                <img src="/ai.gif" alt="." className='size-16 pt-2' />
                <div className='flex flex-col my-auto mx-auto items-center relative'>
                    <button 
                        disabled={socket?.readyState === WebSocket.OPEN || isSocketConnecting}
                        className='flex h-fit gap-2 px-4 py-1 border-2 rounded-full'
                        onClick={onClick}
                    >
                        <Circle size={6} 
                            fill={widgetColor}
                            color={widgetColor} 
                            className='self-center'
                        /> 
                        {widgetText}
                    </button>
                    {(!socket || socket?.readyState === WebSocket.CLOSED) && !isSocketConnecting && <div className='text-xs absolute top-10 text-secondary/70'>
                        click to connect
                    </div>}
                </div>
                <button className='self-start ml-auto' onClick={onClose}>
                    <div className='pt-6'>
                        <X />
                    </div>
                </button>
            </div>
            <div className='overflow-y-auto flex-1 z-50 max-h-fit scrollbar-webkit mt-auto flex flex-col gap-2 pr-1'>
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
                <div ref={endRef} className='pl-2'>
                    {waitingForMessage && <img src={"/assets/typing.svg"} className='h-10 w-14'/>}
                </div>
            </div>
            <InputMessage onSendMessage={onSendMessage} toggleStreaming={toggleStreaming} voiceButtonDisabled={settingUp} />
        </div>
    )
}

export default ChatBox
