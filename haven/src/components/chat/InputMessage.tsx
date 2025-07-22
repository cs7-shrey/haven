import { useState } from "react";
import {  Send } from "lucide-react";
import Voice from "./Voice";

interface Props {
    onSendMessage: (useMessage: string, setUserMessage: (userMessage: string) => void) => void;
    toggleStreaming: () => void;
    voiceButtonDisabled: boolean;
}

const InputMessage: React.FC<Props> = ({ onSendMessage, toggleStreaming, voiceButtonDisabled }) => {
    const [userMessage, setUserMessage] = useState("");
    const [inputFocus, setInputFocus] = useState(false);
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(e.target.value);
    };

    return (
        <div className={`py-2 pl-4 pr-2 rounded-full h-[3rem] sticky items-center flex border-2 justify-between ${inputFocus ? 'border-accentForeground' : 'border-[#F1F2F2]'}`}>
            <div className='flex w-full'>
                <input 
                    type="text" 
                    className='focus:outline-none w-full' 
                    onChange={onInputChange} 
                    placeholder="Type a message"
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    value={userMessage}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSendMessage(userMessage, setUserMessage);
                        }
                    }}
                />
            </div>
            <div className='flex gap-2'>
                {
                    (userMessage.length == 0)
          &&
          <Voice toggleStreaming={toggleStreaming} disabled={voiceButtonDisabled} />
                }
                <button>
                    <div className={`rounded-full ${userMessage.length == 0 ? 'bg-[#F1F2F2]' : 'bg-secondary'} pl-2 pr-[0.6rem] py-[0.55rem]`}>
                        <Send size={18} color={`${userMessage.length == 0 ? '#656D75' : 'white'}`}/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default InputMessage;
