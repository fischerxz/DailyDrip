"""
News API Fetcher Service
-----------------------
Fetches articles from NewsAPI, summarizes them using OpenAI, and stores in MongoDB.
"""
import os
import asyncio
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any
import httpx
from openai import AsyncOpenAI
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path

def load_env_from_file():
    """Load environment variables from .env file."""
    current_dir = Path(__file__).resolve().parent
    project_root = current_dir.parent.parent.parent
    env_path = project_root / '.env'
    
    print(f"Loading environment from: {env_path}")
    if not env_path.exists():
        raise FileNotFoundError(f".env file not found at {env_path}")
    
    # Read and parse .env file
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

# Load environment variables
load_env_from_file()

# Debug: Print all environment variables
print("\nEnvironment variables:")
for key in ['NEWS_API_KEY', 'OPENAI_API_KEY', 'MONGO_URI', 'DB_NAME']:
    value = os.getenv(key)
    if value:
        print(f"{key}: {'*' * min(len(value), 10)}")
    else:
        print(f"{key}: Not set")

# Configuration with error checking
NEWSAPI_KEY = os.getenv("NEWS_API_KEY")
if not NEWSAPI_KEY:
    raise ValueError("NEWS_API_KEY environment variable is not set")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "dailydrip")

print(f"Initializing with NewsAPI key: {NEWSAPI_KEY[:5]}...")

# Initialize clients
mongo_client = AsyncIOMotorClient(MONGO_URI)
db = mongo_client[DB_NAME]
openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

class NewsAPIFetcher:
    def __init__(self):
        self.base_url = "https://newsapi.org/v2/everything"
        self.headers = {"X-Api-Key": NEWSAPI_KEY}

    async def fetch_articles(self, query: str, from_date: datetime = None) -> List[Dict[str, Any]]:
        """Fetch articles from NewsAPI."""
        if from_date is None:
            from_date = datetime.now(timezone.utc) - timedelta(days=1)

        params = {
            "q": query,
            "from": from_date.strftime("%Y-%m-%d"),  # Format date correctly
            "sortBy": "publishedAt",
            "language": "en",
            "pageSize": 100  # Add page size parameter
        }

        print(f"\nMaking NewsAPI request:")
        print(f"URL: {self.base_url}")
        print(f"Headers: X-Api-Key: {self.headers['X-Api-Key'][:5]}...")
        print(f"Params: {params}")

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    self.base_url,
                    headers=self.headers,
                    params=params,
                    timeout=30.0
                )
                
                print(f"\nResponse Status: {response.status_code}")
                data = response.json()
                
                if response.status_code != 200:
                    print(f"API Error Response: {data}")
                    return []
                    
                if "articles" not in data:
                    print(f"Unexpected API Response: {data}")
                    return []
                    
                articles = data["articles"]
                print(f"\nAPI Status: {data.get('status')}")
                print(f"Total Results: {data.get('totalResults')}")
                print(f"Articles Retrieved: {len(articles)}")
                
                return articles
                
        except httpx.HTTPError as e:
            print(f"HTTP Error: {str(e)}")
            return []
        except Exception as e:
            print(f"Error fetching articles: {str(e)}")
            return []

async def summarize_article(content: str) -> str:
    """Generate a concise summary using OpenAI."""
    try:
        response = await openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a professional news summarizer. Create a concise, informative summary of the article in 2-3 sentences."},
                {"role": "user", "content": f"Please summarize this article:\n\n{content}"}
            ],
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error summarizing article: {e}")
        return None

async def process_and_store_article(article: Dict[str, Any]) -> bool:
    """Process a single article and store it in MongoDB."""
    try:
        # Check if article already exists
        existing = await db.articles.find_one({"url": article["url"]})
        if existing:
            print(f"Article already exists: {article['url']}")
            return False

        # Store article first without summary
        article_doc = {
            "title": article["title"],
            "url": article["url"],
            "source": article["source"]["name"],
            "author": article.get("author"),
            "content": article.get("content"),
            "publishedAt": datetime.fromisoformat(article["publishedAt"].replace('Z', '+00:00')),
            "fetchedAt": datetime.now(timezone.utc),
            "topics": [],
            "summary": None  # Will be updated later
        }

        # Store in MongoDB
        result = await db.articles.insert_one(article_doc)
        print(f"Stored article: {article['title']}")
        return True

    except Exception as e:
        print(f"Error processing article: {e}")
        return False

async def summarize_stored_articles(batch_size: int = 5):
    """Summarize articles that don't have summaries yet."""
    try:
        # Find articles without summaries
        articles = await db.articles.find({"summary": None}).to_list(length=None)
        print(f"\nFound {len(articles)} articles needing summarization")

        # Process in batches
        for i in range(0, len(articles), batch_size):
            batch = articles[i:i + batch_size]
            print(f"\nProcessing batch {i//batch_size + 1} of {len(articles)//batch_size + 1}")
            
            for article in batch:
                try:
                    # Prepare content for summarization
                    content = f"{article['title']}\n\n{article.get('content', '')}"
                    
                    # Generate summary
                    summary = await summarize_article(content)
                    if summary:
                        # Update article with summary
                        await db.articles.update_one(
                            {"_id": article["_id"]},
                            {"$set": {"summary": summary}}
                        )
                        print(f"Added summary for: {article['title']}")
                    
                    # Wait between articles to respect rate limits
                    await asyncio.sleep(1)
                
                except Exception as e:
                    print(f"Error summarizing article {article['title']}: {e}")
            
            # Wait between batches
            print("Waiting 60 seconds before next batch...")
            await asyncio.sleep(60)

    except Exception as e:
        print(f"Error in summarize_stored_articles: {e}")

async def fetch_and_process_articles(query: str = "technology OR AI OR science", days: int = 1):
    """Main function to fetch and store articles."""
    fetcher = NewsAPIFetcher()
    from_date = datetime.now(timezone.utc) - timedelta(days=days)
    
    try:
        # Fetch articles
        articles = await fetcher.fetch_articles(query, from_date)
        print(f"\nFetched {len(articles)} articles")
        
        # Store articles first
        tasks = [process_and_store_article(article) for article in articles]
        results = await asyncio.gather(*tasks)
        
        # Print storage summary
        successful = sum(1 for r in results if r)
        print(f"\nStorage Summary:")
        print(f"Total articles fetched: {len(articles)}")
        print(f"Successfully stored: {successful}")
        print(f"Failed to store: {len(articles) - successful}")
        
        # Now summarize in batches
        print("\nStarting article summarization...")
        await summarize_stored_articles(batch_size=5)

    except Exception as e:
        print(f"Error in fetch_and_process_articles: {e}")

if __name__ == "__main__":
    asyncio.run(fetch_and_process_articles()) 