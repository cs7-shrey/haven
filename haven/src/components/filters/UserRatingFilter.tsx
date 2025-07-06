import { useState, useEffect } from "react";
import NumberBox from "../ui/NumberBox";

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
    const numberBoxData = [
        {text: "0+", isSelected: isZeroSelected},
        {text: "3+", isSelected: isThreeSelected},
        {text: "4+", isSelected: isFourSelected},
        {text: "4.5+", isSelected: isFourPointFiveSelected},
    ]
    return (
        <>
            <div className="my-2 font-bold">User Rating</div>
            <div className="flex  justify-between gap-4">
                {numberBoxData.map((element, index) => {
                    return (
                    <NumberBox 
                        key={index} 
                        text={element.text} 
                        isSelected={element.isSelected} 
                        onClick={() => setRating(Number(element.text.split("+")[0]))}
                    />
                )
                })}
            </div>
        </>
    )
}

export default UserRatingFilter
