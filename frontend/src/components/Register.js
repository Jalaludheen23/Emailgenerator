import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api'; // Ensure this points to the correct path for your API utility
import Swal from 'sweetalert2';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call the register function from API utils
      await register({ email, password });
      Swal.fire('OTP Sent!', 'Check your email for OTP.', 'success');
      navigate('/otp-verification', { state: { email } });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Registration failed', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
            autoComplete="new-password"
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
