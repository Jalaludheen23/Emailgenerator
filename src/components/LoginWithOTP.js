import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginWithOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await fetch('https://your-backend-api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Swal.fire('Success', 'OTP sent to your email!', 'success');
        setIsOtpSent(true);
      } else {
        const data = await response.json();
        Swal.fire('Error', data.message || 'Failed to send OTP', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred while sending the OTP', 'error');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('https://your-backend-api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        Swal.fire('Success', 'Login Successful!', 'success').then(() => {
          navigate('/home');
        });
      } else {
        const data = await response.json();
        Swal.fire('Error', data.message || 'Invalid OTP', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred while verifying the OTP', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h4 className="card-title text-center">Login with OTP</h4>
          {!isOtpSent ? (
            <>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100 mt-4" onClick={sendOtp}>
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100 mt-4" onClick={verifyOtp}>
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWithOTP;
