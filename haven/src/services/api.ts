import axios from 'axios';
import { isAxiosError } from 'axios';
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
        hotel_amenity_codes: searchValues.hotelAmenities?.map((val) => val.code),
        room_amenity_codes: searchValues.roomAmenities?.map((val) => val.code),
        proximity_coordinate: searchValues.proximityCoordinate ?? null
    }
    const response = await axiosInstance.post("/search/hotels", data, {
        headers: {
            "Content-Type": "application/json"
        }

    });
    return response;
}

export async function loginUser(email: string, password: string) {
    const response = await axiosInstance.post('/users/login', { email, password });
    return response
}

export async function logoutUser() {
    const response = await axiosInstance.post('/users/logout');
    return response
}

type onErrorFunction = (err: string) => void;

export const handleApiError = (err: unknown, onError: onErrorFunction): string => { 
    console.error(err);
    let errorMessage = "An unexpected error occured";

    if (isAxiosError(err)) {
        errorMessage = (typeof err.response?.data.detail === "string" && err.response?.data.detail) || "An unexpected error occured";
    } else if (err instanceof Error) {
        errorMessage = err.message;
    }

    onError(errorMessage);
    return errorMessage
}