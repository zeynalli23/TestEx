# IQ Test Platformu

Bu platform, ücretsiz IQ testi ve sertifika satın alma özelliklerini sunan bir web uygulamasıdır.

## Özellikler

- 🧪 Ücretsiz IQ Testi (20 soru, 20 dakika)
- 💸 Sertifika Satın Alma
- 📊 Sonuç Görüntüleme
- 📧 E-posta ile Sonuç Paylaşımı

## Teknoloji Stack

### Backend
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy
- Stripe (Ödeme sistemi)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

## Kurulum

### Backend Kurulumu

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

## Veritabanı Şeması

```sql
-- test_results tablosu
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    completion_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answers JSONB
);

-- certificates tablosu
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    test_result_id INTEGER REFERENCES test_results(id),
    payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    download_url VARCHAR(255)
);

CREATE DATABASE iq_test_db;

CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE iq_test_db TO postgres;
``` 