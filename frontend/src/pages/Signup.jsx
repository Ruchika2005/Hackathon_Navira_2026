import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const formData = {
    userName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  const [formState, setFormState] = useState(formData);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null }); // clear error on typing
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formState.userName.trim()) newErrors.userName = "Please enter your full name.";
    
    if (!formState.mobileNumber.trim()) {
      newErrors.mobileNumber = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(formState.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit Indian mobile number.";
    }
    
    if (formState.email && !/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email or leave it blank.";
    }

    if (!formState.password) {
      newErrors.password = "Please enter a password.";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match. Please try again.";
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
      const response = await axios.post('/api/auth/signup', formState);
      localStorage.setItem('token', response.data.token);
      alert('Account created successfully!');
      navigate('/');
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border-4 border-slate-200 overflow-hidden">
      <div className="bg-blue-600 px-8 py-8 flex items-center justify-center gap-4">
        <UserPlus className="text-white w-10 h-10" aria-hidden="true" />
        <h2 className="text-4xl font-extrabold text-white tracking-widest text-center">Create Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-8 sm:p-10" noValidate>
        {apiError && (
          <div className="mb-8 p-6 bg-red-100 border-l-8 border-red-600 rounded-lg" role="alert">
            <h3 className="text-2xl font-bold text-red-800 mb-2">Error</h3>
            <p className="text-red-700 text-xl font-medium">{apiError}</p>
          </div>
        )}

        <InputField
          label="Your Full Name"
          id="userName"
          value={formState.userName}
          onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          error={errors.userName}
        />
        
        <InputField
          label="Mobile Number"
          type="tel"
          id="mobileNumber"
          value={formState.mobileNumber}
          onChange={handleChange}
          placeholder="10-digit number"
          error={errors.mobileNumber}
        />

        <InputField
          label="Email Address"
          type="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="e.g. rahul@example.com"
          error={errors.email}
          optional
        />

        <InputField
          label="Create a Password"
          type="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          error={errors.password}
        />

        <InputField
          label="Confirm your Password"
          type="password"
          id="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
          placeholder="Type the exact same password"
          error={errors.confirmPassword}
        />

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full mt-6 py-5 rounded-2xl flex items-center justify-center gap-3 text-2xl font-bold text-white shadow-lg focus-ring transition-all ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:-translate-y-1'}`}
        >
          {isLoading ? 'Creating Account... Please wait.' : 'Create My Account'}
          {!isLoading && <ArrowRight className="w-8 h-8" />}
        </button>

        <div className="mt-10 text-center pt-8 border-t-2 border-slate-100">
          <p className="text-xl text-slate-700 mb-4 font-medium">Already have an account?</p>
          <Link 
            to="/login" 
            className="inline-block px-8 py-4 bg-slate-100 text-blue-700 font-bold text-xl rounded-xl hover:bg-blue-100 focus-ring border-2 border-slate-200 transition-colors"
          >
            Go to Login Page
          </Link>
        </div>
      </form>
    </div>
  );
}
