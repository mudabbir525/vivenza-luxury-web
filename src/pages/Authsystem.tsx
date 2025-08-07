import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, Phone, Home, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";

// Types and Interfaces
interface UserData {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  address: string;
  [key: string]: any;
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
  updateUser: (newData: UserData) => void;
  loading: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  otp: string;
}

interface APIResponse {
  success: boolean;
  error?: string;
  user?: UserData;
  exists?: boolean;
}

type AuthStep = 'phone' | 'details' | 'otp';

interface AuthProviderProps {
  children: ReactNode;
}

// Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUserData = async (): Promise<void> => {
    try {
      const storedUser = localStorage.getItem("user");
      
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const userData: UserData = JSON.parse(storedUser);
      const response = await fetch(
        "https://adminmahaspice.in/ms3/login/get-user-details.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: userData.phone }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: APIResponse = await response.json();
      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        throw new Error(data.error || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const login = (userData: UserData): void => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const updateUser = (newData: UserData): void => {
    setUser(newData);
    localStorage.setItem("user", JSON.stringify(newData));
    refreshUserData();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, refreshUserData, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Main Auth Component
export const ModernAuthSystem: React.FC = () => {
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState<AuthStep>('phone');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    otp: "",
  });

  const API_BASE_URL: string = "https://adminmahaspice.in/ms3/login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkUserExists = async (phone: string): Promise<boolean> => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("phone", phone);

      const response = await fetch(`${API_BASE_URL}/check-user.php`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      return data.exists || false;
    } catch (error) {
      console.error("Error checking user:", error);
      throw new Error("Unable to check user status");
    }
  };

  const sendOTP = async (phone: string): Promise<boolean> => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("phone", phone);

      const response = await fetch(`${API_BASE_URL}/send-otp.php`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      if (data.success) {
        return true;
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Unable to send OTP");
    }
  };

  const handlePhoneSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.phone || formData.phone.length !== 10) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      const userExists = await checkUserExists(formData.phone);

      if (userExists && !isLogin) {
        setError("Account already exists. Please login instead.");
        setIsLogin(true);
        setLoading(false);
        return;
      }

      if (!userExists && isLogin) {
        setError("Account not found. Please sign up first.");
        setIsLogin(false);
        setLoading(false);
        return;
      }

      if (isLogin) {
        await sendOTP(formData.phone);
        setCurrentStep('otp');
        setSuccess("OTP sent to your phone number");
      } else {
        setCurrentStep('details');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.address) {
        throw new Error("Please fill in all required fields");
      }

      if (!validateEmail(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      await sendOTP(formData.phone);
      setCurrentStep('otp');
      setSuccess("OTP sent to your phone number");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

const handleOTPSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (!formData.otp || formData.otp.length !== 6) {
      throw new Error("Please enter a valid 6-digit OTP");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("otp", formData.otp);

    const response = await fetch(`${API_BASE_URL}/verify-otp.php`, {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData: APIResponse = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: APIResponse = await response.json();

    if (data.success) {
      if (!isLogin) {
        // Handle signup
        const signupFormData = new FormData();
        signupFormData.append("name", formData.name);
        signupFormData.append("email", formData.email);
        signupFormData.append("phone", formData.phone);
        signupFormData.append("address", formData.address);

        const signupResponse = await fetch(`${API_BASE_URL}/signup.php`, {
          method: "POST",
          body: signupFormData,
        });

        if (!signupResponse.ok) {
          const errorData: APIResponse = await signupResponse.json();
          throw new Error(errorData.error || `HTTP error! status: ${signupResponse.status}`);
        }

        const signupData: APIResponse = await signupResponse.json();

        if (signupData.success && signupData.user) {
          login(signupData.user);
          setSuccess("Account created successfully!");
          // Redirect to home page after signup
          window.location.href = "/";
        } else {
          throw new Error("Signup failed");
        }
      } else {
        // Handle login
        const userDetailsResponse = await fetch(`${API_BASE_URL}/get-user-details.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: formData.phone }),
        });

        if (!userDetailsResponse.ok) {
          const errorData: APIResponse = await userDetailsResponse.json();
          throw new Error(errorData.error || `HTTP error! status: ${userDetailsResponse.status}`);
        }

        const userDetails: APIResponse = await userDetailsResponse.json();

        if (userDetails.success && userDetails.user) {
          login(userDetails.user);
          setSuccess("Login successful!");
          // Redirect to profile page after login
          window.location.href = "/profile";
        } else {
          throw new Error("Failed to fetch user details");
        }
      }
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unable to verify OTP. Please try again.";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const resetForm = (): void => {
    setCurrentStep('phone');
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      otp: "",
    });
    setError("");
    setSuccess("");
  };

  const switchMode = (): void => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <User className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to your account" : "Create your new account"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStep === 'phone' ? 'bg-blue-500 scale-125' : 'bg-gray-300'
            }`} />
            <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
              currentStep !== 'phone' ? 'bg-blue-500' : 'bg-gray-300'
            }`} />
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStep === 'details' ? 'bg-blue-500 scale-125' : 
              currentStep === 'otp' ? 'bg-blue-500' : 'bg-gray-300'
            }`} />
            <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
              currentStep === 'otp' ? 'bg-blue-500' : 'bg-gray-300'
            }`} />
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStep === 'otp' ? 'bg-blue-500 scale-125' : 'bg-gray-300'
            }`} />
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-in slide-in-from-top-2 duration-300 flex items-center">
            <CheckCircle size={16} className="mr-2" />
            {success}
          </div>
        )}

        {/* Phone Step */}
        {currentStep === 'phone' && (
          <div className="space-y-6">
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
                required
              />
            </div>

            <button
              onClick={handlePhoneSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </button>
          </div>
        )}

        {/* Details Step */}
        {currentStep === 'details' && (
          <div className="space-y-6">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
                required
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
                required
              />
            </div>

            <div className="relative group">
              <Home className="absolute left-4 top-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <textarea
                name="address"
                placeholder="Your Address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80 resize-none"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentStep('phone')}
                className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleDetailsSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </div>
        )}

        {/* OTP Step */}
        {currentStep === 'otp' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-gray-600">
                We've sent a 6-digit code to
              </p>
              <p className="font-semibold text-gray-800">
                +91 {formData.phone}
              </p>
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                pattern="[0-9]{6}"
                maxLength={6}
                className="pl-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80 text-center text-2xl tracking-widest"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentStep(isLogin ? 'phone' : 'details')}
                className="flex-1 bg-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
              >
                Back
              </button>
              <button
                onClick={handleOTPSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Mode Switch */}
        {currentStep === 'phone' && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={switchMode}
              className="mt-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ModernAuthSystem />
    </AuthProvider>
  );
};

export default App;
