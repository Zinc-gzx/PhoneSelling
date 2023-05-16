import './App.css';
import { Login } from "./pages/login/Login";
import { Setup } from "./pages/login/Setup";
import { ResetEmail } from "./pages/login/ResetEmail";
import { ResetPassword } from "./pages/login/ResetPassword";
import { Verify } from "./pages/login/Verify";
import { UserProfile } from "./pages/userProfile/UserProfile";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { Typography, Box } from '@mui/material';



function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <Box sx={{ bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h1" component="div" sx={{ color: 'white', fontSize: '50px', fontWeight: 'bold', fontStyle: 'italic' }}>
          Old Phone Deals
        </Typography>
      </Box>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/checkout' element={<Checkout />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/setup' element={<Setup />} />
          <Route exact path='/reset_email' element={<ResetEmail />} />
          <Route exact path='/reset_password' element={<ResetPassword />} />
          <Route exact path='/email_verify' element={<Verify />} />
          <Route exact path='/user_profile' element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
    </RecoilRoot>
  );
};

export default App;
