import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OtpVerification from './components/OtpVerification';
import Chatbot from './components/Chatbot';

const App = () => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState('');

  const handleLoginSuccess = (email, otp) => {
    setEmail(email);
    setOtpSent(otp);
  };

  const handleOtpVerified = () => {
    setIsOtpVerified(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={!otpSent ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/otp" />}
      />
      <Route
        path="/otp"
        element={
          !isOtpVerified ? (
            <OtpVerification email={email} otpSent={otpSent} onOtpVerified={handleOtpVerified} />
          ) : (
            <Navigate to="/chatbot" />
          )
        }
      />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
};

export default App;
