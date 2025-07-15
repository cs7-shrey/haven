"use client"
import { useState, useEffect, useCallback } from 'react';

import { useHotelStore } from '@/store/useHotelStore';
import { useSocketStore } from '@/store/useSocketStore';

import { HashLoader } from 'react-spinners';
// import GoogleMaps from '@/components/maps/GoogleMaps';
import TopBar from '@/components/TopBar';
import Filters from '@/components/filters/Filters';
import NotFoundCard from '@/components/ui/NotFoundCard';
import HotelCard from '@/components/HotelCard';
import { SlidersHorizontal } from 'lucide-react';

import useHotelSearch from '@/hooks/hotels/useHotelSearch';
import toast from 'react-hot-toast';


export default function Hotels() {
    const [filtersDropdown, setFiltersDropdown] = useState(false);
    const { waitingForMessage } = useSocketStore();
    const { hotels } = useHotelStore();
    const filtersClick = () => {
        setFiltersDropdown((prev) => !prev);
    }
    const onError = useCallback((err: string) => {
        toast.error(err)
    }, [])
    const {loading } = useHotelSearch({
        onError: onError
    })

    useEffect(() => {
        if (waitingForMessage) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [waitingForMessage]);

    return (
        <div className="relative"
        >
            <nav className="bg-primary px-4 sm:sticky sm:top-0 z-50">
                <TopBar />
            </nav>
            <div className="relative lg:relative sm:flex md:grid md:grid-cols-12 px-4 sm:px-8 bg-[#EFF3F8] min-h-screen"               /*bg-[#EFF3F8] */
            >   
                <div className="col-span-2 overflow-y-auto md:col-start-2 md:col-span-10 lg:col-start-1 lg:col-span-7 flex flex-col gap-4">
                    <div className="p-4 relative z-20">
                        <button
                            onClick={filtersClick}
                            className="relative z-30 flex gap-2 px-4 items-center bg-secondary p-2 rounded-md text-primary-foreground"
                        >
                            <SlidersHorizontal size={18} strokeWidth={2} color="white" />
                            Filters
                        </button>
                        {filtersDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 bg-black/20 z-30"
                                    onClick={filtersClick}
                                />
                                <div className="fixed lg:absolute bottom-0 lg:bottom-auto left-0 right-0 lg:left-4 lg:right-auto lg:top-full z-40 transform transition-transform duration-300 ease-in-out">
                                    <Filters filterIconClick={filtersClick}/>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='flex flex-col gap-4 relative'>
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} {...hotel} />
                        ))}
                        {hotels.length === 0 && !loading && !waitingForMessage && 
                        <div className='absolute inset-0'>
                            <NotFoundCard text="we couldn't find any hotels that match your criteria" />
                        </div>}
                    </div>
                </div>
                {loading && <div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-foreground/50">
                    <HashLoader />
                </div>}
                {/* Google Maps container */}
                <div className="hidden lg:block z-10 lg:col-start-8 ml-4 lg:col-span-5">
                    <div className="sticky top-24 z-20 h-[calc(100vh-6rem)]">
                        {/* <GoogleMaps /> */}
                    </div>
                </div>
            </div>
            {waitingForMessage && <div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-foreground/50">
                <HashLoader />
            </div>}
        </div>
    );
}