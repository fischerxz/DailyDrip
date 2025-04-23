## Project Name  
**DailyDrip**

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

## Timeline & Responsibilities (Apr 22 – May 5)

| Dates             | Goals                                                      | Who                 |
|-------------------|------------------------------------------------------------|---------------------|
| **Apr 22 – Apr 28** | – Repo & UI scaffold<br>– Onboarding + preferences flow<br>– Auth & DB setup<br>– Figma mockups for dashboard | Engineer & Designer |
| **Apr 29 – May 5**  | – News ingestion + DB schema<br>– GPT summarization API<br>– Dashboard & detail-view UI<br>– Scheduling & delivery<br>– Final polish & README write-up | Engineer & Designer |

---

### Team of 2
- **Software Engineer**: backend, API integration, scheduling  
- **Designer**: Figma mocks, UI components, styling & accessibility  

**Meetings:** one 30 min sync/week (Zoom) + async updates via Slack.  
