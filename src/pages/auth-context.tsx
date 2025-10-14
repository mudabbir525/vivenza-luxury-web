// import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   identity_type?: string;
//   identity_document?: string;
//   identity_verified?: boolean;
//   created_at: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
//   updateUser: (userData: User) => void;
//   loading: boolean;
//   refreshUserData: () => Promise<void>;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Calculate isAuthenticated based on user state
//   const isAuthenticated = !!user;

//   const refreshUserData = async () => {
//     try {
//       const storedUser = localStorage.getItem("vivenza_user");
//       if (!storedUser) {
//         setLoading(false);
//         return;
//       }

//       const userData = JSON.parse(storedUser);
//       const response = await fetch(
//         "https://vivenza.adminmahaspice.in/api/login/get-user-details.php",
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

//       const data = await response.json();
//       if (data.success) {
//         localStorage.setItem("vivenza_user", JSON.stringify(data.user));
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

//   // Single useEffect to handle initialization
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const storedUser = localStorage.getItem("vivenza_user");
//       if (storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           setUser(userData);
//           // Refresh data from server in background
//           await refreshUserData();
//         } catch (error) {
//           console.error("Error parsing stored user:", error);
//           localStorage.removeItem("vivenza_user");
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("vivenza_user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("vivenza_user");
//     window.location.href = "/";
//   };

//   const updateUser = (newData: User) => {
//     setUser(newData);
//     localStorage.setItem("vivenza_user", JSON.stringify(newData));
//     refreshUserData();
//   };

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         user, 
//         login, 
//         logout, 
//         updateUser, 
//         loading, 
//         refreshUserData,
//         isAuthenticated
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }














import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  identity_type?: string;
  identity_document?: string;
  identity_verified?: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  loading: boolean;
  refreshUserData: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Calculate isAuthenticated based on user state
  const isAuthenticated = !!user;

  const refreshUserData = async () => {
    try {
      const storedUser = localStorage.getItem("vivenza_user");
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      console.error("Error refreshing user data:", error);
      localStorage.removeItem("vivenza_user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("vivenza_user", JSON.stringify(userData));
    
    // NEW: No automatic navigation here - let components handle their own navigation
    // This allows for more flexible redirect handling
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vivenza_user");
    
    // NEW: Clear booking session data on logout
    sessionStorage.removeItem('vivenza_booking_data');
    sessionStorage.removeItem('vivenza_redirect_to_booking');
    
    // Redirect to home page
    window.location.href = '/';
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("vivenza_user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
        refreshUserData,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
