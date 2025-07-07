from pydantic import BaseModel
from datetime import date

class BookHotelSchema(BaseModel):
    check_in: date
    check_out: date
    hotel_id: str
    room_type_id: int
    rate_plan_id: int