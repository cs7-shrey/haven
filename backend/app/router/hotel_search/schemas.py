from app.schemas import HotelDetails, ProximityCoordinate
from pydantic import BaseModel
from typing import Optional

class SearchSuggestion(BaseModel):
    label: str
    sublabel: str
    type: str
    score: float

class HotelSearchResponse(BaseModel):
    hotels: list[HotelDetails]
    proximity_coordinate: Optional[ProximityCoordinate] = None
    near: Optional[str] = ''