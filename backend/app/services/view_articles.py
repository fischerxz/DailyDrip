"""
MongoDB Article Viewer
--------------------
View articles stored in the MongoDB database.
"""
import asyncio
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path

def load_env_from_file():
    """Load environment variables from .env file."""
    current_dir = Path(__file__).resolve().parent
    project_root = current_dir.parent.parent.parent
    env_path = project_root / '.env'
    
    if not env_path.exists():
        raise FileNotFoundError(f".env file not found at {env_path}")
    
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

# Load environment variables
load_env_from_file()

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "dailydrip")

async def view_articles():
    """View all articles in the database."""
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    
    try:
        # Get total count
        total_count = await db.articles.count_documents({})
        print(f"\nTotal articles in database: {total_count}")
        
        # Get articles with and without summaries
        with_summary = await db.articles.count_documents({"summary": {"$ne": None}})
        without_summary = await db.articles.count_documents({"summary": None})
        print(f"Articles with summaries: {with_summary}")
        print(f"Articles without summaries: {without_summary}")
        
        # Get latest articles
        print("\nLatest 10 articles:")
        print("-" * 80)
        
        cursor = db.articles.find().sort("publishedAt", -1).limit(10)
        async for article in cursor:
            print(f"\nTitle: {article['title']}")
            print(f"Source: {article['source']}")
            print(f"Published: {article['publishedAt']}")
            print(f"URL: {article['url']}")
            if article.get('summary'):
                print(f"Summary: {article['summary']}")
            else:
                print("Summary: Not yet generated")
            print("-" * 40)
            
    except Exception as e:
        print(f"Error viewing articles: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(view_articles()) 