import axios from 'axios';
import type { SearchHotelParams } from '@/types';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})  


export async function getHotels(
    searchValues: SearchHotelParams, 
) {
    const data = {
        place: {
            name: searchValues.place.name,
            type: searchValues.place.type
        },
        check_in: searchValues.checkIn,
        check_out: searchValues.checkOut,
        min_budget: searchValues.minBudget,
        max_budget: searchValues.maxBudget,
        hotel_star: searchValues.hotelStar,
        user_rating: searchValues.userRating,
        property_type: searchValues.propertyType,
        hotel_amenity_codes: searchValues.hotelAmenities,
        room_amenity_codes: searchValues.roomAmenities,
        proximity_coordinate: searchValues.proximityCoordinate ?? null
    }
    const response = await axiosInstance.post("/search/hotels", data, {
        headers: {
            "Content-Type": "application/json"
        }

    });
    return response;
}