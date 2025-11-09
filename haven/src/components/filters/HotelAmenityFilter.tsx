import { useEffect, useState } from 'react'
import { getConstants } from '@/lib/utils'
import { useSearchStore, type Amenity } from '@/store/useSearchStore';
import { useTempFilterStore } from '@/store/useTempFilterStore';
import AmenityCard from '../ui/AmenityCard';

export interface AmenityUI extends Amenity {
    isChecked: boolean;
}

const HotelAmenityFilter = () => {
    const [amenityList, setAmenityList] = useState<AmenityUI[]>([]);
    const { tempHotelAmenities, setTempHotelAmenities } = useTempFilterStore();
    
    useEffect(() => {
        const { hotelAmenities } = useSearchStore.getState();
        setTempHotelAmenities(hotelAmenities);
    }, [setTempHotelAmenities]);
    
    useEffect(() => {
        const getHotelAmenities = async () => {
            let hotelAmenitiesFromLocal: Amenity[] = JSON.parse(localStorage.getItem("hotelAmenities") || "[]");

            if (hotelAmenitiesFromLocal.length === 0) {
                const hotelAmenitiesFromServer = await getConstants("hotel_amenity");
                localStorage.setItem("hotelAmenities", JSON.stringify(hotelAmenitiesFromServer));
                hotelAmenitiesFromLocal = hotelAmenitiesFromServer;
            }
            setAmenityList(hotelAmenitiesFromLocal.map((amen) => {
                return {...amen, isChecked: tempHotelAmenities.some(obj => obj.code === amen.code)}
            }))
        }
        getHotelAmenities();
    }, [tempHotelAmenities])
    
    const returnOnClick = (isChecked: boolean, text: string, code: string) => {
        const onClick = () => {
            if (!isChecked) {
                setTempHotelAmenities([...tempHotelAmenities, {name: text, code: code}]);
            }
            else {
                setTempHotelAmenities(tempHotelAmenities.filter((amen) => amen.code !== code))
            }
        }
        return onClick;
    }
    
    return (
        <div className="space-y-1">
            {amenityList.map((amenity) => (
                <AmenityCard
                    key={amenity.code}
                    text={amenity.name ?? ''}
                    isChecked={amenity.isChecked}
                    handleClick={returnOnClick(amenity.isChecked, amenity.name ?? '', amenity.code)}
                />
            ))}
            {amenityList.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                    Loading amenities...
                </p>
            )}
        </div>
    )
}

export default HotelAmenityFilter
