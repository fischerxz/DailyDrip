"""
API routes for digest management
"""
from fastapi import APIRouter

router = APIRouter(
    prefix="/digests",
    tags=["digests"],
    responses={404: {"description": "Not found"}},
)

# To be implemented:
# - get_user_digests
# - get_digest_by_id
# - generate_digest 