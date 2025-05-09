from pydantic import BaseModel, Field
from datetime import datetime
from typing import Dict, Optional

class TestResultCreate(BaseModel):
    email: str
    answers: Dict[int, int]  # question_id -> answer_index
    score: float
    totalQuestions: int = Field(alias="total_questions")
    correctAnswers: int = Field(alias="correct_answers")
    timeSpent: str = Field(alias="time_spent")
    startTime: datetime = Field(alias="start_time")

    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class TestResult(BaseModel):
    id: int
    email: str
    score: float
    total_questions: int
    correct_answers: int
    time_spent: str
    start_time: str
    answers: Dict[int, int]
    created_at: str

    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class TestResultResponse(BaseModel):
    id: int
    email: str
    score: float
    totalQuestions: int = Field(alias="total_questions")
    correctAnswers: int = Field(alias="correct_answers")
    timeSpent: str = Field(alias="time_spent")
    isUnlocked: bool = Field(alias="is_unlocked")

    class Config:
        from_attributes = True
        populate_by_name = True

class TestResultStatus(BaseModel):
    isUnlocked: bool = Field(alias="is_unlocked")

    class Config:
        populate_by_name = True 