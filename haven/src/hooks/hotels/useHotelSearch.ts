import { getHotels } from "@/services/api";
import { useEffect, useState } from "react";
import { useHotelStore } from "@/store/useHotelStore";
import { stateInitUsingQueryParams } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "@/store/useSearchStore";

import { isAxiosError } from "axios";

interface Params {
    onError: (err: string) => void;
}
export default function useHotelSearch({ onError } : Params) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { setHotels } = useHotelStore.getState();
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleError = (err: unknown) => { 
            console.error(err);
            let errorMessage = "An unexpected error occured";

            if (isAxiosError(err)) {
                errorMessage = (typeof err.response?.data.detail === "string" && err.response?.data.detail) || "An unexpected error occured";
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setHotels([]);

            setError(errorMessage);
            onError(errorMessage)

            return errorMessage
        }

        const { fromVoice, setFromVoice } = useHotelStore.getState(); 
        stateInitUsingQueryParams(searchParams);

        if(fromVoice) {
            setFromVoice(false);
            return;
        }

        const {
            queryTerm, checkIn, checkOut,
            minBudget, maxBudget,hotelStar,
            userRating, propertyType, hotelAmenities,
            roomAmenities, proximityCoordinate,
        } = useSearchStore.getState();

        setLoading(true)

        const searchHotels = async () => {
            try {
                const response = await getHotels({
                    place: {
                        name: queryTerm.place,
                        type: queryTerm.type
                    },
                    checkIn, checkOut,
                    minBudget, maxBudget,
                    hotelStar, userRating,
                    propertyType,
                    hotelAmenities, roomAmenities,
                    proximityCoordinate: proximityCoordinate ?? undefined
                });
                if (response.status !== 200) {
                    throw new Error("Failed to fetch hotels");
                }
                setHotels(response.data.hotels);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        }
        searchHotels();
    }, [searchParams, setHotels, onError]);

    return {
        loading,
        error
    } as const;
}