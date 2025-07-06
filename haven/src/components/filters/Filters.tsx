import React from "react";
import { useTempFilterStore } from "@/store/useTempFilterStore";

import HotelAmenityFilter from "./HotelAmenityFilter";
import HotelStarFilter from "./HotelStarFilter";
import UserRatingFilter from "./UserRatingFilter";
import RoomAmenityFilter from "./RoomAmenityFilter";
import HotelPriceFilter from "./HotelPriceFilter";
import { useHotelFilters } from "@/hooks/useHotelFIlters";
// import { useSearchParams } from "react-router";

interface Props {
    filterIconClick: () => void;
}
const Filters: React.FC<Props> = ({ filterIconClick }) => {
    const { handleApply } = useHotelFilters({onApplyButtonUIChange: filterIconClick})
    const {tempUserRating, setTempUserRating, tempHotelStar, setTempHotelStar} = useTempFilterStore()
    const handleReset = () => {}
    return (
        <div 
            className={`bg-background w-full min-w-sm max-h-[70vh] rounded-lg shadow-md p-4 overflow-y-auto scrollbar-webkit scrollbar-thin`}>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 lg:hidden" />          {/* drag indicator */}
            <div className="font-bold">All filters</div>
            <div>
                <HotelPriceFilter />
            </div>
            <div className="mt-4">
                <UserRatingFilter rating={tempUserRating} setRating={setTempUserRating}/>
            </div>
            <div>
                <HotelStarFilter hotelStar={tempHotelStar} setHotelStar={setTempHotelStar}/>
            </div>
            <div className="mt-4">
                <HotelAmenityFilter />
            </div>
            <div>
                <RoomAmenityFilter />
            </div>
            <div className="
                absolute bottom-0 left-0 right-0
                p-4
                border-t border-gray-200
                bg-background
                rounded-b-lg
                flex gap-4
                shadow-[0_-2px_10px_rgba(0,0,0,0.1)]
            ">
                <button 
                    onClick={handleReset}
                    className="
                        flex-1 
                        px-4 py-2 
                        border border-gray-300 
                        rounded-md 
                        text-gray-700 
                        hover:bg-gray-50
                        transition-colors
                    "
                >
                    Reset
                </button>
                <button 
                    onClick={handleApply}
                    className="
                        flex-1 
                        px-4 py-2 
                        bg-blue-600 
                        text-white 
                        rounded-md 
                        hover:bg-blue-700
                        transition-colors
                    "
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default Filters;
