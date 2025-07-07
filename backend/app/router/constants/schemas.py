from pydantic import BaseModel
from typing import Optional

class Constants(BaseModel):
    name: str
    code: Optional[str] = ''