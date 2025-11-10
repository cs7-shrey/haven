import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    text: string;
    isChecked: boolean;
    handleClick: () => void;
}

const AmenityCard: React.FC<Props> = ({ text, isChecked, handleClick }) => {
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-lg py-3 px-3 cursor-pointer select-none transition-all",
                "hover:bg-accent border border-transparent",
                isChecked && "bg-accent/50 border-primary/20"
            )}
            onClick={handleClick}
        >
            <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-all shrink-0",
                isChecked 
                    ? "bg-primary border-primary" 
                    : "bg-background border-muted-foreground/30"
            )}>
                {isChecked && (
                    <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                )}
            </div>
            <span className={cn(
                "text-sm",
                isChecked ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
                {text}
            </span>
        </div>
    );
};

export default AmenityCard;