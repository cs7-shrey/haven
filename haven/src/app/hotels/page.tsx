"use client"
import { useState, useEffect, useCallback, useRef } from 'react';

import { useHotelStore } from '@/store/useHotelStore';
import { useSocketStore } from '@/store/useSocketStore';

import TopBar from '@/components/TopBar';
import Filters from '@/components/filters/Filters';
import NotFoundCard from '@/components/ui/NotFoundCard';
import HotelCard from '@/components/HotelCard';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import useHotelSearch from '@/hooks/hotels/useHotelSearch';
import toast from 'react-hot-toast';
import GoogleMaps from '@/components/maps/GoogleMaps';


export default function Hotels() {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const { waitingForMessage } = useSocketStore();
    const { hotels } = useHotelStore();
    
    const onError = useCallback((err: string) => {
        toast.error(err)
    }, [])
    const { loading } = useHotelSearch({
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

    const rendered = useRef<boolean>(false);

    useEffect(() => {
        rendered.current = true;
    }, []);

    return (
        <div className="relative">
            <nav className="bg-primary px-4 sm:sticky sm:top-0 z-50">
                <TopBar />
            </nav>
            <div className="relative lg:relative sm:flex md:grid md:grid-cols-12 px-4 sm:px-8 bg-[#EFF3F8] min-h-screen">
                <div className="col-span-2 overflow-y-auto md:col-start-2 md:col-span-10 lg:col-start-1 lg:col-span-7 flex flex-col gap-4">
                    <div className="py-4 relative z-20">
                        <Button
                            onClick={() => setFiltersOpen(true)}
                            variant="outline"
                            className="flex gap-2 items-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <SlidersHorizontal size={18} strokeWidth={2} />
                            Filters
                            <Badge variant="outline" className="ml-1">
                                {hotels.length}
                            </Badge>
                        </Button>
                    </div>
                    
                    <Filters open={filtersOpen} onOpenChange={setFiltersOpen} />
                    
                    <div className='flex flex-col gap-4 px-2 relative'>
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} {...hotel} />
                        ))}
                        {hotels.length === 0 && !loading && rendered.current&& !waitingForMessage && 
                        <div className='absolute inset-0'>
                            <NotFoundCard text="we couldn't find any hotels that match your criteria" />
                        </div>}
                    </div>
                </div>
                {loading && <div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-foreground/50">
                    <Loader2 className='animate-spin' />
                </div>}
                {/* Google Maps container */}
                {!loading && rendered.current && <div className="hidden lg:block z-10 lg:col-start-8 ml-4 lg:col-span-5">
                    <div className="sticky top-24 z-20 h-[calc(100vh-6rem)]">
                        <GoogleMaps />
                    </div>
                </div>}
            </div>
            {waitingForMessage && <div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-foreground/50">
                <Loader2 className='animate-spin' />
            </div>}
        </div>
    );
}