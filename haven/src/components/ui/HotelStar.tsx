import { Star } from "lucide-react";
import React from "react";

interface Props {
  text: string;
  selected: boolean;
  onClick: () => void;
}
const HotelStar: React.FC<Props> = ({ text, selected, onClick }) => {
    return (
        <button onClick={onClick}>
            <div className="relative w-fit">
                <Star
                    size={55}
                    color={`${selected ? "#363f45" : "#e1e5e9"}`}
                    fill={`${selected ? "#363f45" : "#ffffff"}`}
                />
                <div className={`absolute top-0 left-0  w-full h-full flex items-center justify-center ${selected ? "text-primary-foreground" : "text-secondary"} font-bold text-xs`}>
                    {text}
                </div>
            </div>
        </button>
    );
};

export default HotelStar;
