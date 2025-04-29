import { useState, useEffect, createContext } from "react";  

export const ThemeContext = createContext();  

export const ThemeProvider = ({ children }) => {  
  // Initialize theme from localStorage or default to light  
  const [isDarkMode, setIsDarkMode] = useState(() => {  
    const savedTheme = localStorage.getItem("theme");  
    return savedTheme === "dark";  
  });  

  // Toggle theme and save preference  
  const toggleTheme = () => {  
    const newMode = !isDarkMode;  
    setIsDarkMode(newMode);  
    localStorage.setItem("theme", newMode ? "dark" : "light");  
    document.body.setAttribute("data-theme", newMode ? "dark" : "light");  
  };  

  // Apply theme to body on mount  
  useEffect(() => {  
    document.body.setAttribute(  
      "data-theme",  
      isDarkMode ? "dark" : "light"  
    );  
  }, [isDarkMode]);  

  return (  
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>  
      {children}  
    </ThemeContext.Provider>  
  );  
};  