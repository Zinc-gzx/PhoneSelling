import './App.css';
import NavBar from './components/NavBar.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/home';
import { Checkout } from './pages/checkout/checkout';
function App() {

  return <div className='App'>
    <div className='header-container'>
    <h1>Old Phone Deals</h1>
    </div>
    <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
    </Router>
  
      
  </div>
}

export default App;
