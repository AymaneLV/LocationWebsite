import { useState, useEffect, createContext } from "react";  
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from "../services/authApi";  

export const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {  
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  // Load user on app start  
  useEffect(() => {  
    const loadUser = async () => {  
      try {  
        const storedToken = localStorage.getItem("token");  
        if (storedToken) {  
          const { data } = await getCurrentUser();  
          setUser(data.user);  
        }  
      } catch (err) {  
        console.error("Session validation failed:", err);  
        localStorage.removeItem("token");  
      } finally {  
        setLoading(false);  
      }  
    };  
    loadUser();  
  }, []);  

  // Login  
  const login = async (email, password) => {  
    try {  
      setError(null);  
      const { token, user } = await apiLogin(email, password);  
      localStorage.setItem("token", token);  
      setUser(user);  
      return user;  
    } catch (err) {  
      setError(err.error);  
      throw err;  
    }  
  };  

  // Register  
  const register = async (userData) => {  
    try {  
      setError(null);  
      const { token, user } = await apiRegister(userData);  
      localStorage.setItem("token", token);  
      setUser(user);  
      return user;  
    } catch (err) {  
      setError(err.error);  
      throw err;  
    }  
  };  

  // Logout  
  const logout = async () => {  
    try {  
      await apiLogout();  
      localStorage.removeItem("token");  
      setUser(null);  
    } catch (err) {  
      console.error("Logout failed:", err);  
    }  
  };  

  return (  
    <AuthContext.Provider  
      value={{ user, loading, error, login, register, logout }}  
    >  
      {children}  
    </AuthContext.Provider>  
  );  
};  