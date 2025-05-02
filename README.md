# DailyDrip

A personalized news digest application that fetches, summarizes, and delivers news based on user preferences.

## Project Structure

```
DailyDrip/
├── frontend/               # React/HTML frontend
│   ├── public/             # Static assets
│   └── src/                # Frontend source code
├── backend/                # FastAPI backend
│   ├── api/                # API routes
│   ├── models/             # Database models
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── database/               # Database setup and migrations
├── scripts/                # Utility scripts
└── .env                    # Environment variables
```

## Features

- User authentication and preference management
- News fetching from various sources via NewsAPI
- Article summarization using OpenAI GPT
- Personalized news digest creation
- Vector-based article search and recommendations

## Technology Stack

- **Frontend**: React/HTML+JS
- **Backend**: FastAPI
- **Database**: MongoDB
- **Vector Search**: FAISS
- **AI**: OpenAI GPT for summarization

## Getting Started

1. Clone this repository
2. Set up environment variables in `.env`
3. Install dependencies for frontend and backend
4. Run the development servers

## Environment Variables

```
NEWSAPI_KEY=your_newsapi_key
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_uri
```

## Development

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm start
```

## License

MIT

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




