"use client";

import React from "react";
import { useTempFilterStore } from "@/store/useTempFilterStore";
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle,
    SheetFooter,
    SheetDescription 
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Check } from "lucide-react";

import HotelAmenityFilter from "./HotelAmenityFilter";
import HotelStarFilter from "./HotelStarFilter";
import UserRatingFilter from "./UserRatingFilter";
import RoomAmenityFilter from "./RoomAmenityFilter";
import HotelPriceFilter from "./HotelPriceFilter";
import { useHotelFilters } from "@/hooks/hotels/useHotelFIlters";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const Filters: React.FC<Props> = ({ open, onOpenChange }) => {
    const { handleApply } = useHotelFilters({
        onApplyButtonUIChange: () => onOpenChange(false)
    });
    const {
        tempUserRating, 
        setTempUserRating, 
        tempHotelStar, 
        setTempHotelStar,
        tempMinBudget,
        tempMaxBudget,
        tempHotelAmenities,
        tempRoomAmenities,
        setTempMinBudget,
        setTempMaxBudget,
        setTempHotelAmenities,
        setTempRoomAmenities
    } = useTempFilterStore();
    
    const handleReset = () => {
        setTempUserRating(0);
        setTempHotelStar([0, 1, 2, 3, 4, 5]);
        setTempMinBudget(0);
        setTempMaxBudget(50000);
        setTempHotelAmenities([]);
        setTempRoomAmenities([]);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (tempUserRating > 0) count++;
        if (tempHotelStar[0] !== 0 || tempHotelStar.length < 6) count++;
        if (tempMinBudget > 0 || tempMaxBudget < 50000) count++;
        if (tempHotelAmenities.length > 0) count++;
        if (tempRoomAmenities.length > 0) count++;
        return count;
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent 
                side="left" 
                className="w-full sm:max-w-md p-0 flex flex-col"
            >
                <SheetHeader className="px-6 py-4 border-b shrink-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
                            <SheetDescription className="mt-1">
                                Refine your hotel search
                            </SheetDescription>
                        </div>
                        {getActiveFiltersCount() > 0 && (
                            <Badge variant="secondary" className="ml-2 mt-auto">
                                {getActiveFiltersCount()} active
                            </Badge>
                        )}
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 overflow-auto">
                    <div className="px-6 py-4">
                        <Accordion 
                            type="multiple" 
                            defaultValue={["price", "rating", "stars", "hotel-amenities", "room-amenities"]}
                            className="space-y-2"
                        >
                        <AccordionItem value="price" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Price Range</span>
                                    {(tempMinBudget > 0 || tempMaxBudget < 50000) && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            Active
                                        </Badge>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <HotelPriceFilter />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="rating" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">User Rating</span>
                                    {tempUserRating > 0 && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            {tempUserRating}+
                                        </Badge>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <UserRatingFilter 
                                    rating={tempUserRating} 
                                    setRating={setTempUserRating}
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="stars" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Hotel Class</span>
                                    {(tempHotelStar[0] !== 0 || tempHotelStar.length < 6) && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            {tempHotelStar.length} selected
                                        </Badge>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <HotelStarFilter 
                                    hotelStar={tempHotelStar} 
                                    setHotelStar={setTempHotelStar}
                                />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="hotel-amenities" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Hotel Amenities</span>
                                    {tempHotelAmenities.length > 0 && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            {tempHotelAmenities.length}
                                        </Badge>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <HotelAmenityFilter />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="room-amenities" className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Room Amenities</span>
                                    {tempRoomAmenities.length > 0 && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            {tempRoomAmenities.length}
                                        </Badge>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <RoomAmenityFilter />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    </div>
                </ScrollArea>

                <Separator className="shrink-0" />

                <SheetFooter className="px-6 py-4 flex-row gap-3 shrink-0">
                    <Button 
                        variant="outline" 
                        onClick={handleReset}
                        className="flex-1"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                    <Button 
                        onClick={handleApply}
                        className="flex-1"
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Apply Filters
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default Filters;
