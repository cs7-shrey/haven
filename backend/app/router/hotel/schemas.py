from app.schemas import Hotel, HotelRoom, RatePlan

class HotelInfoResponse(Hotel):
    id: str
    gi_id: int
    name: str
    location: str
    hotel_star: int
    user_rating: float = 0
    user_rating_count: int
    property_type: str
    images: list[str]
    amenities: list[str]

class HotelRoomResponse(HotelRoom):
    rate_plans: list[RatePlan]