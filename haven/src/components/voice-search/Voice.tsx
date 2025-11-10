import { Mic } from "lucide-react";
import Audiomotion from "./audiomotion";
import { RefObject } from "react";
import { checkAuth } from "@/store/useAuthStore";
import { useAuthContext } from "@/context/AuthContext";

interface Props {
    isStreaming: boolean;
    toggleStreaming: () => Promise<void>;
    sourceNodeRef: RefObject<AudioNode | undefined>;
}

const Voice: React.FC<Props> = ({ isStreaming, toggleStreaming, sourceNodeRef }) => {
    const { openLoginPopup } = useAuthContext();
    const onClick = async () => {
        const isAuth = await checkAuth();

        if (isAuth) {
            await toggleStreaming();
        } else {
            openLoginPopup();
        }
    }
    return (
        <div className="flex justify-center bg-background w-fit h-fit py-2">
            <div className="self-center">
                <button onClick={onClick} disabled={false} className="focus:outline-none">
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
