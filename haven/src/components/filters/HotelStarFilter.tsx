import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
    hotelStar: number[];
    setHotelStar: (hotelStar: number[]) => void;
}

const HotelStarFilter: React.FC<Props> = ({hotelStar, setHotelStar}) => {
    const [hotelStarState, setHotelStarState] = useState([
        { text: "0+", isSelected: true },
        { text: "2", isSelected: false },
        { text: "3", isSelected: false },
        { text: "4", isSelected: false },
        { text: "5", isSelected: false },
    ]);

    useEffect(() => {
        if (hotelStar[0] === 0) {
            setHotelStarState((prev) => {
                return prev.map((star) => {
                    return { ...star, isSelected: star.text === "0+" }
                })
            })
        }
        else {
            setHotelStarState((prev) => {
                return prev.map((star) => {
                    return { ...star, isSelected: hotelStar.includes(parseInt(star.text)) }
                })
            })
        }
    }, [hotelStar])

    const handleClickFunction = (selected: boolean, text: string) => {
        const handleClick = () => {
            if (!selected && text === "0+") {
                setHotelStar([0, 1, 2, 3, 4, 5]);
            } else if (selected && text === "0+") {
                return;
            } else {
                // text is not 0+
                if (hotelStar[0] === 0) {
                    setHotelStar([parseInt(text)]);
                } else {
                    if (selected && hotelStar.includes(parseInt(text))) {
                        setHotelStar(
                            hotelStar.filter((star: number) => star !== parseInt(text))
                        );
                    } else if (!selected && !hotelStar.includes(parseInt(text))) {
                        setHotelStar([...hotelStar, parseInt(text)]);
                    }
                }
            }
        };
        return handleClick;
    }
    
    return (
        <div className="grid grid-cols-5 gap-2">
            {hotelStarState.map((star) => {
                const starNum = star.text === "0+" ? 0 : parseInt(star.text);
                return (
                    <button
                        key={star.text}
                        onClick={handleClickFunction(star.isSelected, star.text)}
                        className={cn(
                            "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all",
                            "hover:border-primary/50 hover:bg-accent",
                            star.isSelected 
                                ? "border-primary bg-primary/10 shadow-sm" 
                                : "border-border bg-background"
                        )}
                    >
                        {star.text === "0+" ? (
                            <Star className="h-5 w-5 text-muted-foreground" />
                        ) : (
                            <div className="flex">
                                {Array.from({ length: starNum }).map((_, i) => (
                                    <Star 
                                        key={i}
                                        className={cn(
                                            "h-3 w-3",
                                            star.isSelected ? "fill-primary text-primary" : "fill-muted-foreground text-muted-foreground"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                        <span className={cn(
                            "text-xs font-medium whitespace-nowrap",
                            star.isSelected ? "text-primary" : "text-foreground"
                        )}>
                            {star.text}
                        </span>
                    </button>
                );
            })}
        </div>
    )
}

export default HotelStarFilter;