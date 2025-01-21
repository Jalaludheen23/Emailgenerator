import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../utils/api';
import Swal from 'sweetalert2';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ email, otp });
      Swal.fire('Success', 'OTP Verified!', 'success');
      navigate('/home');
    } catch (err) {
      Swal.fire('Error', err.response.data.error, 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>OTP Verification</h2>
      <form onSubmit={handleVerify}>
        <div className="mb-3">
          <label>OTP</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPVerification;
