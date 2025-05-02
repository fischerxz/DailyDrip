import os
import requests
from typing import List, Dict
from datetime import datetime

# Define available sources and their categories
SOURCES = {
    "business": [
        "the-wall-street-journal",
        "bloomberg",
        "financial-times",
        "business-insider",
        "reuters"
    ],
    "technology": [
        "techcrunch",
        "wired",
        "the-verge",
        "ars-technica",
        "engadget"
    ],
    "sports": [
        "espn",
        "fox-sports",
        "bbc-sport",
        "nfl-news",
        "nba-news"
    ],
    "entertainment": [
        "entertainment-weekly",
        "mtv-news",
        "buzzfeed",
        "mashable",
        "polygon"
    ],
    "science": [
        "national-geographic",
        "new-scientist",
        "scientific-american",
        "science",
        "nature"
    ]
}

def fetch_news_api(api_key: str, source: str, category: str, num_articles: int = 3) -> List[Dict]:
    """
    Fetch news articles from NewsAPI.
    
    Args:
        api_key (str): Your NewsAPI key
        source (str): News source
        category (str): News category
        num_articles (int): Number of articles to fetch (default: 3)
    
    Returns:
        List[Dict]: List of articles with title, description, url, and published date
    """
    ENDPOINT = "https://newsapi.org/v2/top-headlines"
    
    params = {
        "apiKey": api_key,
        "sources": source,
        "pageSize": num_articles
    }
    
    try:
        resp = requests.get(ENDPOINT, params=params)
        resp.raise_for_status()  # Raise an exception for bad status codes
        data = resp.json()
        
        if data.get("status") != "ok":
            print(f"API Error for {source}: {data.get('message', 'Unknown error')}")
            return []
            
        articles = []
        for article in data.get("articles", []):
            articles.append({
                'title': article.get('title', 'No title'),
                'description': article.get('description', 'No description'),
                'url': article.get('url', 'No URL'),
                'published_at': article.get('publishedAt', 'No date'),
                'source': article.get('source', {}).get('name', 'Unknown source')
            })
        return articles
    except requests.exceptions.RequestException as e:
        print(f"Error fetching news from {source}: {e}")
        return []

def print_articles(articles: List[Dict], source: str) -> None:
    """Print the articles in a formatted way."""
    print(f"\nLatest articles from {source}:")
    print("-" * 80)
    for article in articles:
        print(f"Title: {article['title']}")
        print(f"Description: {article['description']}")
        print(f"URL: {article['url']}")
        print(f"Published: {article['published_at']}")
        print("-" * 80)

def get_user_category() -> str:
    """Get user's preferred news category."""
    print("\nSelect your preferred news category:")
    print("1. Business")
    print("2. Technology")
    print("3. Sports")
    print("4. Entertainment")
    print("5. Science")
    
    while True:
        try:
            choice = int(input("\nEnter your choice (1-5): "))
            if 1 <= choice <= 5:
                categories = list(SOURCES.keys())
                return categories[choice - 1]
            print("Please enter a number between 1 and 5")
        except ValueError:
            print("Please enter a valid number")

def main():
    # Get API key from environment variable
    API_KEY = os.getenv("NEWSAPI_KEY")
    
    if not API_KEY:
        print("Error: NEWSAPI_KEY environment variable not set")
        print("Please set your NewsAPI key using: export NEWSAPI_KEY='your_key_here'")
        return
    
    # Get user's preferred category
    category = get_user_category()
    sources = SOURCES[category]
    
    print(f"\nFetching news from {category} sources...")
    
    # Fetch articles from each source in the category
    for source in sources:
        articles = fetch_news_api(API_KEY, source, category)
        if articles:
            print_articles(articles, source)
        else:
            print(f"No articles found from {source}")

if __name__ == "__main__":
    main() 