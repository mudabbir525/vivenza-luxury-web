import React, { useState, useEffect } from "react";
import { User, Phone, Home, Lock, Mail, ArrowRight, Shield, Eye, EyeOff, Upload, FileText, Check } from "lucide-react";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";

// VivenzaLogin Component with Complete Signup Flow
const VivenzaAuth = () => {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup'
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'details', 'identity'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [identityData, setIdentityData] = useState({
    identity_type: '',
    identity_document: null as File | null
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
            navigate('/');
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

  const handleDetailsSubmit = () => {
    if (!signupData.name || !signupData.email || !signupData.address) {
      setError('Please fill all required fields');
      return;
    }
    setStep('identity');
  };

  const handleIdentityUpload = async () => {
    if (!identityData.identity_type || !identityData.identity_document) {
      setError('Please select identity type and upload document');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', signupData.name);
      formData.append('phone', phone);
      formData.append('email', signupData.email);
      formData.append('address', signupData.address);
      formData.append('identity_type', identityData.identity_type);
      formData.append('identity_document', identityData.identity_document);

      const response = await fetch('https://admin.webhostdevs.com/api/login/signup.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        login(data.user);
        navigate('/');
      } else {
        setError(data.error || 'Registration failed');
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
    setIdentityData({ identity_type: '', identity_document: null });
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    resetForm();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload JPEG, PNG, or PDF files only');
        return;
      }
      
      setIdentityData(prev => ({ ...prev, identity_document: file }));
    }
  };

  // Step configuration
  const getStepConfig = () => {
    const steps = [
      { key: 'phone', label: 'Phone', description: 'Enter your phone number' },
      { key: 'otp', label: 'Verify', description: 'Enter OTP code' },
    ];

    if (authMode === 'signup') {
      steps.push(
        { key: 'details', label: 'Profile', description: 'Complete your profile' },
        { key: 'identity', label: 'Identity', description: 'Upload identity proof' }
      );
    }

    return steps;
  };

  const stepConfig = getStepConfig();
  const currentStepIndex = stepConfig.findIndex(s => s.key === step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      {/* Compact Horizontal Modal */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] border border-white/20 overflow-hidden mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          
          {/* Left Side - Visual Elements & Steps */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-6 flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-orange-600/30"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              {/* Brand Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure Access</h3>
                <p className="text-white/80 text-sm">
                  Experience premium security with our multi-step verification process
                </p>
              </div>

              {/* Horizontal Step Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4">
                  {stepConfig.map((stepItem, index) => {
                    const isActive = stepItem.key === step;
                    const isCompleted = index < currentStepIndex;
                    
                    return (
                      <div key={stepItem.key} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                            isCompleted 
                              ? 'bg-white text-amber-600 border-white' 
                              : isActive 
                                ? 'bg-white/20 border-white text-white' 
                                : 'border-white/40 text-white/60'
                          }`}>
                            {isCompleted ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="mt-2 text-center">
                            <div className={`text-xs font-semibold transition-all ${
                              isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-white/60'
                            }`}>
                              {stepItem.label}
                            </div>
                          </div>
                        </div>
                        {index < stepConfig.length - 1 && (
                          <div className={`w-8 h-0.5 mx-2 mt-[-24px] transition-all ${
                            index < currentStepIndex ? 'bg-white' : 'bg-white/30'
                          }`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Form Content */}
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Vivenza</h1>
                  <p className="text-gray-500 text-xs">Premium Authentication</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {step === 'phone' && 'Enter your phone number to continue'}
                  {step === 'otp' && 'Enter the verification code'}
                  {step === 'details' && 'Complete your profile information'}
                  {step === 'identity' && 'Upload identity verification'}
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-6 mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                {error}
              </div>
            )}

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ maxHeight: 'calc(85vh - 200px)' }}>
              {/* Phone Step */}
              {step === 'phone' && (
                <div className="space-y-5">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      maxLength={10}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendOTP}
                    disabled={loading || phone.length !== 10}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Send OTP <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>

                  {authMode === 'login' && (
                    <div className="text-center pt-3">
                      <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <button
                          onClick={() => switchAuthMode('signup')}
                          className="text-amber-600 hover:text-amber-700 font-semibold"
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                  )}

                  {authMode === 'signup' && (
                    <div className="text-center pt-3">
                      <p className="text-gray-600 text-sm">
                        Already a user?{' '}
                        <button
                          onClick={() => switchAuthMode('login')}
                          className="text-amber-600 hover:text-amber-700 font-semibold"
                        >
                          Sign In
                        </button>
                      </p>
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
              )}

              {/* OTP Step */}
              {step === 'otp' && (
                <div className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-center text-xl tracking-widest font-mono transition-all"
                      maxLength={6}
                    />
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Code sent to +91 {phone}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                  
                  <div className="flex justify-between items-center text-sm">
                    <button
                      onClick={() => setStep('phone')}
                      className="text-amber-600 hover:text-amber-700 font-medium flex items-center"
                    >
                      ← Change Number
                    </button>
                    <button
                      onClick={handleSendOTP}
                      disabled={loading}
                      className="text-gray-600 hover:text-amber-600"
                    >
                      Resend Code
                    </button>
                  </div>
                </div>
              )}

              {/* Details Step */}
              {step === 'details' && authMode === 'signup' && (
                <div className="space-y-1">
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        placeholder="Complete Address"
                        value={signupData.address}
                        onChange={(e) => setSignupData({...signupData, address: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep('otp')}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleDetailsSubmit}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Identity Proof Step */}
              {step === 'identity' && authMode === 'signup' && (
                <div className="space-y-1">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Identity Type
                      </label>
                      <select
                        value={identityData.identity_type}
                        onChange={(e) => setIdentityData({...identityData, identity_type: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      >
                        <option value="">Select Identity Type</option>
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="passport">Passport</option>
                        <option value="driving">Driving License</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Document
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-amber-400 transition-colors">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          id="identity-document"
                        />
                        <label htmlFor="identity-document" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            {identityData.identity_document 
                              ? identityData.identity_document.name 
                              : 'Click to upload (JPEG, PNG, PDF)'}
                          </p>
                          <p className="text-xs text-gray-500">Max size: 5MB</p>
                        </label>
                      </div>
                      
                      {/* {identityData.identity_document && (
                        <div className="mt-2 flex items-center justify-between bg-amber-50 p-2 rounded-lg border border-amber-200">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-amber-600 mr-2" />
                            <span className="text-sm text-amber-800 font-medium">
                              {identityData.identity_document.name}
                            </span>
                          </div>
                          <button
                            onClick={() => setIdentityData({...identityData, identity_document: null})}
                            className="text-amber-600 hover:text-amber-700 text-lg font-bold"
                          >
                            ×
                          </button>
                        </div>
                      )} */}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => setStep('details')}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleIdentityUpload}
                      disabled={loading || !identityData.identity_type || !identityData.identity_document}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Auth component
const AuthSystem = ({ children }) => {
  const { user, loading } = useAuth();

  if (!user) {
    return <VivenzaAuth />;
  }

  return children;
};

export default AuthSystem;
