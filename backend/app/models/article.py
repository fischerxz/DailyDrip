"""
Article models for DailyDrip
"""
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from datetime import datetime

class ArticleBase(BaseModel):
    title: str
    url: HttpUrl
    source: str
    summary: Optional[str] = None
    content: Optional[str] = None
    topics: List[str] = Field(default_factory=list)
    publishedAt: datetime

class ArticleCreate(ArticleBase):
    pass

class ArticleInDB(ArticleBase):
    id: str = Field(alias="_id")
    fetchedAt: datetime = Field(default_factory=datetime.utcnow)
    summary: str  # Required in DB

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# To be implemented:
# - Article model
# - ArticleCreate model
# - ArticleInDB model 