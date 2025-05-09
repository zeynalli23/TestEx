import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo ve Başlık */}
          <div className="text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800">
            Get ready to start the <span className="text-blue-500">IQ test!</span>
          </h1>

          {/* Test Bilgileri */}
          <div className="space-y-4 w-full">
            <div className="flex items-start space-x-3">
              <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600">You will get 25 questions with growing difficulty</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600">Select the right answer out of the 6 options</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <svg className="h-6 w-6 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-600">You can skip the question and return back later</p>
            </div>
          </div>

          {/* Başlat Butonu */}
          <button
            onClick={() => navigate('/test')}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Start IQ Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start; 