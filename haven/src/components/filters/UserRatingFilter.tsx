import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    rating: number;
    setRating: (rating: number) => void;
}

const UserRatingFilter: React.FC<Props> = ({rating, setRating}) => {
    const [isZeroSelected, setIsZeroSelected] = useState(true);
    const [isThreeSelected, setIsThreeSelected] = useState(false);
    const [isFourSelected, setIsFourSelected] = useState(false);
    const [isFourPointFiveSelected, setIsFourPointFiveSelected] = useState(false);

    const setAllFalse = () => {
        setIsZeroSelected(false);
        setIsThreeSelected(false);
        setIsFourSelected(false);
        setIsFourPointFiveSelected(false);
    };

    useEffect(() => {
        setAllFalse();
        switch (rating) {
            case 0:
                setIsZeroSelected(true);
                break;
            case 3:
                setIsThreeSelected(true);
                break;
            case 4:
                setIsFourSelected(true);
                break;
            case 4.5:
                setIsFourPointFiveSelected(true);
                break;
        }
    }, [rating]);
    
    const ratingOptions = [
        {text: "Any", value: 0, isSelected: isZeroSelected},
        {text: "3+", value: 3, isSelected: isThreeSelected},
        {text: "4+", value: 4, isSelected: isFourSelected},
        {text: "4.5+", value: 4.5, isSelected: isFourPointFiveSelected},
    ];
    
    return (
        <div className="grid grid-cols-4 gap-2">
            {ratingOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => setRating(option.value)}
                    className={cn(
                        "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all",
                        "hover:border-primary/50 hover:bg-accent",
                        option.isSelected 
                            ? "border-primary bg-primary/10 shadow-sm" 
                            : "border-border bg-background"
                    )}
                >
                    <Star 
                        className={cn(
                            "h-5 w-5",
                            option.isSelected ? "fill-primary text-primary" : "text-muted-foreground"
                        )} 
                    />
                    <span className={cn(
                        "text-sm font-medium",
                        option.isSelected ? "text-primary" : "text-foreground"
                    )}>
                        {option.text}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default UserRatingFilter;
