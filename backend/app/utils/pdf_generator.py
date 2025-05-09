from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from sqlalchemy.orm import Session
from ..models import TestResult
import os
from datetime import datetime

def ensure_pdf_directory():
    """PDF dosyaları için dizin oluştur"""
    pdf_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "pdfs")
    if not os.path.exists(pdf_dir):
        os.makedirs(pdf_dir)
    return pdf_dir

def generate_pdf(test_id: int, test_data: dict, db: Session):
    """Test sonucu PDF'ini oluştur"""
    try:
        # PDF dizinini oluştur
        pdf_dir = ensure_pdf_directory()
        
        # PDF dosya yolu
        pdf_filename = f"test_result_{test_id}.pdf"
        pdf_path = os.path.join(pdf_dir, pdf_filename)
        
        # PDF dokümanı oluştur
        doc = SimpleDocTemplate(pdf_path, pagesize=letter)
        styles = getSampleStyleSheet()
        
        # Özel başlık stili
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30
        )
        
        # İçerik elemanları
        elements = []
        
        # Başlık
        elements.append(Paragraph("Test Sonuç Raporu", title_style))
        elements.append(Spacer(1, 12))
        
        # Temel bilgiler
        info_data = [
            ["E-posta:", test_data["email"]],
            ["Puan:", f"{test_data['score']}"],
            ["Toplam Soru:", f"{test_data['total_questions']}"],
            ["Doğru Cevap:", f"{test_data['correct_answers']}"],
            ["Harcanan Süre:", f"{test_data['time_spent']}"],
            ["Başlangıç Zamanı:", test_data["start_time"].strftime("%Y-%m-%d %H:%M:%S")],
            ["Bitiş Zamanı:", test_data["end_time"].strftime("%Y-%m-%d %H:%M:%S")]
        ]
        
        # Tablo stili
        table_style = TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 12),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ])
        
        # Tablo oluştur
        table = Table(info_data)
        table.setStyle(table_style)
        elements.append(table)
        
        # Cevaplar bölümü
        elements.append(Spacer(1, 20))
        elements.append(Paragraph("Cevaplar", styles["Heading2"]))
        elements.append(Spacer(1, 12))
        
        # Cevapları tablo olarak göster
        answers_data = [[f"Soru {q}", f"Cevap: {a}"] for q, a in test_data["answers"].items()]
        answers_table = Table(answers_data)
        answers_table.setStyle(table_style)
        elements.append(answers_table)
        
        # PDF oluştur
        doc.build(elements)
        
        # Veritabanında PDF yolunu güncelle
        test_result = db.query(TestResult).filter(TestResult.id == test_id).first()
        if test_result:
            test_result.pdf_path = pdf_path
            db.commit()
            
    except Exception as e:
        print(f"PDF oluşturulurken hata oluştu: {str(e)}")
        raise 