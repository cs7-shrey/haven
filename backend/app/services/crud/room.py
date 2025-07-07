from sqlalchemy.orm import Session
from app.models import RoomType, RatePlan
from sqlalchemy import select

def get_room_info_by_id(db: Session, room_type_id: int):
    query = (
        select(
            RoomType.room_type_id,
            RoomType.room_type_name, 
            RoomType.room_photos,
            RoomType.max_adults,
        )
        .where(RoomType.room_type_id == room_type_id)
    )
    result =  db.execute(query).mappings().one()
    return result
    
def get_rate_plan_by_plan_id(db: Session, rate_plan_id: int):
    query = (
        select(
            RatePlan.plan_id,
            RatePlan.pay_mode,
            RatePlan.base_fare,
            RatePlan.total_discount,
            RatePlan.taxes,
            RatePlan.filter_code
        )
        .where(RatePlan.plan_id == rate_plan_id)
    )
    result = db.execute(query).mappings().one()
    return result
