import { useState, useEffect } from 'react'
import HotelStar from '../ui/HotelStar'

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
        <div>
            <div className="mt-4 mb-2 font-bold">Hotel Class</div>
            <div className="flex gap-2">
                {hotelStarState.map((star) => (
                    <HotelStar
                        key={star.text}
                        text={star.text}
                        selected={star.isSelected}
                        onClick={handleClickFunction(star.isSelected, star.text)}
                    />
                ))}
            </div>
        </div>
    )
}

export default HotelStarFilter;