from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, LargeBinary, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    test_results = relationship("TestResult", back_populates="user")

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    score = Column(Float)
    total_questions = Column(Integer)
    correct_answers = Column(Integer)
    time_spent = Column(String)  # saniye cinsinden
    start_time = Column(DateTime, default=datetime.utcnow)
    answers = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    pdf_storage = relationship("PDFStorage", back_populates="test_result", uselist=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="test_results")

class PDFStorage(Base):
    __tablename__ = "pdf_storage"

    id = Column(Integer, primary_key=True, index=True)
    test_result_id = Column(Integer, ForeignKey("test_results.id"), unique=True)
    pdf_data = Column(LargeBinary)
    created_at = Column(DateTime, default=datetime.utcnow)
    test_result = relationship("TestResult", back_populates="pdf_storage") 