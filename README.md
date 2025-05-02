# DailyDrip

A personalized news digest system that fetches, summarizes, and delivers news based on user preferences.

## Project Structure

- **frontend**: React-based UI for user login, preferences, and digest display
- **backend**: FastAPI server handling article fetching, summarization, and storage
- **database**: MongoDB configuration and schemas
- **embedding**: FAISS vector database for semantic search

## Features

- User authentication and preference management
- Automated news fetching from NewsAPI
- Article summarization using OpenAI GPT
- Personalized news digest generation
- Article search capabilities

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB

### Setup

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
4. Set up environment variables in `.env`
5. Start the application:
   ```
   # In one terminal
   cd backend
   python main.py
   
   # In another terminal
   cd frontend
   npm start
   ```

## MVP Plan

1. Basic user authentication
2. News fetching from NewsAPI
3. Article summarization with OpenAI
4. Simple digest display
5. Preference-based filtering

## Future Enhancements

- LangChain integration for advanced digest generation
- More sophisticated recommendation algorithms
- Mobile app version

## Application Description  
**DailyDrip**  DailyDrip tackles information overload in today's fragmented news landscape. With hundreds of headlines published across outlets like BBC, Yahoo Finance, and Reuters, it's easy to miss the stories that matter to you. DailyDrip aggregates all those headlines, filters them by each user's chosen topics, and then leverages LLM to distill the top "big events" into a clear, personalized daily digest—so you spend minutes reading, not hours searching.

## Features & Technologies

- **Onboarding & Preferences**  
  Let users pick topics (Business, Health, Tech, Sports, …)  
  _Tech_: React + Tailwind, React-Query

- **News Ingestion**  
  Fetch RSS feeds or NewsAPI, normalize into a common schema  
  _Tech_: Node.js + Express, `rss-parser` or NewsAPI SDK

- **GPT Summarization**  
  Batch articles into GPT-4 prompts for bullet-point summaries  
  _Tech_: OpenAI API, small Node.js service layer

- **Dashboard & Cards**  
  Show "module" cards by category with hover effects  
  _Tech_: Next.js (or React), shadcn/ui

- **Detail View**  
  Expand any card into a full-screen modal with the full summary  
  _Tech_: React Portals or Next.js dynamic route + Modal

- **Scheduling & Delivery**  
  Auto-run digest at user-local 7 AM; deliver via email or in-app  
  _Tech_: cron/AWS EventBridge, SendGrid or SES

- **Search & Archive**  
  Keyword + vector search on past digests  
  _Tech_: PostgreSQL, ElasticSearch/Pinecone

- **Auth & Security**  
  Signup/login, JWT sessions  
  _Tech_: NextAuth.js or Auth0

## Timeline (Apr 22 – May 5)

| Dates           | Goals                                                                                             |
|-----------------|---------------------------------------------------------------------------------------------------|
| **Apr 22 – 24** | - Initialize repo, install dependencies<br>- Scaffold Next.js app & Tailwind<br>- Build onboarding UI & `InterestSelector` component |
| **Apr 25 – 28** | - Implement user auth & preferences storage (NextAuth.js/Auth0 + PostgreSQL)<br>- Set up RSS/NewsAPI ingestion service & database schema |
| **Apr 29 – May 2** | - Create GPT summarization endpoint and test with sample data<br>- Build Dashboard with `CategoryTabs` and `EventCard` components<br>- Implement Detail-view modal |
| **May 3 – 5**   | - Configure scheduling (cron/AWS EventBridge) and email delivery (SendGrid/SES)<br>- Add Search & Archive functionality<br>- Polish UI, write README, prepare demo |




