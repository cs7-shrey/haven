export interface SearchHotelParams {
    place: Place;
    checkIn: Date;
    checkOut: Date;
    minBudget: number;
    maxBudget: number;
    hotelStar?: number[];
    userRating?: number;
    propertyType?: string[];
    hotelAmenities?: Amenity[];
    roomAmenities?: Amenity[];
    proximityCoordinate?: ProximityCoordinate;
}
export interface Place {
    name: string;
    type: string;
}
export interface ProximityCoordinate {
    latitude: number;
    longitude: number;
}
export interface Amenity {
    name?: string;
    code: string;
}