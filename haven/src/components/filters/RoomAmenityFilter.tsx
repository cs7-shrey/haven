import { useEffect, useState } from 'react'
import { getConstants } from '@/lib/utils';
import { useSearchStore, type Amenity } from '@/store/useSearchStore';
import { type AmenityUI } from './HotelAmenityFilter';
import { useTempFilterStore } from '@/store/useTempFilterStore';
import AmenityCard from '../ui/AmenityCard';

const RoomAmenityFilter = () => {
    const [amenityList, setAmenityList] = useState<AmenityUI[]>([]);
    const { tempRoomAmenities, setTempRoomAmenities } = useTempFilterStore();
    useEffect(() => {
        // const { roomAmenities } = useSearchStore.getState();
        const { roomAmenities } = useSearchStore.getState();
        setTempRoomAmenities(roomAmenities);
    }, [setTempRoomAmenities]);

    useEffect(() => {
        const getRoomAmenities = async () => {
            let roomAmenitiesFromLocal: Amenity[] = JSON.parse(localStorage.getItem("rooomAmenities") || "[]");

            if (roomAmenitiesFromLocal.length === 0) {
                const roomAmenitiesFromServer = await getConstants("room_amenity");
                localStorage.setItem("roomAmenities", JSON.stringify(roomAmenitiesFromServer));
                roomAmenitiesFromLocal = roomAmenitiesFromServer
            }
            setAmenityList(roomAmenitiesFromLocal.map((amen) => {
                return {...amen, isChecked: tempRoomAmenities.some(obj => obj.code === amen.code)}
            }));
        };
        getRoomAmenities();

    }, [tempRoomAmenities])
    const returnOnClick = (isChecked: boolean, text: string, code: string) => {
        const onClick = () => {
            if (!isChecked) {
                setTempRoomAmenities([...tempRoomAmenities, {name: text, code: code}]);
            }
            else {
                setTempRoomAmenities(tempRoomAmenities.filter((amen) => amen.code !== code))
            }
        }
        return onClick
    }
    return (
        <>
            <div className="mt-6 mb-1 px-1 font-bold">Room Amenities</div>
            <div>
                {amenityList.map((amenity) => (
                    <AmenityCard
                        key={amenity.code}
                        text={amenity.name ?? ''}
                        isChecked={amenity.isChecked}
                        handleClick={returnOnClick(amenity.isChecked, amenity.name ?? '', amenity.code)}
                    />
                ))}
            </div>
        </>
    )
}

export default RoomAmenityFilter
