import { useEffect } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { useTempFilterStore } from "@/store/useTempFilterStore";

import { formatDate, stateInitUsingQueryParams } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Options {
    onApplyButtonUIChange: () => void;
}

export const useHotelFilters = ({onApplyButtonUIChange} : Options) => {
    const {
        queryTerm,
        checkIn,
        checkOut,
        propertyType,
        proximityCoordinate,
        setMinBudget,
        setMaxBudget,
        setUserRating,
        setHotelStar,
        setHotelAmenities,
        setRoomAmenities,
    } = useSearchStore();
    const router = useRouter()
    const {
        tempMinBudget,
        tempMaxBudget,
        tempUserRating,
        tempHotelStar,
        tempHotelAmenities,
        tempRoomAmenities,
 
    } = useTempFilterStore();

    useEffect(() => {
        const {
            minBudget, maxBudget,
            userRating,hotelStar,
            hotelAmenities, roomAmenities,
        } = useSearchStore.getState();
        const {
            setTempMinBudget, setTempMaxBudget,
            setTempUserRating, setTempHotelStar,
            setTempHotelAmenities, setTempRoomAmenities,
        } = useTempFilterStore.getState();

        setTempMinBudget(minBudget);
        setTempMaxBudget(maxBudget);
        setTempUserRating(userRating);
        setTempHotelStar(hotelStar);
        setTempHotelAmenities(hotelAmenities);
        setTempRoomAmenities(roomAmenities);
    }, [])
    
    const handleApply = () => {
        setMinBudget(tempMinBudget);
        setMaxBudget(tempMaxBudget);
        setUserRating(tempUserRating);
        setHotelStar(tempHotelStar);
        setHotelAmenities(tempHotelAmenities);
        setRoomAmenities(tempRoomAmenities);

        // filterIconClick();
        onApplyButtonUIChange()
        const filterString = JSON.stringify({
            checkIn: formatDate(checkIn),
            checkOut: formatDate(checkOut),
            minBudget: tempMinBudget,
            maxBudget: tempMaxBudget,
            userRating: tempUserRating,
            hotelStar: tempHotelStar,
            propertyType: propertyType,
            hotelAmenities: tempHotelAmenities,
            roomAmenities: tempRoomAmenities,
        })
        router.push(`/hotels?q=${queryTerm.place}&type=${queryTerm.type}&filters=${filterString}&proximityCoordinate=${JSON.stringify(proximityCoordinate)}`);
        const searchParams = new URLSearchParams(window.location.search);
        stateInitUsingQueryParams(searchParams);
    }

    return { handleApply } as const;
}