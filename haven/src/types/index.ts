export interface Hotel {
    id: string;
    name: string;
    location: string;
    base_fare?: number;
    images?: string[];
    hotel_star?: number;
    user_rating?: number;
    user_rating_count?: number;
    latitude: number;
    longitude: number;
}
export enum Language {
    English = "en",
    Hindi = "hi"
}
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
// todo: combine with the search hotel params above
export interface BackendFilters {
    place: Place;
    check_in: string;
    check_out: string;
    min_budget: number;
    max_budget: number;
    user_rating: number;
    hotel_star: number;
    property_type: string[];
    hotel_amenity_codes: string[];
    room_amenity_codes: string[];
    proximity_coordinate: ProximityCoordinate | null;
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
export interface Status {
    code: number    
    message: string 
}