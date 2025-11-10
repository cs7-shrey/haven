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
import { Separator } from "@/components/ui/separator";
import { BedDouble, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    images: string[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    amenities: string[];
}

const RoomMoreInfo: React.FC<Props> = ({ images, open, onOpenChange, amenities }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[90vh] p-0 gap-0 flex flex-col">
                <DialogHeader className="px-6 py-4 border-b shrink-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-2 text-2xl">
                            <BedDouble className="h-6 w-6 text-primary" />
                            Room Details
                        </DialogTitle>
                    </div>
                </DialogHeader>
                
                <ScrollArea className="flex-1 overflow-auto">
                    <div className="p-6 space-y-6">
                        {/* Image Gallery Section */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                Room Gallery
                            </h3>
                            <div className="rounded-lg overflow-hidden border border-border">
                                <ImageNavigator images={images} />
                            </div>
                        </div>

                        <Separator />

                        {/* Amenities Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                Room Amenities
                            </h3>
                            {amenities.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {amenities.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex items-start gap-3 p-3 rounded-lg",
                                                "bg-accent/50 border border-border/50",
                                                "transition-colors hover:bg-accent"
                                            )}
                                        >
                                            <div className="shrink-0 mt-0.5">
                                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                                                    <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                                                </div>
                                            </div>
                                            <span className="text-sm text-foreground leading-relaxed">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm text-center py-8">
                                    No amenities listed for this room.
                                </p>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default RoomMoreInfo;
