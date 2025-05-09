from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models
import schemas
from typing import List
import pdf_generator
import email_sender
import os
from datetime import datetime
import base64
from config import settings
from fastapi.responses import JSONResponse, Response
import logging
from app.models.test_result import TestResult

# Loglama ayarları
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/test-results/", response_model=schemas.TestResult)
async def create_test_result(test_result: schemas.TestResultCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    try:
        logger.debug(f"Gelen test verisi: {test_result.dict()}")
        
        # Eksik alanları varsayılan değerlerle doldur
        if test_result.timeSpent is None:
            test_result.timeSpent = "0:00"
        if test_result.startTime is None:
            test_result.startTime = datetime.utcnow().isoformat()

        # Test sonucunu veritabanına kaydet
        db_test_result = models.TestResult(
            email=test_result.email,
            score=test_result.score,
            total_questions=test_result.totalQuestions,
            correct_answers=test_result.correctAnswers,
            time_spent=test_result.timeSpent,
            start_time=test_result.startTime,
            answers=test_result.answers
        )
        
        db.add(db_test_result)
        db.commit()
        db.refresh(db_test_result)

        # PDF oluştur ve kaydet
        pdf_data = pdf_generator.generate_pdf(test_result)
        
        # PDF'i veritabanına kaydet
        pdf_storage = models.PDFStorage(
            test_result_id=db_test_result.id,
            pdf_data=pdf_data
        )
        db.add(pdf_storage)
        db.commit()

        # Response'u oluştur
        response_data = {
            "id": db_test_result.id,
            "email": db_test_result.email,
            "score": db_test_result.score,
            "total_questions": db_test_result.total_questions,
            "correct_answers": db_test_result.correct_answers,
            "time_spent": db_test_result.time_spent,
            "start_time": db_test_result.start_time.isoformat(),
            "answers": db_test_result.answers,
            "created_at": db_test_result.created_at.isoformat()
        }

        return response_data
    except Exception as e:
        logger.error(f"Hata oluştu: {str(e)}")
        db.rollback()
        return JSONResponse(
            status_code=422,
            content={"detail": str(e)}
        )

@app.get("/api/test-results/{test_result_id}/pdf")
def get_test_result_pdf(test_result_id: int, db: Session = Depends(get_db)):
    # Test sonucunu ve PDF'i veritabanından al
    pdf_storage = db.query(models.PDFStorage).filter(
        models.PDFStorage.test_result_id == test_result_id
    ).first()
    
    if not pdf_storage:
        raise HTTPException(status_code=404, detail="PDF bulunamadı")
    
    # PDF'i doğrudan indirme olarak döndür
    return Response(
        content=pdf_storage.pdf_data,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=test_sonucu_{test_result_id}.pdf"
        }
    )

@app.get("/api/test-results/", response_model=List[schemas.TestResult])
def get_test_results(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    test_results = db.query(models.TestResult).offset(skip).limit(limit).all()
    return test_results

@app.get("/api/test-results/user/{test_result_id}")
def get_test_result_by_id(test_result_id: int, db: Session = Depends(get_db)):
    test_result = db.query(models.TestResult).filter(
        models.TestResult.id == test_result_id
    ).first()
    
    if not test_result:
        raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")
    
    return {
        "id": test_result.id,
        "email": test_result.email,
        "score": test_result.score,
        "total_questions": test_result.total_questions,
        "correct_answers": test_result.correct_answers,
        "time_spent": test_result.time_spent,
        "start_time": test_result.start_time.isoformat(),
        "created_at": test_result.created_at.isoformat()
    }

@app.get("/api/test-results/{test_id}")
def get_test_result_status(test_id: int, db: Session = Depends(get_db)):
    test_result = db.query(models.TestResult).filter(
        models.TestResult.id == test_id
    ).first()
    
    if not test_result:
        raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")
    
    return {
        "id": test_result.id,
        "email": test_result.email,
        "score": test_result.score,
        "total_questions": test_result.total_questions,
        "correct_answers": test_result.correct_answers,
        "time_spent": test_result.time_spent,
        "is_unlocked": False  # Şimdilik hep False dönüyoruz, ileride ödeme sistemi eklenince değişecek
    }

@app.post("/api/test-results/{test_id}/unlock")
def unlock_test_result(test_id: int, db: Session = Depends(get_db)):
    test_result = db.query(models.TestResult).filter(
        models.TestResult.id == test_id
    ).first()
    
    if not test_result:
        raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")
    
    # Burada normalde ödeme işlemi yapılacak
    # Şimdilik direkt başarılı dönüyoruz
    return {
        "success": True,
        "message": "Test sonucu başarıyla açıldı"
    }

@app.get("/")
async def root():
    return {"message": "IQ Test API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 