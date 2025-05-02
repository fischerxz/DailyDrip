"""
API routes for article management
"""
from fastapi import APIRouter

router = APIRouter(
    prefix="/articles",
    tags=["articles"],
    responses={404: {"description": "Not found"}},
)

# To be implemented:
# - get_articles
# - get_article_by_id
# - search_articles 