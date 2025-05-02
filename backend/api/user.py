from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from typing import List

from database.connection import users_collection
from models.user import User, UserUpdate
from api.auth import get_user
from utils.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """Get the current user's profile."""
    return current_user

@router.put("/me", response_model=User)
async def update_user(user_update: UserUpdate, current_user: User = Depends(get_current_user)):
    """Update the current user's profile."""
    stored_user = await get_user(current_user.email)
    if not stored_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.dict(exclude_unset=True)
    updated_user = stored_user.copy(update=update_data)
    updated_user.updated_at = datetime.utcnow()
    
    await users_collection.update_one(
        {"email": current_user.email}, 
        {"$set": updated_user.dict(exclude={"id"}, by_alias=True)}
    )
    
    return await get_user(current_user.email)

@router.get("/preferences", response_model=dict)
async def get_preferences(current_user: User = Depends(get_current_user)):
    """Get the current user's news preferences."""
    return current_user.preferences.dict()

@router.put("/preferences", response_model=dict)
async def update_preferences(preferences: dict, current_user: User = Depends(get_current_user)):
    """Update the current user's news preferences."""
    await users_collection.update_one(
        {"email": current_user.email},
        {
            "$set": {
                "preferences": preferences,
                "updated_at": datetime.utcnow()
            }
        }
    )
    updated_user = await get_user(current_user.email)
    return updated_user.preferences.dict() 