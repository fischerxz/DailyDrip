import os
from openai import OpenAI
from typing import Dict, Optional
from datetime import datetime

# Initialize OpenAI client
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.getenv("OPENAI_API_KEY"),
)

def summarize_article(article: Dict) -> Optional[str]:
    """
    Sends the article to GPT-4 and returns a bullet-point summary.
    
    Args:
        article (Dict): Dictionary containing article details with keys:
            - title: Article title
            - description: Article content/description
            - url: Article URL
            - published_at: Publication date
    
    Returns:
        Optional[str]: Summary of the article or None if summarization fails
    """
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY environment variable not set")
        print("Please set your OpenAI API key using: export OPENAI_API_KEY='your_key_here'")
        return None

    try:
        response = client.responses.create(
            model="gpt-4o",
            instructions="You are a news curator. Extract the top 3–5 key points and provide a concise summary in bullet points. Keep the summary brief and focused on the most important information.",
            input=[
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": f"Title: {article['title']}"},
                        {"type": "input_text", "text": f"URL: {article['url']}"},
                        {"type": "input_text", "text": f"Published: {article['published_at']}"},
                        {"type": "input_text", "text": f"Content: {article['description']}"},
                    ],
                }
            ],
            temperature=0.3,
        )
        
        return response.output_text.strip()
        
    except Exception as e:
        print(f"Error summarizing article: {e}")
        return None

def print_summary(article: Dict, summary: str) -> None:
    """Print the article and its summary in a formatted way."""
    print("\n" + "=" * 80)
    print(f"Title: {article['title']}")
    print(f"URL: {article['url']}")
    print(f"Published: {article['published_at']}")
    print("\n🔖 Summary:")
    print(summary)
    print("=" * 80)

if __name__ == "__main__":
    # Example usage with a sample article
    sample_article = {
        "title": "Sample News Article",
        "description": (
            "In a groundbreaking development, scientists have discovered a new method "
            "for sustainable energy production. The research, published in Nature, "
            "demonstrates how solar panels can be made more efficient using a novel "
            "nanomaterial. This breakthrough could potentially reduce the cost of "
            "solar energy by up to 30% and make renewable energy more accessible "
            "worldwide. The team of researchers from MIT and Stanford University "
            "collaborated on this project for over five years, combining expertise "
            "in materials science and renewable energy technology."
        ),
        "url": "https://example.com/article",
        "published_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    summary = summarize_article(sample_article)
    if summary:
        print_summary(sample_article, summary) 