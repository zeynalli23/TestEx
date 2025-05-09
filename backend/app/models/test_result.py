from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    email = Column(String, index=True)
    answers = Column(JSON)
    score = Column(Float)
    total_questions = Column(Integer)
    correct_answers = Column(Integer)
    time_spent = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    is_unlocked = Column(Boolean, default=False)
    pdf_path = Column(String, nullable=True)
    status = Column(String, default="processing")  # "processing", "completed", "error"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="test_results") 