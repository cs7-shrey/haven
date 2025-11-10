import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { type Hotel } from '@/types';
import { useHotelStore } from '@/store/useHotelStore';
import { cn } from '@/lib/utils';

const placeholderImg = "/placeholderImg.jpg"

const HotelCard: React.FC<Hotel> = ({
    id,
    name,
    location,
    base_fare = 0,
    images = [],
    hotel_star = 0,
    user_rating = 0,
    user_rating_count = 0,
}) => {
    // State to track the currently displayed main image
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { selectedHotelId, setSelectedHotelId } = useHotelStore();    
    // Calculate the number of remaining images for the "+X" overlay
    const remainingImages = images.length - 4;

    // Function to render the rating bubbles (similar to TripAdvisor style)
    const renderRatingBubbles = (rating: number) => {
        const fullBubbles = Math.floor(rating);
        const hasHalfBubble = rating % 1 >= 0.5;
        const totalBubbles = 5;

        return (
            <div className="flex gap-0.5">
                {Array.from({ length: totalBubbles }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${
                            index < fullBubbles
                                ? 'bg-green-500'
                                : index === fullBubbles && hasHalfBubble
                                    ? 'bg-gradient-to-r from-green-500 to-white'
                                    : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div 
            id={String(id)} 
            className={cn(
                "group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 ease-in-out",
                selectedHotelId === id ? "ring-2 ring-primary shadow-lg" : "shadow-sm",
                isHovered && "shadow-xl scale-[1.01]"
            )}
            onMouseEnter={() => {
                setIsHovered(true);
                setSelectedHotelId(id);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Left side - Main Image and Thumbnail Gallery */}
            <a href={`/hotel/${id}`} className='flex w-full h-full overflow-hidden' target='_blank'>
                <div className="relative flex flex-col w-32 md:w-52 lg:w-52 shrink-0">
                    {/* Main Image */}
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={images[selectedImageIndex] ? 'https:' + images[selectedImageIndex] : placeholderImg} 
                            alt={`${name} - View ${selectedImageIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Gradient overlay on main image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="flex bg-muted/50 backdrop-blur-sm p-1 gap-1">
                        {images.slice(0, 5).map((img, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "w-14 h-14 cursor-pointer relative overflow-hidden rounded-md transition-all duration-200",
                                    selectedImageIndex === index && "ring-2 ring-primary"
                                )}
                                onMouseEnter={() => setSelectedImageIndex(index)}
                            >
                                <img
                                    src={img ? 'https:' + img : placeholderImg}
                                    alt={`${name} - Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                                />
                                {/* Show remaining images count on the last visible thumbnail */}
                                {index === 4 && remainingImages > 0 && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-[8px] md:text-[10px] font-medium text-center">
                                        VIEW ALL
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 p-4 md:p-5 flex flex-col sm:flex-row gap-4 bg-card">
                    {/* Hotel Information Section */}
                    <div className="flex-1 space-y-3">
                        <h2 className="text-md sm:text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                            {name}
                        </h2>
                    
                        {/* Hotel Class (Star Rating) */}
                        <div className="flex items-center">
                            {[...Array(hotel_star)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className="size-3 md:size-4 fill-[#E55842] text-[#E55842]" 
                                />
                            ))}
                        </div>

                        {/* User Rating Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <div className='flex items-center gap-2'>
                                <div className="text-sm sm:text-md font-semibold">{user_rating}</div>
                                {renderRatingBubbles(user_rating)}
                            </div>
                            <div className="text-muted-foreground text-xs">
                                {user_rating_count} reviews
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm sm:text-md">
                            <MapPin className="size-4 shrink-0" />
                            <span className="line-clamp-1">{location}</span>
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden sm:block w-px bg-border" />

                    {/* Price Section */}
                    {base_fare && (
                        <div className="flex flex-col justify-center items-end shrink-0">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                                ₹{base_fare.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                per night
                            </div>
                        </div>
                    )}
                </div>
            </a>
        </div>
    );
};

export default HotelCard;