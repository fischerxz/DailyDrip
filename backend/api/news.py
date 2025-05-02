from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional

from models.user import User
from models.article import Article
from services.news_service import news_service
from utils.auth import get_current_active_user

router = APIRouter()

@router.get("/articles", response_model=List[Article])
async def get_articles(
    limit: int = Query(10, ge=1, le=50),
    skip: int = Query(0, ge=0),
    categories: Optional[List[str]] = Query(None),
    current_user: User = Depends(get_current_active_user)
):
    """Get articles from the database."""
    return await news_service.get_articles(limit, skip, categories)

@router.get("/articles/{article_id}", response_model=Article)
async def get_article(
    article_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get a single article by ID."""
    article = await news_service.get_article(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.post("/fetch", response_model=List[Article])
async def fetch_articles(
    limit: int = Query(10, ge=1, le=20),
    current_user: User = Depends(get_current_active_user)
):
    """Fetch new articles from NewsAPI based on user preferences."""
    # Get user preferences
    categories = current_user.preferences.categories
    
    # Get sources for each category
    from services.news_api_fetcher import SOURCES
    sources = []
    for category in categories:
        sources.extend(SOURCES.get(category, []))
    
    if not sources:
        raise HTTPException(status_code=400, detail="No valid sources found in user preferences")
    
    return await news_service.fetch_articles(sources, categories, limit) 