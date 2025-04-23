### Project Name  
## DailyDrip

---

## Application Description  
**DailyDrip** pulls headlines from top outlets (BBC, Yahoo Finance, Reuters, etc.) and leverages GPT-4 to craft a concise, personalized daily news digest—so users see only the stories they care about.

---

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
  Show “module” cards by category with hover effects  
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

---

## Timeline (Apr 22 – May 5)

| Dates           | Goals                                                                                             |
|-----------------|---------------------------------------------------------------------------------------------------|
| **Apr 22 – 24** | - Initialize repo, install dependencies<br>- Scaffold Next.js app & Tailwind<br>- Build onboarding UI & `InterestSelector` component |
| **Apr 25 – 28** | - Implement user auth & preferences storage (NextAuth.js/Auth0 + PostgreSQL)<br>- Set up RSS/NewsAPI ingestion service & database schema |
| **Apr 29 – May 2** | - Create GPT summarization endpoint and test with sample data<br>- Build Dashboard with `CategoryTabs` and `EventCard` components<br>- Implement Detail-view modal |
| **May 3 – 5**   | - Configure scheduling (cron/AWS EventBridge) and email delivery (SendGrid/SES)<br>- Add Search & Archive functionality<br>- Polish UI, write README, prepare demo |




