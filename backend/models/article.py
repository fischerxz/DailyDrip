from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from models.user import PyObjectId

class ArticleBase(BaseModel):
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    url: HttpUrl
    source: str
    published_at: datetime
    categories: List[str] = Field(default=[])
    
class ArticleCreate(ArticleBase):
    pass

class ArticleInDB(ArticleBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    summary: Optional[str] = None
    embedding: Optional[List[float]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class Article(ArticleBase):
    id: PyObjectId = Field(alias="_id")
    summary: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

class ArticleUpdate(BaseModel):
    summary: Optional[str] = None
    embedding: Optional[List[float]] = None 