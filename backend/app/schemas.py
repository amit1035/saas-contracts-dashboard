
from typing import Optional, List
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    filename: str

class DocumentCreate(DocumentBase):
    user_id: int

class Document(DocumentBase):
    id: int
    user_id: int
    expiry_date: Optional[str] = None
    status: str = "Active"
    risk_score: str = "Low"

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None

class QueryBase(BaseModel):
    question: str

class QueryCreate(QueryBase):
    pass

class Query(QueryBase):
    id: int
    user_id: int
    answer: str

    class Config:
        from_attributes = True

class ChunkCreate(BaseModel):
    doc_id: int
    user_id: int
    text_chunk: str
    embedding: str
    chunk_metadata: Optional[dict] = None