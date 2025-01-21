import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import OTPVerification from './components/OTPVerification';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Emailgenerator" element={<Login />} /> {/* Optional, adjust as needed */}
      </Routes>
    </Router>
  );
};

export default App;
