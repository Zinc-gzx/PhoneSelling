import './App.css';
import { Login } from "./pages/Login";
import { Setup } from "./pages/Setup";
import { ResetEmail } from "./pages/ResetEmail";
import { ResetPassword } from "./pages/ResetPassword";
import { Verify } from "./pages/Verify";
import { Home } from "./pages/Home";
import { Checkout } from './pages/Checkout';
import React from "react";
import { Typography, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Box sx={{ bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h1" component="div" sx={{ color: 'white', fontSize: '50px', fontWeight: 'bold', fontStyle: 'italic' }}>
          Old Phone Deals
        </Typography>
      </Box>
      <Router>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
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
