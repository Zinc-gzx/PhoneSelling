import './App.css';
import { Login } from "./pages/Login";
import { Setup } from "./pages/Setup";
import { Reset } from "./pages/Reset";
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/setup' element={<Setup />} />
          <Route exact path='/reset' element={<Reset />} />
        </Routes>
      </Router>
    </div>

    
    
  );
};

export default App;
