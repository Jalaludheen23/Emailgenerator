import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend base URL if deployed

export const login = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_BASE_URL}/auth/register`, data);
export const verifyOtp = (data) => axios.post(`${API_BASE_URL}/auth/verify-otp`, data);
