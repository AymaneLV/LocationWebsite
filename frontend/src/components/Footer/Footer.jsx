import { useContext } from "react";  
import { ThemeContext } from "../../context/ThemeContext";  
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";  
import "./Footer.css";  

const Footer = () => {  
  const { isDarkMode } = useContext(ThemeContext);  

  return (  
    <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>  
      <div className="footer-container">  
        {/* Logo + Contact */}  
        <div className="footer-section">  
          <div className="footer-logo">  
            <span className="logo-auto">Auto</span>  
            <span className="logo-maison">Maison</span>  
          </div>  
          <p>Contact us:</p>  
          <p>📍 123 ouislane , 50000 Morocco</p>  
          <p>📞 +33 1 23 45 67 89</p>  
          <p>📧 contact@automaison.com</p>  
        </div>  

        {/* Navigation Links */}  
        <div className="footer-section">  
          <h4>Navigation</h4>  
          <ul>  
            <li><a href="/">Home</a></li>  
            <li><a href="/cars">Cars</a></li>  
            <li><a href="/about">About Us</a></li>  
            <li><a href="/contact">Contact Us</a></li>  
          </ul>  
        </div>  

        {/* Newsletter Signup */}  
        <div className="footer-section">  
          <h4>Newsletter</h4>  
          <form className="newsletter-form">  
            <input  
              type="email"  
              placeholder="Your email address"  
              className="newsletter-input"  
            />  
            <button type="submit" className="newsletter-btn">  
              Subscribe  
            </button>  
          </form>  
        </div>  

        {/* Social Media */}  
        <div className="footer-section">  
          <h4>Follow Us</h4>  
          <div className="social-icons">  
            <a href="#"><FaFacebook /></a>  
            <a href="#"><FaTwitter /></a>  
            <a href="#"><FaInstagram /></a>  
          </div>  
        </div>  
      </div>  
      <div className="footer-bottom">  
        <p>© 2023 AutoMaison. All rights reserved.</p>  
      </div>  
    </footer>  
  );  
};  

export default Footer;  