from database import Base, engine
from models import TestResult
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def reset_database():
    logger.info("Veritabanı tabloları siliniyor...")
    Base.metadata.drop_all(bind=engine)
    logger.info("Veritabanı tabloları yeniden oluşturuluyor...")
    Base.metadata.create_all(bind=engine)
    logger.info("Veritabanı başarıyla sıfırlandı!")

if __name__ == "__main__":
    reset_database() 