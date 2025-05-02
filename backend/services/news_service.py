import os
from datetime import datetime
from typing import List, Dict, Optional
import numpy as np
import faiss

from database.connection import articles_collection
from models.article import ArticleCreate, ArticleInDB, Article, ArticleUpdate
from services.openai_summarizer import summarize_article

class NewsService:
    def __init__(self):
        self.api_key = os.getenv("NEWSAPI_KEY")
        self.dim = 1536  # OpenAI embedding dimension
        self.index = faiss.IndexFlatL2(self.dim)
        self.article_ids = []
        
    async def fetch_articles(self, sources: List[str], categories: List[str], limit: int = 10) -> List[Article]:
        """Fetch articles from NewsAPI based on sources and categories."""
        from services.news_api_fetcher import fetch_news_api
        
        articles = []
        for source in sources:
            category = next((c for c in categories if source in fetch_news_api.SOURCES.get(c, [])), None)
            if category:
                # Fetch articles from the source
                fetched_articles = fetch_news_api(self.api_key, source, category, limit)
                for article_data in fetched_articles:
                    # Check if article already exists in database
                    existing = await articles_collection.find_one({"url": article_data["url"]})
                    if not existing:
                        # Create new article
                        article = ArticleCreate(
                            title=article_data["title"],
                            description=article_data["description"],
                            url=article_data["url"],
                            source=article_data["source"],
                            published_at=datetime.fromisoformat(article_data["published_at"].replace("Z", "+00:00")),
                            categories=[category]
                        )
                        
                        # Store in database
                        article_in_db = ArticleInDB(**article.dict())
                        result = await articles_collection.insert_one(article_in_db.dict(by_alias=True))
                        
                        # Return created article
                        created_article = await articles_collection.find_one({"_id": result.inserted_id})
                        articles.append(Article(**created_article))
                    else:
                        # Return existing article
                        articles.append(Article(**existing))
        
        return articles
    
    async def get_articles(self, limit: int = 10, skip: int = 0, 
                          categories: Optional[List[str]] = None) -> List[Article]:
        """Get articles from database."""
        query = {}
        if categories:
            query["categories"] = {"$in": categories}
        
        cursor = articles_collection.find(query).sort("published_at", -1).skip(skip).limit(limit)
        return [Article(**doc) async for doc in cursor]
    
    async def get_article(self, article_id: str) -> Optional[Article]:
        """Get a single article by ID."""
        article = await articles_collection.find_one({"_id": article_id})
        if article:
            return Article(**article)
        return None
    
    async def summarize_articles(self, article_ids: List[str]) -> List[Article]:
        """Generate summaries for articles using OpenAI."""
        summarized_articles = []
        
        for article_id in article_ids:
            article = await self.get_article(article_id)
            if not article or article.summary:  # Skip if already summarized
                continue
                
            try:
                # Generate summary
                summary = await summarize_article(
                    article.title, 
                    article.content or article.description or ""
                )
                
                # Update article with summary
                await articles_collection.update_one(
                    {"_id": article_id},
                    {"$set": {"summary": summary, "updated_at": datetime.utcnow()}}
                )
                
                # Get updated article
                updated_article = await self.get_article(article_id)
                if updated_article:
                    summarized_articles.append(updated_article)
            except Exception as e:
                print(f"Error summarizing article {article_id}: {e}")
        
        return summarized_articles
    
    async def search_articles(self, query_embedding: List[float], limit: int = 5) -> List[Article]:
        """Search for articles using vector similarity."""
        # This is a simplified version; in a real app, you'd load embeddings from DB
        # and use FAISS for efficient search
        
        # In MVP, we'll just return recent articles
        return await self.get_articles(limit=limit)

news_service = NewsService() 