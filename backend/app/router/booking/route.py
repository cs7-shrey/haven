from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas import TokenData
from .service import get_bookings_by_user_id, get_booking_info_by_id, check_booking_detail_validity, book_hotel
from app.oauth2 import get_current_client
from app.database import get_db
from sqlalchemy.orm import Session

from .schemas import BookHotelSchema

router = APIRouter(prefix='/user')

@router.get('/bookings')
async def get_bookings(current_user: TokenData = Depends(get_current_client), db: Session = Depends(get_db)):
    try:
        bookings = get_bookings_by_user_id(db, current_user.user_id)
        return bookings
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not fetch bookings")
    
@router.get('/booking/{id}')
async def get_booking_by_id(id: int, current_user: TokenData = Depends(get_current_client), db: Session = Depends(get_db)):
    try:
        booking = get_booking_info_by_id(db, id, current_user.user_id)
        if not booking:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
        return booking
    except Exception as e:
        print(e)

@router.post('/hotel/book')
async def book_hotel_route(booking_details: BookHotelSchema, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_client)):
    # checking details
    res = check_booking_detail_validity(db, int(booking_details.hotel_id), booking_details.room_type_id, booking_details.rate_plan_id)
    if not res:
        raise HTTPException(status_code=400, detail="Invalid booking details")
    # book the hotel 
    booking = book_hotel(db, current_user.user_id, booking_details)
    if not booking:
        raise HTTPException(status_code=400, detail="Booking failed")
    return {"message": "Booking successful", "booking_id": booking.booking_id}