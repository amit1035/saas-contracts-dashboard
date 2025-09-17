from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, documents, query

app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json")

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.API_V1_STR + "/auth", tags=["auth"])
app.include_router(documents.router, prefix=settings.API_V1_STR + "/documents", tags=["documents"])
app.include_router(query.router, prefix=settings.API_V1_STR + "/query", tags=["query"])

@app.get("/")
async def root():
    return {"message": "Welcome to SaaS Contracts Dashboard API"}