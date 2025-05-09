import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ResultProps {
  id: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: string;
  email: string;
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as ResultProps;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Test sonucunun kilitli olup olmadığını kontrol et
    const checkUnlockStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/test-results/${result.id}`);
        setIsUnlocked(response.data.is_unlocked);
      } catch (err) {
        console.error('Test sonucu kontrol edilemedi:', err);
      }
    };

    if (result?.id) {
      checkUnlockStatus();
    }
  }, [result?.id]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sonuç Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Test sonucu bulunamadı. Lütfen testi tekrar çözün.</p>
          <button
            onClick={() => navigate('/start')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Testi Tekrar Çöz
          </button>
        </div>
      </div>
    );
  }

  const getIQScore = (score: number): number => {
    // Basit bir IQ hesaplama formülü (örnek amaçlı)
    return Math.round(100 + (score - 50) * 2);
  };

  const getPerformanceText = (iqScore: number): string => {
    if (iqScore >= 130) return "Üstün Zekalı";
    if (iqScore >= 120) return "Çok Yüksek";
    if (iqScore >= 110) return "Yüksek";
    if (iqScore >= 90) return "Normal";
    if (iqScore >= 80) return "Normal-Altı";
    return "Düşük";
  };

  const handleUnlock = async () => {
    setIsLoading(true);
    setError('');

    try {
      await axios.post(`http://localhost:8000/api/test-results/${result.id}/unlock`);
      setIsUnlocked(true);
      navigate(`/checkout/user/${result.id}`);
    } catch (err) {
      setError('Sonuçlar açılırken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/test-results/${result.id}/download-pdf`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `IQ-Test-Sonucu-${result.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('PDF indirilemedi:', err);
      alert('PDF indirilemedi. Lütfen tekrar deneyin.');
    }
  };

  const iqScore = getIQScore(result.score);
  const performanceText = getPerformanceText(iqScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Sonucunuz</h1>
          <p className="text-gray-600">Test tamamlandı! İşte sonuçlarınız:</p>
        </div>

        <div className={`relative ${!isUnlocked && 'filter blur-md pointer-events-none'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">IQ Puanınız</h2>
              <div className="text-4xl font-bold text-indigo-600">{iqScore}</div>
              <div className="text-gray-600 mt-2">{performanceText}</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Detayları</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Toplam Soru:</span>
                  <span className="font-semibold">{result.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doğru Cevap:</span>
                  <span className="font-semibold">{result.correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Başarı Oranı:</span>
                  <span className="font-semibold">{result.score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harcanan Süre:</span>
                  <span className="font-semibold">{result.timeSpent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Sonuçları Görmek İçin Kilidi Açın
              </h3>
              <p className="text-gray-600 mb-6">
                Detaylı test sonuçlarınızı görmek ve PDF olarak indirmek için ödeme yapmanız gerekmektedir.
              </p>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                onClick={handleUnlock}
                disabled={isLoading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? 'İşleniyor...' : 'Kilidi Aç (29.90₺)'}
              </button>
            </div>
          </div>
        )}

        {isUnlocked && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/start')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Testi Tekrar Çöz
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              PDF İndir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result; 