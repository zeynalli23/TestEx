import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

interface TestResult {
  id: number;
  email: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_spent: string;
}

const Checkout: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/test-results/user/${userId}`);
        setTestResult(response.data);
        setLoading(false);
      } catch (err) {
        setError('Test sonucu bulunamadı');
        setLoading(false);
      }
    };

    fetchTestResult();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !testResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Hata!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">IQTest</span>
            </Link>
            <div className="flex items-center">
              <span className="text-gray-600">{testResult.email}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* IQ Karşılaştırma Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">IQ Raporunuz Hazır!</h1>
              <p className="text-xl text-blue-600 font-semibold">IQ Puanınızı Şimdi Öğrenin!</p>
            </div>

            <div className="flex justify-center items-end space-x-8 mb-16">
              {/* Coco Chanel */}
              <div className="text-center transform transition-transform hover:scale-105">
                <div className="w-48 h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://eduzsofsfpv.exactdn.com/wp-content/uploads/2023/08/coco-chanel-kolye-1.webp?strip=all&lossy=1&quality=92&webp=92&avif=92&resize=400%2C587&ssl=1"
                    alt="Coco Chanel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold">Coco Chanel</p>
                  <p className="text-2xl font-bold text-blue-600">IQ 113</p>
                </div>
              </div>

              {/* Kullanıcı */}
              <div className="text-center transform transition-transform hover:scale-105">
                <div className="w-56 h-72 bg-blue-500 rounded-lg overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white">
                      <svg className="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Siz</p>
                  <p className="text-3xl font-bold text-blue-600">IQ {testResult.score}</p>
                </div>
              </div>

              {/* Steve Jobs */}
              <div className="text-center transform transition-transform hover:scale-105">
                <div className="w-48 h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
                    alt="Steve Jobs"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold">Steve Jobs</p>
                  <p className="text-2xl font-bold text-blue-600">IQ 160</p>
                </div>
              </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{testResult.score}</div>
                <div className="text-gray-600">IQ Puanınız</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">%{Math.round((testResult.score / 200) * 100)}</div>
                <div className="text-gray-600">Üst Yüzdelik Dilim</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">{testResult.correct_answers}/{testResult.total_questions}</div>
                <div className="text-gray-600">Doğru Cevap Oranı</div>
              </div>
            </div>

            {/* Marka Logoları */}
            <div className="flex justify-center items-center space-x-8 opacity-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8" />
              <img src="https://w7.pngwing.com/pngs/552/302/png-transparent-yahoo-mail-logo-yahoo-games-yahoo-search-search-for-purple-text-violet-thumbnail.png" alt="Yahoo" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">IQ Raporunuz Hazır!</h1>
            <p className="text-xl text-gray-600">IQ Puanınızı Şimdi Öğrenin!</p>
          </div>

          {/* IQ Skoru Kartı */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">IQ Skorunuz</h2>
                <p className="text-gray-600">Test tarihi: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-5xl font-bold text-blue-600">{testResult.score}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Toplam Soru</p>
                <p className="text-xl font-bold">{testResult.total_questions}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Doğru Cevap</p>
                <p className="text-xl font-bold">{testResult.correct_answers}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Süre</p>
                <p className="text-xl font-bold">{testResult.time_spent}</p>
              </div>
            </div>
          </div>

          {/* Faydalar Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold mb-6">Nasıl Fayda Sağlayacaksınız</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Rekabetçi ortamlarda akranlarınızdan öne çıkın</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Yeni kariyer fırsatları yakalayın</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Hayatınızın her alanında daha iyi kararlar alın</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Özgüveninizi artırın</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold mb-6">Neler Öğreneceksiniz</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Karmaşık problemleri daha net çözme</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Yeni becerileri daha hızlı öğrenme</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Analitik düşünme stratejileri geliştirme</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-3" />
                  <span>Hafıza ve öğrenme tekniklerini geliştirme</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Ödeme Planları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Haftalık Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">7 Günlük Deneme</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ₺499.99
                <span className="text-sm text-gray-500 ml-2">/ haftalık</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  7 günlük deneme, sonrasında haftalık plana otomatik olarak yenilenir
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Kişiselleştirilmiş IQ Sertifikası
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Kapsamlı Bilişsel Analiz
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Geliştirme Araçlarına Tam Erişim
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Şimdi Başla
              </button>
            </div>

            {/* Aylık Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg">
                En Popüler
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Üyelik</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ₺1899.99
                <span className="text-sm text-gray-500 ml-2">/ aylık</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Uzun Vadeli Büyümede Maksimum Tasarruf
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Tam Bilişsel Değerlendirme Paketi
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  20+ Saat Uzman Liderliğindeki Kurslar
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Kişiselleştirilmiş Gelişim Yolu
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Premium'a Geç
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Üst Kısım */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Logo ve Açıklama */}
              <div className="col-span-1">
                <h3 className="text-2xl font-bold mb-4">IQTest</h3>
                <p className="text-gray-400 mb-4">
                  Bilimsel olarak kanıtlanmış IQ testi ile zeka seviyenizi ölçün ve potansiyelinizi keşfedin.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Hızlı Linkler */}
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Anasayfa</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">SSS</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                  </li>
                </ul>
              </div>

              {/* İletişim */}
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    info@iqtest.com
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    +90 555 123 4567
                  </li>
                </ul>
              </div>

              {/* Bülten */}
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-4">Bültenimize Katılın</h4>
                <p className="text-gray-400 mb-4">En son haberler ve güncellemeler için bültenimize abone olun.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                    Abone Ol
                  </button>
                </div>
              </div>
            </div>

            {/* Alt Kısım */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 IQTest. Tüm hakları saklıdır.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Gizlilik Politikası
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Kullanım Koşulları
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    KVKK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout; 