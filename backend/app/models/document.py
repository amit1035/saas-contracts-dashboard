from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.base import Base
import enum

class Status(enum.Enum):
    active = "Active"
    renewal_due = "Renewal Due"
    expired = "Expired"

class Risk(enum.Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    uploaded_on = Column(DateTime)
    expiry_date = Column(DateTime)
    status = Column(Enum(Status))
    risk_score = Column(Enum(Risk))
    
    user = relationship("User", back_populates="documents")
    chunks = relationship("Chunk", back_populates="document")