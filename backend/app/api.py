from fastapi import APIRouter

from app.router.auth.route import router as auth_router
from app.router.constants.route import router as constants_router
from app.router.booking.route import router as booking_router
from app.router.hotel_search.route import router as hotel_search_router
from app.router.hotel.route import router as hotel_router
from app.router.voice_search_exp.route import router as voice_search_router

from app.router import room

router = APIRouter()

router.include_router(auth_router)
router.include_router(constants_router)
router.include_router(booking_router)
router.include_router(hotel_search_router)
router.include_router(hotel_router)
# router.include_router(voice.router)
router.include_router(room.router)
# router.include_router(voice_search.router)
router.include_router(voice_search_router)
