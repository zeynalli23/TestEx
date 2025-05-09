from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Dict
from ..database import get_db
from ..models import TestResult
from ..schemas import TestResultCreate, TestResultResponse, TestResultStatus
from ..utils.pdf_generator import generate_pdf
import os
from fastapi.responses import FileResponse
from datetime import datetime
import logging

# Logging ayarları
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/test-results", response_model=TestResultResponse)
def create_test_result(
    test_result: TestResultCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Test sonucunu kaydet ve PDF oluştur"""
    try:
        logger.debug(f"Gelen test sonucu verisi: {test_result.dict()}")
        
        # Test sonucunu kaydet
        db_test_result = TestResult(
            email=test_result.email,
            answers=test_result.answers,
            score=test_result.score,
            total_questions=test_result.totalQuestions,
            correct_answers=test_result.correctAnswers,
            time_spent=test_result.timeSpent,
            start_time=test_result.startTime,
            end_time=test_result.endTime,
            is_unlocked=False,
            created_at=datetime.utcnow()
        )
        
        logger.debug(f"Oluşturulan veritabanı objesi: {vars(db_test_result)}")
        
        db.add(db_test_result)
        db.commit()
        db.refresh(db_test_result)
        
        logger.debug(f"Test sonucu başarıyla kaydedildi. ID: {db_test_result.id}")
        
        # PDF'i arka planda oluştur
        background_tasks.add_task(
            generate_pdf,
            db_test_result.id,
            test_result.dict(by_alias=True),
            db
        )
        
        return db_test_result
    except Exception as e:
        logger.error(f"Test sonucu kaydedilirken hata oluştu: {str(e)}", exc_info=True)
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Test sonucu kaydedilirken bir hata oluştu: {str(e)}"
        )

@router.get("/test-results/{test_id}", response_model=TestResultResponse)
def get_test_result(test_id: int, db: Session = Depends(get_db)):
    """Test sonucunu getir"""
    try:
        test_result = db.query(TestResult).filter(TestResult.id == test_id).first()
        if not test_result:
            raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")
        logger.debug(f"Test sonucu bulundu. ID: {test_id}")
        return test_result
    except Exception as e:
        logger.error(f"Test sonucu getirilirken hata oluştu: {str(e)}", exc_info=True)
        raise

@router.post("/test-results/{test_id}/unlock", response_model=TestResultResponse)
def unlock_test_result(test_id: int, db: Session = Depends(get_db)):
    """Test sonucunun kilidini aç (ödeme sonrası çağrılacak)"""
    try:
        test_result = db.query(TestResult).filter(TestResult.id == test_id).first()
        if not test_result:
            raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")
        
        test_result.is_unlocked = True
        db.commit()
        db.refresh(test_result)
        logger.debug(f"Test sonucunun kilidi açıldı. ID: {test_id}")
        return test_result
    except Exception as e:
        logger.error(f"Test sonucu kilidi açılırken hata oluştu: {str(e)}", exc_info=True)
        raise

@router.get("/test-results/{test_id}/download-pdf")
def download_pdf(test_id: int, db: Session = Depends(get_db)):
    """PDF'i indir (sadece kilit açıldıysa)"""
    try:
        test_result = db.query(TestResult).filter(TestResult.id == test_id).first()
        if not test_result:
            raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")
        
        if not test_result.is_unlocked:
            raise HTTPException(status_code=403, detail="Test sonucu henüz erişime açık değil")
        
        if not test_result.pdf_path or not os.path.exists(test_result.pdf_path):
            raise HTTPException(status_code=404, detail="PDF dosyası bulunamadı")
        
        logger.debug(f"PDF indirme isteği. ID: {test_id}, Path: {test_result.pdf_path}")
        return FileResponse(
            test_result.pdf_path,
            filename=f"test_result_{test_id}.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        logger.error(f"PDF indirilirken hata oluştu: {str(e)}", exc_info=True)
        raise 