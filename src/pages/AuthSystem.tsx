import React, { useState, useEffect } from "react";
import { User, Phone, Home, Lock, Mail, ArrowRight, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";

// VivenzaLogin Component with Complete Signup Flow
const VivenzaAuth = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup'
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'details'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://admin.webhostdevs.com/api/login/send-otp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `phone=${phone}`
      });

      const data = await response.json();

      if (data.success) {
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://admin.webhostdevs.com/api/login/verify-otp.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `phone=${phone}&otp=${otp}`
      });

      const data = await response.json();

      if (data.success) {
        if (data.userExists && authMode === 'login') {
          const userResponse = await fetch('https://admin.webhostdevs.com/api/login/get-user-details.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone })
          });

          const userData = await userResponse.json();
          if (userData.success) {
            login(userData.user);
            navigate('/'); // Redirect to home page after login
          }
        } else if (!data.userExists && authMode === 'login') {
          setError('Account not found. Please sign up first.');
          setAuthMode('signup');
          setStep('details');
        } else if (data.userExists && authMode === 'signup') {
          setError('Account already exists. Please login instead.');
          setAuthMode('login');
        } else {
          setStep('details');
        }
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!signupData.name || !signupData.email || !signupData.address) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://admin.webhostdevs.com/api/login/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(signupData.name)}&phone=${phone}&email=${encodeURIComponent(signupData.email)}&address=${encodeURIComponent(signupData.address)}`
      });

      const data = await response.json();

      if (data.success) {
        login(data.user);
        navigate('/'); // Redirect to home page after signup
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('phone');
    setPhone('');
    setOtp('');
    setError('');
    setSignupData({ name: '', email: '', address: '' });
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 via-white-800 to-white-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5"></div>
      
      {/* Compact Horizontal Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-lg border border-red-200 overflow-hidden mt-20">
        <div className="p-6">
          {/* Compact Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-800 to-red-700 bg-clip-text text-transparent">
                Welcome to Vivenza
              </h1>
              <p className="text-gray-600 text-xs">
                {authMode === 'login' ? 'Experience luxury and elegance' : 'Join the Vivenza experience'}
              </p>
            </div>
          </div>

          {/* Horizontal Auth Mode Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => switchAuthMode('login')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                authMode === 'login'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-red-700'
              }`}
            >
              Welcome Back
            </button>
            <button
              onClick={() => switchAuthMode('signup')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                authMode === 'signup'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-red-700'
              }`}
            >
              Join Us
            </button>
          </div>

          {/* Horizontal Step Indicator */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              <div className={`w-2 h-2 rounded-full transition-all ${step === 'phone' ? 'bg-red-700 w-4' : 'bg-gray-300'}`}></div>
              <div className={`w-2 h-2 rounded-full transition-all ${step === 'otp' ? 'bg-red-700 w-4' : 'bg-gray-300'}`}></div>
              {authMode === 'signup' && (
                <div className={`w-2 h-2 rounded-full transition-all ${step === 'details' ? 'bg-red-700 w-4' : 'bg-gray-300'}`}></div>
              )}
            </div>
          </div>

          {/* Current Step Description */}
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm">
              {step === 'phone' && 'Enter your phone number to continue'}
              {step === 'otp' && 'Enter the OTP sent to your phone'}
              {step === 'details' && 'Complete your profile information'}
            </p>
          </div>

          {/* Compact Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-3 py-2 rounded-lg mb-4 flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2 text-sm">
                {error}
              </div>
            </div>
          )}

          {/* Phone Step */}
          {step === 'phone' && (
            <div className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  maxLength={10}
                />
              </div>
              <button
                onClick={handleSendOTP}
                disabled={loading || phone.length !== 10}
                className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-800 hover:to-red-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all transform hover:scale-[1.02] shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Send OTP <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-xl tracking-widest font-mono transition-all"
                  maxLength={6}
                />
                <p className="text-center text-xs text-gray-500 mt-2">
                  OTP sent to +91 {phone}
                </p>
              </div>
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-800 hover:to-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  'Verify OTP'
                )}
              </button>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep('phone')}
                  className="text-red-700 py-1 font-medium hover:text-red-800 transition-colors text-sm"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-sm text-gray-500 hover:text-red-700 transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {/* Signup Details Step - Horizontal Grid */}
          {step === 'details' && authMode === 'signup' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Home className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    placeholder="Complete Address"
                    value={signupData.address}
                    onChange={(e) => setSignupData({...signupData, address: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    rows={2}
                  />
                </div>
              </div>
              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg font-semibold hover:from-red-800 hover:to-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] shadow-lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  'Complete Registration'
                )}
              </button>
              <button
                onClick={() => setStep('otp')}
                className="w-full text-red-700 py-1 font-medium hover:text-red-800 transition-colors text-sm"
              >
                ← Back to OTP
              </button>
            </div>
          )}

          {/* Compact Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to Vivenza's{' '}
              <a href="/terms" className="text-red-700 hover:underline">Terms</a>
              {' '}and{' '}
              <a href="/privacy" className="text-red-700 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Auth component - NO AUTO REDIRECT TO PROFILE
const AuthSystem = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          <p className="text-white font-medium">Loading Vivenza...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <VivenzaAuth />;
  }

  return children; // Return children (home page) instead of redirecting to profile
};

export default AuthSystem;
