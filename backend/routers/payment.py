from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import TestResult, Certificate
from pydantic import BaseModel

router = APIRouter()

class CertificateRequest(BaseModel):
    test_id: int

@router.post("/generate-certificate")
async def generate_certificate(request: CertificateRequest, db: Session = Depends(get_db)):
    """Ücretsiz sertifika oluştur"""
    try:
        # Test sonucunun varlığını kontrol et
        test_result = db.query(TestResult).filter(TestResult.id == request.test_id).first()
        if not test_result:
            raise HTTPException(status_code=404, detail="Test sonucu bulunamadı")

        # Sertifika zaten var mı kontrol et
        existing_certificate = db.query(Certificate).filter(
            Certificate.test_result_id == request.test_id
        ).first()

        if existing_certificate:
            return {
                "success": True,
                "certificate_id": existing_certificate.id,
                "download_url": f"/api/certificate/download/{request.test_id}"
            }

        # Yeni sertifika oluştur
        certificate = Certificate(
            test_result_id=request.test_id,
            download_url=f"/api/certificate/download/{request.test_id}"
        )
        
        db.add(certificate)
        db.commit()
        db.refresh(certificate)

        return {
            "success": True,
            "certificate_id": certificate.id,
            "download_url": certificate.download_url
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 