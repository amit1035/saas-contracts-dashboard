from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base

class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, index=True)
    doc_id = Column(Integer, ForeignKey("documents.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    text_chunk = Column(String)
    embedding = Column(String)  # We'll store as string and convert to vector when needed
    chunk_metadata = Column(JSON)  # Renamed from metadata to chunk_metadata
    
    document = relationship("Document", back_populates="chunks")
    user = relationship("User", back_populates="chunks")