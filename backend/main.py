import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="DailyDrip API",
    description="API for personalized news digest application",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, change to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define security
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Include routers
from api.auth import router as auth_router
from api.news import router as news_router
from api.digest import router as digest_router
from api.user import router as user_router

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(news_router, prefix="/api/news", tags=["News"])
app.include_router(digest_router, prefix="/api/digest", tags=["Digest"])
app.include_router(user_router, prefix="/api/user", tags=["User"])

@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint."""
    return {"status": "online", "message": "DailyDrip API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 