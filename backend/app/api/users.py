"""
API routes for user management
"""
from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

# To be implemented:
# - register_user
# - login_user
# - get_user
# - update_preferences 