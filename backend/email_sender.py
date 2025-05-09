import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from config import settings
import os

def send_certificate_email(to_email: str, pdf_data: bytes):
    try:
        # E-posta mesajı oluştur
        msg = MIMEMultipart()
        msg['From'] = settings.SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = "Test Sertifikanız"
        
        # E-posta gövdesi
        body = """
        Merhaba,
        
        Test sonucunuz için sertifikanız ektedir.
        
        İyi günler dileriz.
        """
        msg.attach(MIMEText(body, 'plain'))
        
        # PDF ekle
        pdf_attachment = MIMEApplication(pdf_data, _subtype='pdf')
        pdf_attachment.add_header('Content-Disposition', 'attachment', filename='sertifika.pdf')
        msg.attach(pdf_attachment)
        
        # SMTP sunucusuna bağlan ve e-postayı gönder
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)
            
    except Exception as e:
        print(f"E-posta gönderme hatası: {str(e)}") 