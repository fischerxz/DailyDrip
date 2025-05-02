import os
import motor.motor_asyncio
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB URI from environment variable
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = "dailydrip"

# Create async client for FastAPI
async_client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
async_db = async_client[DATABASE_NAME]

# Create sync client for scripts
sync_client = MongoClient(MONGODB_URI)
sync_db = sync_client[DATABASE_NAME]

# Define collections
users_collection = async_db["users"]
articles_collection = async_db["articles"]
digests_collection = async_db["digests"]

# Sync collections for scripts
sync_users = sync_db["users"]
sync_articles = sync_db["articles"]
sync_digests = sync_db["digests"]

# Database initialization
async def init_db():
    # Create indexes
    await users_collection.create_index("email", unique=True)
    await articles_collection.create_index("url", unique=True)
    await articles_collection.create_index("published_at")
    await digests_collection.create_index([("user_id", 1), ("created_at", -1)])
    
    print("Database initialized successfully") 