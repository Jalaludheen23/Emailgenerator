import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // No need to store the response
      Swal.fire('OTP Sent!', 'Check your email for OTP.', 'success');
      navigate('/otp-verification', { state: { email } });
    } catch (err) {
      Swal.fire('Error', err.response.data.error, 'error');
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Login</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
