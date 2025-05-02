"""
User models for DailyDrip
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    preferences: List[str] = Field(default_factory=list)

class UserCreate(UserBase):
    pass

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# To be implemented:
# - User model
# - UserPreferences model
# - UserUpdate model 