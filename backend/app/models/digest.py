"""
Digest models for DailyDrip
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

class DigestBase(BaseModel):
    userId: str
    date: datetime
    articles: List[str] = Field(default_factory=list)  # List of article IDs
    status: Literal["pending", "generated", "delivered"] = "pending"

class DigestCreate(DigestBase):
    pass

class DigestInDB(DigestBase):
    id: str = Field(alias="_id")
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# To be implemented:
# - Digest model
# - DigestCreate model
# - DigestInDB model 