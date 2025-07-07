from pydantic import BaseModel
from datetime import date

class BookHotelSchema(BaseModel):
    check_in: date
    check_out: date
    hotel_id: str
    room_type_id: int
    rate_plan_id: int

class BookingDetails(BaseModel):
    booking_id: int
    check_in: date
    check_out: date
    hotel: dict
    room_type: dict
    rate_plan: dict