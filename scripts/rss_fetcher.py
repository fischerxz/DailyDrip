import feedparser
import sys
from typing import List, Dict
from datetime import datetime

def fetch_rss_feed(url: str, num_entries: int = 5) -> List[Dict]:
    """
    Fetch and parse an RSS feed from the given URL.
    
    Args:
        url (str): The URL of the RSS feed
        num_entries (int): Number of entries to return (default: 5)
    
    Returns:
        List[Dict]: List of feed entries with title, link, published date, and content
    """
    try:
        feed = feedparser.parse(url)
        if feed.bozo:
            print(f"Warning: Feed parsing encountered issues: {feed.bozo_exception}")
        
        entries = []
        for entry in feed.entries[:num_entries]:
            entries.append({
                'title': entry.title,
                'link': entry.link,
                'published': entry.get('published', 'No date available'),
                'content': entry.get('summary', entry.get('description', 'No content available'))
            })
        return entries
    except Exception as e:
        print(f"Error fetching RSS feed: {e}")
        return []

def print_feed_entries(entries: List[Dict]) -> None:
    """Print the feed entries in a formatted way."""
    print(f"\nLatest {len(entries)} headlines:")
    print("-" * 50)
    for entry in entries:
        print(f"Title: {entry['title']}")
        print(f"Link: {entry['link']}")
        print(f"Published: {entry['published']}")
        print(f"Content: {entry['content']}")
        print("-" * 50)

def main():
    # Default RSS feed URL (BBC World News)
    RSS_URL = "http://feeds.bbci.co.uk/news/world/rss.xml"
    
    # You can change this to any other RSS feed URL
    # Examples:
    # - CNN: "http://rss.cnn.com/rss/cnn_topstories.rss"
    # - Reuters: "http://feeds.reuters.com/reuters/topNews"
    
    print(f"Fetching RSS feed from: {RSS_URL}")
    entries = fetch_rss_feed(RSS_URL)
    
    if entries:
        print_feed_entries(entries)
    else:
        print("No entries found or error occurred while fetching the feed.")

if __name__ == "__main__":
    main() 