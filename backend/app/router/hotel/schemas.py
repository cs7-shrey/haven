from app.schemas import Hotel, HotelRoom, RatePlan

class HotelInfoResponse(Hotel):
    amenities: list[str]

class HotelRoomResponse(HotelRoom):
    rate_plans: list[RatePlan]