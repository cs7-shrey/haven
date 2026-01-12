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
        <button 
            onClick={onClick} 
            disabled={false} 
            className="group flex flex-col items-center gap-1 px-1 hover:opacity-80 transition-opacity focus:outline-none"
        >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-200 group-hover:border-slate-300 transition-colors shadow-sm">
                {!isStreaming ? 
                    <Mic size={18} className="text-slate-700" /> :
                    <Audiomotion sourceNode={sourceNodeRef.current} isStreaming={isStreaming} />
                }
            </div>
            <span className="text-[10px] font-medium text-slate-500">
                {isStreaming ? "Listening" : "Speak"}
            </span>
        </button>
    );
};

export default Voice;
