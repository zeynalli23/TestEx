from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
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
    created_at = Column(DateTime)

# Models modülü 