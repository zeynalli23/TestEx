from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import TestResult, Certificate
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from fastapi.responses import FileResponse
import os
from datetime import datetime

router = APIRouter()

def generate_certificate(test_result: TestResult, certificate_id: int) -> str:
    """PDF sertifika oluştur"""
    filename = f"certificates/certificate_{certificate_id}.pdf"
    os.makedirs("certificates", exist_ok=True)
    
    # PDF oluştur
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Başlık
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(width/2, height-2*inch, "IQ Test Sertifikası")

    # İçerik
    c.setFont("Helvetica", 16)
    c.drawCentredString(width/2, height-3*inch, f"Bu belge {test_result.email} için düzenlenmiştir")
    c.drawCentredString(width/2, height-4*inch, f"IQ Skoru: {test_result.score}")
    c.drawCentredString(width/2, height-5*inch, f"Test Tarihi: {test_result.completion_time.strftime('%d/%m/%Y')}")
    
    # Sertifika ID
    c.setFont("Helvetica", 12)
    c.drawString(inch, inch, f"Sertifika ID: {certificate_id}")
    
    c.save()
    return filename

@router.get("/download/{test_id}")
async def download_certificate(test_id: int, db: Session = Depends(get_db)):
    """Sertifikayı indir"""
    try:
        # Test ve sertifika bilgilerini kontrol et
        certificate = db.query(Certificate).filter(
            Certificate.test_result_id == test_id
        ).first()
        
        if not certificate:
            raise HTTPException(status_code=404, detail="Sertifika bulunamadı")

        test_result = db.query(TestResult).filter(
            TestResult.id == test_id
        ).first()

        if not test_result:
            raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")

        # Sertifika PDF'ini oluştur
        pdf_path = generate_certificate(test_result, certificate.id)
        
        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename=f"iq_certificate_{test_id}.pdf"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 