import './App.css';
import { Login } from "./pages/Login";
import { Setup } from "./pages/Setup";
import { ResetEmail } from "./pages/ResetEmail";
import { ResetPassword } from "./pages/ResetPassword";
import { Verify } from "./pages/Verify";
import { Home } from "./pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Old Phone Deals</h1>
      </div>
      <Router>
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/setup' element={<Setup />} />
          <Route exact path='/reset_email' element={<ResetEmail />} />
          <Route exact path='/reset_password' element={<ResetPassword />} />
          <Route exact path='/email_verify' element={<Verify />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
