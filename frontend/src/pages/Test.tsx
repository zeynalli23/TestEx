import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';
import axios from 'axios';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [questions] = useState<Question[]>(questionsData.questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 dakika
  const [startTime] = useState<Date>(new Date());
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iyzipay.com/1.0.0/iyzipay.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAnswer = (answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateTimeSpent = (): string => {
    const endTime = new Date();
    const timeSpentMs = endTime.getTime() - startTime.getTime();
    const minutes = Math.floor(timeSpentMs / (1000 * 60));
    const seconds = Math.floor((timeSpentMs % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFinishTest = () => {
    setShowEmailModal(true);
  };

  const handlePayment = () => {
    // İyzico'nun yüklenip yüklenmediğini kontrol et
    if (typeof window.Iyzipay === 'undefined') {
      alert('Ödeme sistemi yükleniyor, lütfen birkaç saniye bekleyin ve tekrar deneyin.');
      return;
    }

    setIsSubmitting(true);

    try {
      // İyzico ödeme modalını aç
      // @ts-ignore
      window.Iyzipay.openPaymentModal({
        locale: 'tr',
        conversationId: '123456789',
        price: '1.99',
        paidPrice: '1.99',
        currency: 'USD',
        basketId: 'B67832',
        paymentGroup: 'PRODUCT',
        callbackUrl: 'http://localhost:3000/payment-callback',
        enabledInstallments: [1],
        buyer: {
          id: 'BY789',
          name: 'John',
          surname: 'Doe',
          gsmNumber: '+905350000000',
          email: email,
          identityNumber: '74300864791',
          lastLoginDate: '2015-10-05 12:43:35',
          registrationDate: '2013-04-21 15:12:09',
          registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
          ip: '85.34.78.112',
          city: 'Istanbul',
          country: 'Turkey',
          zipCode: '34732'
        },
        shippingAddress: {
          contactName: 'Jane Doe',
          city: 'Istanbul',
          country: 'Turkey',
          address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
          zipCode: '34742'
        },
        billingAddress: {
          contactName: 'Jane Doe',
          city: 'Istanbul',
          country: 'Turkey',
          address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
          zipCode: '34742'
        },
        basketItems: [
          {
            id: 'BI101',
            name: 'Test Sonuçları',
            category1: 'Test',
            itemType: 'PHYSICAL',
            price: '1.99'
          }
        ],
        callback: function(result) {
          setIsSubmitting(false);
          if (result.status === 'success') {
            setPaymentCompleted(true);
            setShowPaymentModal(false);
            navigate('/results', { 
              state: { 
                answers,
                timeSpent: calculateTimeSpent(),
                email
              }
            });
          } else {
            alert('Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
          }
        }
      });
    } catch (error) {
      setIsSubmitting(false);
      alert('Ödeme işlemi başlatılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleSubmitTest = async () => {
    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Üst Bilgi Çubuğu */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold text-gray-700">
            Soru {currentQuestion + 1}/{questions.length}
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Kalan Süre: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Soru */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>

          {/* Cevap Seçenekleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`p-4 text-left rounded-lg transition-all ${
                  answers[questions[currentQuestion].id] === index
                    ? 'bg-indigo-100 border-2 border-indigo-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigasyon Butonları */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Önceki
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleFinishTest}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Testi Bitir
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sonraki
            </button>
          )}
        </div>
      </div>

      {/* E-posta Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Test Tamamlandı!
            </h2>
            <p className="text-gray-600 mb-6">
              Sonuçlarınızı görmek için lütfen e-posta adresinizi girin.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                İptal
              </button>
              <button
                onClick={handleSubmitTest}
                disabled={isSubmitting}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Ödemeye Geç'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ödeme Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ödeme İşlemi
            </h2>
            <p className="text-gray-600 mb-6">
              Test sonuçlarınızı görmek için lütfen ödeme işlemini tamamlayın.
            </p>
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-700">
                Ödeme Tutarı: 1.99 USD
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                İptal
              </button>
              <button
                onClick={handlePayment}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Ödemeyi Tamamla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test; 