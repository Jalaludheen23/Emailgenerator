import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ email, otpSent, onOtpVerified }) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = () => {
    if (otp === otpSent.toString()) {
      Swal.fire('Success', 'OTP Verified. You are logged in!', 'success').then(() => {
        onOtpVerified();
        navigate('/chatbot');
      });
    } else {
      Swal.fire('Error', 'Invalid OTP!', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h4 className="card-title text-center">OTP Verification</h4>
          <p className="text-center">An OTP has been sent to {email}</p>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 mt-4" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
