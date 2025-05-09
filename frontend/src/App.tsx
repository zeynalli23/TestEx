import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import Test from './pages/Test';
import Result from './pages/Result';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
        <Route path="/checkout/user/:userId" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
