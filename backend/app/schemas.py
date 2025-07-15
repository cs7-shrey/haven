import datetime
from enum import Enum
from pydantic import BaseModel
from typing import Optional

# the decoded token data that is used to the current user
class TokenData(BaseModel):
    user_id: int
    
class Hotel(BaseModel):
    id: str
    gi_id: int
    name: str
    location: str
    hotel_star: int
    user_rating: float = 0.0
    user_rating_count: int = 0
    property_type: str
    images: list[str]

class Beds(BaseModel):
    type: str
    count: int  
    bedTypeKey: Optional[str] = None # TODO: CHANGE THIS LATER

class HotelRoom(BaseModel):
    room_type_id: int
    room_type_name: str
    room_photos: list[str]
    max_guests: int
    max_adults: int
    max_children: int
    display_amenities: list[str]
    beds: Optional[list[Beds]] = []  # Forward reference for Beds model
    
class RatePlan(BaseModel):
    plan_id: int
    pay_mode: str
    base_fare: float
    total_discount: float
    taxes: float
    filter_code: list[str]
    

class Place(BaseModel):
    name: str
    type: str
    
class DateFilters(BaseModel):
    check_in: Optional[datetime.datetime] = (datetime.date.today() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')
    check_out: Optional[datetime.datetime] = (datetime.date.today() + datetime.timedelta(days=2)).strftime('%Y-%m-%d')
    
class BudgetFilters(BaseModel):
    min_budget: Optional[int] = 0
    max_budget: Optional[int] = 50000

class RatingFilters(BaseModel):
    hotel_star: list[int] = [0,1,2,3,4,5]
    user_rating: Optional[float] = 0      

class AmenityFilters(BaseModel):
    hotel_amenity_codes: Optional[list[str]] = []
    room_amenity_codes: Optional[list[str]] = []

class ProximityCoordinate(BaseModel):
    latitude: float
    longitude: float 
    
class SearchFilters(DateFilters, BudgetFilters, RatingFilters, AmenityFilters):
    place: Place
    proximity_coordinate: Optional[ProximityCoordinate] | None = None
    property_type: Optional[list[str]] = []

class SearchHotelsRequest(SearchFilters):
    near: Optional[str] = ''

# For display in the search results
# TODO: Combine this with the `Hotel` model
class HotelDetails(BaseModel):
    id: str
    name: str
    location: str
    base_fare: float = 0.0
    hotel_star: int
    user_rating: float = 0
    user_rating_count: int
    images: list[str]
    latitude: float 
    longitude: float


class Status(BaseModel):
    code: int
    message: str

class VoiceSearchResponse(BaseModel):
    status: Status
    filters: SearchFilters
    data: list[HotelDetails]

class ChatMode(str, Enum):
    voice = "voice"
    text = "text"

class Service(str, Enum):
    CHAT = "chat"
    SEARCH = "search"

class HealthCheckResponse(BaseModel):
    name: str
    code: str
