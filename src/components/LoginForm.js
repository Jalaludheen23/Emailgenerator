import React, { useState } from 'react';
import Swal from 'sweetalert2';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === 'user@example.com' && password === 'password123') {
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
      
      // Simulate sending OTP to email (replace with backend integration)
      console.log(`OTP sent to ${email}: ${otp}`);
      Swal.fire('Success', `OTP sent to ${email}`, 'success');

      // Call parent handler to proceed to OTP verification
      onLoginSuccess(email, otp);
    } else {
      Swal.fire('Error', 'Invalid email or password!', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h4 className="card-title text-center">Login</h4>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 mt-4" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
