"""
DailyDrip Backend Server
------------------------
Main FastAPI application entry point
"""
import os
from datetime import datetime
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db.mongodb import connect_to_mongo, close_mongo_connection

# Load environment variables
load_dotenv()

# Lifespan context manager for database connections
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

# Create FastAPI application
app = FastAPI(
    title="DailyDrip API",
    description="API for personalized news digest system",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health-check endpoint
@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.utcnow()}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to DailyDrip API",
        "version": "0.1.0",
        "status": "online"
    }

# Run the application
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True) 