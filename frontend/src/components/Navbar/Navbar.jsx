import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar-wrapper">
      <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-auto">Auto</span>
          <span className="logo-maison">Maison</span>
        </Link>

        {/* Nav Links (center) */}
        <div className="nav-links">
          <Link to="/cars">Cars</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Actions (right side) */}
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          <div className="lang-currency">
            <select>
              <option>EN</option>
              <option>FR</option>
            </select>
          </div>

          <div className="lang-currency">
            <select>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>

          {user ? (
            <>
              <button className="auth-btn" onClick={handleLogout}>
                Logout
              </button>
              <Link to="/account" className="auth-btn">
                Account
              </Link>
            </>
          ) : (
            <Link to="/login" className="auth-btn">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <Link to="/cars" onClick={() => setMobileMenuOpen(false)}>Cars</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>

          {/* Theme, Language, Currency inside mobile */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          <div className="lang-currency">
            <select>
              <option>EN</option>
              <option>FR</option>
            </select>
          </div>

          <div className="lang-currency">
            <select>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>

          {user ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/account">Account</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;