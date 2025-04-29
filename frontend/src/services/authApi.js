import api from "./api";  

// Register  
export const register = async (userData) => {  
  try {  
    const res = await api.post("/api/auth/register", userData);  
    return res.data;  
  } catch (err) {  
    throw err.response.data;  
  }  
};  

// Login  
export const login = async (email, password) => {  
  try {  
    const res = await api.post("/api/auth/login", { email, password });  
    return res.data;  
  } catch (err) {  
    throw err.response.data;  
  }  
};  

// Logout  
export const logout = async () => {  
  try {  
    await api.post("/api/auth/logout");  
  } catch (err) {  
    throw err.response.data;  
  }  
};  

// Get Current User  
export const getCurrentUser = async () => {  
  try {  
    const res = await api.get("/api/auth/me");  
    return res.data;  
  } catch (err) {  
    throw err.response.data;  
  }  
};  