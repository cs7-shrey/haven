import { useHotelStore } from "@/store/useHotelStore";
import { useRouter } from "next/navigation";
import type { Hotel, BackendFilters, Status } from "@/types";
import { useSearchStore } from "@/store/useSearchStore";
import toast from "react-hot-toast";


export function useLLMFilters() {
    const router = useRouter();
    const { setHotels, setFromVoice, setInfoMessage } = useHotelStore()
    const { setSearchValue } = useSearchStore();
    const processLlmFilters = (filters: BackendFilters, status: Status, hotelData: Hotel[]) => {
        setInfoMessage(status.message)
        if (status.code !== 200) {
            toast(status.message, {
                icon: '🤠',
                removeDelay: 4000
            })
            if (!filters?.place?.name) return;
        }
        const queryTerm = filters.place?.name;
        setSearchValue(queryTerm)
        const type = filters.place?.type;
        const checkIn = filters?.check_in;
        const checkOut = filters?.check_out;
        const proximityCoordinate = filters?.proximity_coordinate;
        const searchFilters = {
            minBudget: filters?.min_budget,
            maxBudget: filters?.max_budget,
            userRating: filters?.user_rating,
            hotelStar: filters?.hotel_star,
            propertyType: filters?.property_type,
            hotelAmenities: filters?.hotel_amenity_codes?.map((code) => ({code: code})),
            roomAmenities: filters?.room_amenity_codes?.map((code) => ({code: code})),
        }
        const filterString = JSON.stringify(searchFilters);
        setHotels(hotelData);
        setFromVoice(true);
        const baseParams = {
            'q': queryTerm,
            'type': type,
            'checkIn': checkIn,
            'checkOut': checkOut,
            'filters': filterString,
        };
        
        const optionalParams = {
            ...(proximityCoordinate && { 'proximityCoordinate': JSON.stringify(proximityCoordinate) })
        };

        const urlParams = new URLSearchParams({
            ...baseParams,
            ...optionalParams
        });
        router.push(`/hotels?${urlParams.toString()}`);
    }
    return processLlmFilters
}