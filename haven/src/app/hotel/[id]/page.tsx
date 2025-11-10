"use client"
import ImageBox from "@/components/refactor/ImageBox";
import Navbar from "@/components/Navbar"
import RoomOption from "@/components/refactor/RoomOption";
import { useState, useEffect } from "react";
import { useHotelDescStore } from "@/store/useHotelDescStore";
import HotelNavbar from "@/components/refactor/HotelNavbar";
import { Bot } from "lucide-react";
import ChatBox from "@/components/chat/ChatBox";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { checkAuth } from "@/store/useAuthStore";

const HotelDescription = () => {
    const { hotelData, roomData } = useHotelDescStore();
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    const { openLoginPopup } = useAuthContext();

    const onClick = async () => {
        const isAuth = await checkAuth();
        if (isAuth) {
            setChatBoxOpen((prev) => !prev);
        } else {
            openLoginPopup();
        }
    }

    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    if (!id) {
        router.push('/')
    }
    useEffect(() => {
        return () => {
            const { setHotelData, setRoomData } = useHotelDescStore.getState();
            setHotelData(null);
            setRoomData(null)
        }
    }, [])

    useEffect(() => {
        const { getHotelData, getRoomData } = useHotelDescStore.getState();
        getHotelData(id);
        getRoomData(id);
    }, [id])
    return (
        <div className="relative">
            <Navbar />
            <ImageBox
                name={hotelData?.name}
                location={hotelData?.location}
                hotelStar={hotelData?.hotelStar}
                userRating={hotelData?.userRating}
                userRatingCount={hotelData?.userRatingCount}
                images={hotelData?.images}
                firstRoomOptionName={roomData?.[0].room_type_name}
                firstRoomOptionPrice={roomData?.[0].rate_plans?.[0].base_fare}
                firstRoomOptionTaxes={roomData?.[0].rate_plans?.[0].taxes}
                nRoomOptions={roomData?.length}
            />  
            <HotelNavbar />
            <div className="flex flex-col justify-center items-center md:grid md:grid-cols-10 overflow-y-auto top-0 bg-[#d6d6d696]">
                <div className="col-span-8 col-start-2 mx-auto">
                    <div className="room-wrapper flex flex-col items-center">
                        {roomData?.map((_, i) => (
                            <RoomOption 
                                key={i}
                                {...roomData[i]}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {
            hotelData ? 
                (
                    !chatBoxOpen ? 
                    <div className="fixed z-50 bottom-2 right-2 rounded-lg size-16 flex justify-center items-center bg-primary">
                        <button className="w-full h-full p-4" onClick={onClick}>
                            <Bot color="white" size={28}/>
                        </button>
                    </div> : 
                    <div className="fixed bottom-2 right-2 inset-0 z-50 h-full w-full bg-transparent/30">
                        <ChatBox onClose={onClick} hotelName={hotelData?.name} hotelLocation={hotelData?.location} />
                    </div>
                ) 
                : <></>
            }
        </div>
    )
}
export default HotelDescription;
