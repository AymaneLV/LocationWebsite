import { useContext } from "react";  
import { ThemeContext } from "../context/ThemeContext";  
import "./ThemeToggle.css";  

const ThemeToggle = () => {  
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);  

  return (  
    <button className="theme-toggle" onClick={toggleTheme}>  
      {isDarkMode ? "🌙 Light Mode" : "☀️ Dark Mode"}  
    </button>  
  );  
};  

export default ThemeToggle;  