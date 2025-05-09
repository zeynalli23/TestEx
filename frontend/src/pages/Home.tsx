import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBrain, FaChartLine, FaGlobe, FaUsers, FaLightbulb, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import { MdSpeed, MdSecurity } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">IQTest</span>
            </div>
            <div>
              <Link to="/login" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              3 Dakikada Gerçek IQ'nuzu Öğrenin
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Bilimsel olarak kanıtlanmış test ile zeka seviyenizi ölçün ve sertifikanızı alın
            </p>
            <Link 
              to="/start" 
              className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Teste Başla
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaBrain className="w-12 h-12" />, title: "Testi Tamamla", desc: "3 dakikalık bilimsel testi tamamlayın" },
              { icon: <IoMdAnalytics className="w-12 h-12" />, title: "Sonuçları Gör", desc: "Detaylı analiz ve IQ puanınızı öğrenin" },
              { icon: <MdSecurity className="w-12 h-12" />, title: "Sertifika Al", desc: "Resmi IQ sertifikanızı indirin" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-indigo-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Geliştirebileceğiniz 5 Temel Bilişsel Yetenek</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <MdSpeed className="w-12 h-12" />, title: "Hızlı Düşünme", desc: "Problem çözme hızınızı artırın" },
              { icon: <FaChartLine className="w-12 h-12" />, title: "Analitik Düşünme", desc: "Karmaşık problemleri çözme yeteneğinizi geliştirin" },
              { icon: <FaLightbulb className="w-12 h-12" />, title: "Yaratıcılık", desc: "Yeni fikirler üretme kapasitenizi artırın" },
              { icon: <FaGlobe className="w-12 h-12" />, title: "Uzamsal Zeka", desc: "Görsel-uzamsal yeteneklerinizi geliştirin" },
              { icon: <FaUsers className="w-12 h-12" />, title: "Sosyal Zeka", desc: "İnsan ilişkilerinizi güçlendirin" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-indigo-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">İletişim</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Adınız"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mesajınız"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Ödeme Planları Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Ödeme Planları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Haftalık Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-center mb-4">Haftalık Ödeme Planı</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-blue-600">499.99 TL</span>
                <span className="text-gray-500">/ haftalık</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  7 günlük deneme, sonrasında haftalık plana otomatik olarak yenilenir
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Kişiselleştirilmiş IQ Sertifikası
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Kapsamlı Bilişsel Analiz
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Geliştirme Araçlarına Tam Erişim
                </li>
              </ul>
              <Link to="/start">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Hemen Başla
                </button>
              </Link>
            </div>

            {/* Aylık Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 border-2 border-blue-500">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-tr-lg rounded-bl-lg">
                En Popüler
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Aylık Ödeme Planı</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-blue-600">1899.99 TL</span>
                <span className="text-gray-500">/ aylık</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Uzun Vadeli Büyümede Maksimum Tasarruf
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Tam Bilişsel Değerlendirme Paketi
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  20+ Saat Uzman Liderliğindeki Kurslar
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Kişiselleştirilmiş Gelişim Yolu
                </li>
              </ul>
              <Link to="/start">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Hemen Başla
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">IQTest</h3>
              <p className="text-gray-400">Bilimsel IQ testi ile zeka seviyenizi ölçün.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Ana Sayfa</Link></li>
                <li><Link to="/test" className="text-gray-400 hover:text-white">Test</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Giriş Yap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">info@iqtest.com</li>
                <li className="text-gray-400">+90 555 123 4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Sosyal Medya</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaEnvelope className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaQuestionCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 IQTest. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 