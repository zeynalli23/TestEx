from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
import json
from database import get_db
from models import TestResult
from pydantic import BaseModel, EmailStr
import os

router = APIRouter()

class TestAnswer(BaseModel):
    email: EmailStr
    answers: Dict[int, int]  # soru ID'si: seçilen cevap indeksi

# Soruları yükle
def load_questions():
    with open("questions.json", "r", encoding="utf-8") as f:
        return json.load(f)["questions"]

@router.get("/questions")
async def get_questions():
    """Test sorularını döndür"""
    try:
        questions = load_questions()
        # Doğru cevapları kaldır
        for q in questions:
            q.pop("correct_answer", None)
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Sorular yüklenirken hata oluştu")

@router.post("/submit")
async def submit_test(answers: TestAnswer, db: Session = Depends(get_db)):
    """Test cevaplarını değerlendir ve sonucu kaydet"""
    try:
        questions = load_questions()
        correct_count = 0
        total_questions = len(questions)

        # Cevapları kontrol et
        for q in questions:
            if q["id"] in answers.answers and answers.answers[q["id"]] == q["correct_answer"]:
                correct_count += 1

        # Basit IQ hesaplama formülü (örnek)
        base_iq = 100
        iq_score = base_iq + (correct_count / total_questions) * 50

        # Sonucu veritabanına kaydet
        test_result = TestResult(
            email=answers.email,
            score=int(iq_score),
            answers=answers.answers
        )
        db.add(test_result)
        db.commit()
        db.refresh(test_result)

        return {
            "score": int(iq_score),
            "correct_answers": correct_count,
            "total_questions": total_questions,
            "test_id": test_result.id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Test değerlendirilirken hata oluştu") 