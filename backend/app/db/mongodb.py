"""
MongoDB connection handler for DailyDrip
"""
import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.database import Database
from pymongo import IndexModel, ASCENDING, DESCENDING
from dotenv import load_dotenv
from pathlib import Path

# Load .env from parent directory
env_path = Path(__file__).resolve().parent.parent.parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# MongoDB connection settings
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "dailydrip")

# Global variables for database connection
client: AsyncIOMotorClient = None
db: Database = None

async def connect_to_mongo():
    """Create database connection."""
    global client, db
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    await ensure_indexes()

async def close_mongo_connection():
    """Close database connection."""
    global client
    if client:
        client.close()

async def ensure_indexes():
    """Create all required indexes."""
    # Users collection indexes
    await db.users.create_indexes([
        IndexModel([("email", ASCENDING)], unique=True),
        IndexModel([("preferences", ASCENDING)])
    ])

    # Articles collection indexes
    await db.articles.create_indexes([
        IndexModel([("url", ASCENDING)], unique=True),
        IndexModel([("publishedAt", DESCENDING)]),
        IndexModel([("source", ASCENDING)]),
        IndexModel([("topics", ASCENDING)])
    ])

    # Digests collection indexes
    await db.digests.create_indexes([
        IndexModel([
            ("userId", ASCENDING),
            ("date", DESCENDING)
        ], unique=True),
        IndexModel([("date", ASCENDING)])
    ])

# To be implemented: database connection setup functions 