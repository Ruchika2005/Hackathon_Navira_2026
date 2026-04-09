import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField';
import { LogIn, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    mobileNumber: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (!formState.mobileNumber.trim()) {
      newErrors.mobileNumber = "Please enter your mobile number.";
    }
    
    if (!formState.password) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login', formState);
      localStorage.setItem('token', response.data.token);
      alert('Logged in successfully!');
      // In a real app we'd redirect to dashboard here, for now reload or redirect to /
      navigate('/');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Invalid Mobile Number or Password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border-4 border-slate-200 overflow-hidden">
      <div className="bg-blue-800 px-8 py-10 flex items-center justify-center gap-4">
        <LogIn className="text-white w-10 h-10" aria-hidden="true" />
        <h2 className="text-5xl font-extrabold text-white tracking-widest text-center">Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 sm:p-12" noValidate>
        {apiError && (
          <div className="mb-8 p-6 bg-red-100 border-l-8 border-red-600 rounded-lg" role="alert">
            <h3 className="text-2xl font-bold text-red-800 mb-2">Login Failed</h3>
            <p className="text-red-700 text-xl font-medium">{apiError}</p>
          </div>
        )}

        <div className="mb-8">
            <InputField
            label="Mobile Number"
            type="tel"
            id="mobileNumber"
            value={formState.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your 10-digit number"
            error={errors.mobileNumber}
            />
        </div>

        <div className="mb-4">
            <InputField
            label="Password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Type your secret password"
            error={errors.password}
            />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full mt-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-3xl font-bold text-white shadow-xl focus-ring transition-all ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:-translate-y-1'}`}
        >
          {isLoading ? 'Please wait...' : 'Login Now'}
          {!isLoading && <ArrowRight className="w-8 h-8" />}
        </button>

        <div className="mt-12 text-center pt-8 border-t-4 border-slate-100">
          <p className="text-2xl text-slate-800 mb-6 font-bold">Don't have an account yet?</p>
          <Link 
            to="/signup" 
            className="inline-block px-10 py-5 bg-blue-50 text-blue-800 font-extrabold text-2xl rounded-2xl hover:bg-blue-100 focus-ring border-4 border-blue-200 transition-colors shadow-sm"
          >
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
}
