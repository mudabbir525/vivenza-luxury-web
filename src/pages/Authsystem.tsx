// import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
// import { User, Phone, Home, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";

// // Types and Interfaces
// interface UserData {
//   id: string | number;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   [key: string]: any;
// }

// interface AuthContextType {
//   user: UserData | null;
//   login: (userData: UserData) => void;
//   logout: () => void;
//   refreshUserData: () => Promise<void>;
//   updateUser: (newData: UserData) => void;
//   loading: boolean;
// }

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   otp: string;
// }

// interface APIResponse {
//   success: boolean;
//   error?: string;
//   user?: UserData;
//   exists?: boolean;
// }

// type AuthStep = 'phone' | 'details' | 'otp';

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Auth Context
// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const refreshUserData = async (): Promise<void> => {
//     try {
//       const storedUser = localStorage.getItem("user");
      
//       if (!storedUser) {
//         setLoading(false);
//         return;
//       }

//       const userData: UserData = JSON.parse(storedUser);
//       const response = await fetch(
//         "https://adminmahaspice.in/ms3/login/get-user-details.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ phone: userData.phone }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }

//       const data: APIResponse = await response.json();
//       if (data.success && data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         setUser(data.user);
//       } else {
//         throw new Error(data.error || "Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Error refreshing user data:", error);
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshUserData();
//   }, []);

//   const login = (userData: UserData): void => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = (): void => {
//     setUser(null);
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   const updateUser = (newData: UserData): void => {
//     setUser(newData);
//     localStorage.setItem("user", JSON.stringify(newData));
//     refreshUserData();
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, refreshUserData, updateUser, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Main Auth Component
// export const ModernAuthSystem: React.FC = () => {
//   const { login } = useAuth();
//   const [currentStep, setCurrentStep] = useState<AuthStep>('phone');
//   const [isLogin, setIsLogin] = useState<boolean>(true);
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     otp: "",
//   });

//   const API_BASE_URL: string = "https://adminmahaspice.in/ms3/login";

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setError("");
//     setSuccess("");
//   };

//   const validateEmail = (email: string): boolean => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const checkUserExists = async (phone: string): Promise<boolean> => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("phone", phone);

//       const response = await fetch(`${API_BASE_URL}/check-user.php`, {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: APIResponse = await response.json();
//       return data.exists || false;
//     } catch (error) {
//       console.error("Error checking user:", error);
//       throw new Error("Unable to check user status");
//     }
//   };

//   const sendOTP = async (phone: string): Promise<boolean> => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("phone", phone);

//       const response = await fetch(`${API_BASE_URL}/send-otp.php`, {
//         method: "POST",
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: APIResponse = await response.json();
//       if (data.success) {
//         return true;
//       } else {
//         throw new Error("Failed to send OTP");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       throw new Error("Unable to send OTP");
//     }
//   };

//   const handlePhoneSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (!formData.phone || formData.phone.length !== 10) {
//         throw new Error("Please enter a valid 10-digit phone number");
//       }

//       const userExists = await checkUserExists(formData.phone);

//       if (userExists && !isLogin) {
//         setError("Account already exists. Please login instead.");
//         setIsLogin(true);
//         setLoading(false);
//         return;
//       }

//       if (!userExists && isLogin) {
//         setError("Account not found. Please sign up first.");
//         setIsLogin(false);
//         setLoading(false);
//         return;
//       }

//       if (isLogin) {
//         await sendOTP(formData.phone);
//         setCurrentStep('otp');
//         setSuccess("OTP sent to your phone number");
//       } else {
//         setCurrentStep('details');
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "An error occurred. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDetailsSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       if (!formData.name || !formData.email || !formData.address) {
//         throw new Error("Please fill in all required fields");
//       }

//       if (!validateEmail(formData.email)) {
//         throw new Error("Please enter a valid email address");
//       }

//       await sendOTP(formData.phone);
//       setCurrentStep('otp');
//       setSuccess("OTP sent to your phone number");
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Unable to send OTP. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleOTPSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);

//   try {
//     if (!formData.otp || formData.otp.length !== 6) {
//       throw new Error("Please enter a valid 6-digit OTP");
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("phone", formData.phone);
//     formDataToSend.append("otp", formData.otp);

//     const response = await fetch(`${API_BASE_URL}/verify-otp.php`, {
//       method: "POST",
//       body: formDataToSend,
//     });

//     if (!response.ok) {
//       const errorData: APIResponse = await response.json();
//       throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//     }

//     const data: APIResponse = await response.json();

//     if (data.success) {
//       if (!isLogin) {
//         // Handle signup
//         const signupFormData = new FormData();
//         signupFormData.append("name", formData.name);
//         signupFormData.append("email", formData.email);
//         signupFormData.append("phone", formData.phone);
//         signupFormData.append("address", formData.address);

//         const signupResponse = await fetch(`${API_BASE_URL}/signup.php`, {
//           method: "POST",
//           body: signupFormData,
//         });

//         if (!signupResponse.ok) {
//           const errorData: APIResponse = await signupResponse.json();
//           throw new Error(errorData.error || `HTTP error! status: ${signupResponse.status}`);
//         }

//         const signupData: APIResponse = await signupResponse.json();

//         if (signupData.success && signupData.user) {
//           login(signupData.user);
//           setSuccess("Account created successfully!");
//           // Redirect to home page after signup
//           window.location.href = "/";
//         } else {
//           throw new Error("Signup failed");
//         }
//       } else {
//         // Handle login
//         const userDetailsResponse = await fetch(`${API_BASE_URL}/get-user-details.php`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ phone: formData.phone }),
//         });

//         if (!userDetailsResponse.ok) {
//           const errorData: APIResponse = await userDetailsResponse.json();
//           throw new Error(errorData.error || `HTTP error! status: ${userDetailsResponse.status}`);
//         }

//         const userDetails: APIResponse = await userDetailsResponse.json();

//         if (userDetails.success && userDetails.user) {
//           login(userDetails.user);
//           setSuccess("Login successful!");
//           // Redirect to profile page after login
//           window.location.href = "/profile";
//         } else {
//           throw new Error("Failed to fetch user details");
//         }
//       }
//     } else {
//       throw new Error("Invalid OTP");
//     }
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : "Unable to verify OTP. Please try again.";
//     setError(errorMessage);
//   } finally {
//     setLoading(false);
//   }
// };

//   const resetForm = (): void => {
//     setCurrentStep('phone');
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       address: "",
//       otp: "",
//     });
//     setError("");
//     setSuccess("");
//   };

//   const switchMode = (): void => {
//     setIsLogin(!isLogin);
//     resetForm();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
//             <User className="text-white" size={24} />
//           </div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             {isLogin ? "Welcome Back" : "Join Us"}
//           </h1>
//           <p className="text-gray-600 mt-2">
//             {isLogin ? "Sign in to your account" : "Create your new account"}
//           </p>
//         </div>

//         {/* Progress Indicator */}
//         <div className="flex items-center justify-center mb-8">
//           <div className="flex items-center space-x-2">
//             <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentStep === 'phone' ? 'bg-blue-500 scale-125' : 'bg-gray-300'
//             }`} />
//             <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
//               currentStep !== 'phone' ? 'bg-blue-500' : 'bg-gray-300'
//             }`} />
//             <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentStep === 'details' ? 'bg-blue-500 scale-125' : 
//               currentStep === 'otp' ? 'bg-blue-500' : 'bg-gray-300'
//             }`} />
//             <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
//               currentStep === 'otp' ? 'bg-blue-500' : 'bg-gray-300'
//             }`} />
//             <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentStep === 'otp' ? 'bg-blue-500 scale-125' : 'bg-gray-300'
//             }`} />
//           </div>
//         </div>

//         {/* Alert Messages */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in slide-in-from-top-2 duration-300">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-in slide-in-from-top-2 duration-300 flex items-center">
//             <CheckCircle size={16} className="mr-2" />
//             {success}
//           </div>
//         )}

//         {/* Phone Step */}
//         {currentStep === 'phone' && (
//           <div className="space-y-6">
//             <div className="relative group">
//               <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 pattern="[0-9]{10}"
//                 className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
//                 required
//               />
//             </div>

//             <button
//               onClick={handlePhoneSubmit}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   Continue
//                   <ArrowRight className="ml-2" size={20} />
//                 </>
//               )}
//             </button>
//           </div>
//         )}

//         {/* Details Step */}
//         {currentStep === 'details' && (
//           <div className="space-y-6">
//             <div className="relative group">
//               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
//                 required
//               />
//             </div>

//             <div className="relative group">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
//                 required
//               />
//             </div>

//             <div className="relative group">
//               <Home className="absolute left-4 top-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
//               <textarea
//                 name="address"
//                 placeholder="Your Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80 resize-none"
//                 required
//               />
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 onClick={() => setCurrentStep('phone')}
//                 className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleDetailsSubmit}
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
//               >
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   "Send OTP"
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* OTP Step */}
//         {currentStep === 'otp' && (
//           <div className="space-y-6">
//             <div className="text-center mb-6">
//               <p className="text-gray-600">
//                 We've sent a 6-digit code to
//               </p>
//               <p className="font-semibold text-gray-800">
//                 +91 {formData.phone}
//               </p>
//             </div>

//             <div className="relative group">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter 6-digit OTP"
//                 value={formData.otp}
//                 onChange={handleChange}
//                 pattern="[0-9]{6}"
//                 maxLength={6}
//                 className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80 text-center text-2xl tracking-widest"
//                 required
//               />
//             </div>

//             <div className="flex space-x-3">
//               <button
//                 onClick={() => setCurrentStep(isLogin ? 'phone' : 'details')}
//                 className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleOTPSubmit}
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
//               >
//                 {loading ? (
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   "Verify OTP"
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Mode Switch */}
//         {currentStep === 'phone' && (
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//             </p>
//             <button
//               onClick={switchMode}
//               className="mt-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
//             >
//               {isLogin ? "Sign Up" : "Sign In"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <ModernAuthSystem />
//     </AuthProvider>
//   );
// };

// export default App;


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
