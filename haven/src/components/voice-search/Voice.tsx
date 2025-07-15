import { Mic } from "lucide-react";
import Audiomotion from "./audiomotion";
import { RefObject } from "react";

interface Props {
    isStreaming: boolean;
    toggleStreaming: () => Promise<void>;
    sourceNodeRef: RefObject<AudioNode | undefined>;
}

const Voice: React.FC<Props> = ({ isStreaming, toggleStreaming, sourceNodeRef }) => {
    return (
        <div className="flex justify-center bg-background w-fit h-fit py-2 rounded-md">
            <div className="self-center rounded-md">
                <button onClick={toggleStreaming}>
                    <div className="h-12 w-16 rounded-full flex flex-col justify-start items-center" id="container">
                        <div className="h-10 w-20 flex justify-center items-end">
                            {!isStreaming ? 
                                <Mic size={24}/> :
                                <Audiomotion sourceNode={sourceNodeRef.current} isStreaming={isStreaming} />
                            }
                        </div>
                        <div className="text-black/55 text-sm text-wrap p-1">
                            {isStreaming ? "Listening..." : "Speak"}
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Voice;
