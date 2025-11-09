"use client";

import React from 'react';
import ImageNavigator from '../ImageNavigator';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Images } from 'lucide-react';

interface Props {
    images: string[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const HotelImagePopup: React.FC<Props> = ({ images, open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-auto max-h-[85vh] p-0 gap-0 flex flex-col">
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Images className="h-6 w-6 text-primary" size={20} />
                        <p className='text-lg'>
                            Hotel Gallery
                        </p>
                    </DialogTitle>
                </DialogHeader>
                
                <ScrollArea className="flex-1 overflow-auto max-h-[calc(85vh-5rem)]">
                    <div className="p-6">
                        <ImageNavigator images={images} />
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default HotelImagePopup;
