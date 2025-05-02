from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return str(v)

class UserPreferences(BaseModel):
    categories: List[str] = Field(default=["business", "technology"])
    sources: List[str] = Field(default=[])
    digest_frequency: str = Field(default="daily")
    digest_time: str = Field(default="08:00")

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    preferences: UserPreferences = Field(default_factory=UserPreferences)

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    preferences: Optional[UserPreferences] = None

class UserInDB(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class User(UserBase):
    id: PyObjectId = Field(alias="_id")
    created_at: datetime
    updated_at: datetime
    is_active: bool
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None 