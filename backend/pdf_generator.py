from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from io import BytesIO
import schemas

def generate_pdf(test_result: schemas.TestResultCreate) -> bytes:
    # PDF oluştur
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    
    # Özel stil oluştur
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=1  # 1 = center
    )
    
    # İçerik oluştur
    elements = []
    
    # Başlık
    elements.append(Paragraph("Sertifika", title_style))
    elements.append(Spacer(1, 20))
    
    # Test sonuç bilgileri
    data = [
        ["Toplam Soru", str(test_result.totalQuestions)],
        ["Doğru Cevap", str(test_result.correctAnswers)],
        ["Puan", f"{test_result.score:.2f}"],
        ["Süre", f"{test_result.timeSpent} saniye"],
        ["Test Tarihi", test_result.startTime],
        ["E-posta", test_result.email]
    ]
    
    # Tablo oluştur
    table = Table(data, colWidths=[2*inch, 3*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.beige),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    elements.append(table)
    elements.append(Spacer(1, 30))
    
    # PDF'i oluştur
    doc.build(elements)
    
    # PDF verisini döndür
    buffer.seek(0)
    return buffer.getvalue() 