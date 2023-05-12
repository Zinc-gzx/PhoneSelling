import './App.css';
import { Login } from "./pages/login/Login";
import { Setup } from "./pages/login/Setup";
import { ResetEmail } from "./pages/login/ResetEmail";
import { ResetPassword } from "./pages/login/ResetPassword";
import { Verify } from "./pages/login/Verify";
import { UserProfile } from "./pages/userProfile/UserProfile";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/setup' element={<Setup />} />
          <Route exact path='/reset_email' element={<ResetEmail />} />
          <Route exact path='/reset_password' element={<ResetPassword />} />
          <Route exact path='/email_verify' element={<Verify />} />
          <Route exact path='/user_profile' element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
