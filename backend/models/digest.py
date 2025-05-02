from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from models.user import PyObjectId

class DigestBase(BaseModel):
    user_id: PyObjectId
    article_ids: List[PyObjectId]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    title: str = Field(default="Your Daily News Digest")
    
class DigestCreate(DigestBase):
    pass

class DigestInDB(DigestBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    introduction: Optional[str] = None
    conclusion: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class Digest(DigestBase):
    id: PyObjectId = Field(alias="_id")
    introduction: Optional[str] = None
    conclusion: Optional[str] = None
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class DigestUpdate(BaseModel):
    introduction: Optional[str] = None
    conclusion: Optional[str] = None 