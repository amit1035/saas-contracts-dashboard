from fastapi import APIRouter
from app.api import auth, documents, query

api_router = APIRouter()

app.include_router(auth.router, prefix=settings.API_V1_STR + "/auth", tags=["auth"])
app.include_router(documents.router, prefix=settings.API_V1_STR + "/documents", tags=["documents"])
app.include_router(query.router, prefix=settings.API_V1_STR + "/query", tags=["query"])