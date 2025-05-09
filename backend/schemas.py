from pydantic import BaseModel, Field, ConfigDict, validator
from typing import Optional, Dict, Any, List
from datetime import datetime
import re

class TestResultBase(BaseModel):
    email: str
    answers: Dict[str, Any]
    score: float
    totalQuestions: int = Field(alias="total_questions")
    correctAnswers: int = Field(alias="correct_answers")
    timeSpent: str = Field(alias="time_spent")
    startTime: str = Field(alias="start_time")
    endTime: Optional[str] = None
    user_id: Optional[int] = None
    

    @validator('timeSpent')
    def convert_time_spent_to_seconds(cls, v):
        # "MM:SS" formatındaki string'i saniyeye çevir
        match = re.match(r'(\d+):(\d+)', v)
        if match:
            minutes, seconds = map(int, match.groups())
            return minutes * 60 + seconds
        return 0

    @validator('startTime')
    def parse_start_time(cls, v):
        return datetime.fromisoformat(v.replace('Z', '+00:00'))

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        json_encoders={
            datetime: lambda v: v.isoformat()
        }
    )

class TestResultCreate(TestResultBase):
    pass

class TestResult(TestResultBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        json_encoders={
            datetime: lambda v: v.isoformat()
        }
    )

class PDFResponse(BaseModel):
    pdf_data: str 