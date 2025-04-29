import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify({ email, password });

      const res = await axios.post("/api/auth/login", body, config);

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard or home
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login to Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="auth-input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
          <i><FaEnvelope /></i>
        </div>

        <div className="auth-input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
          <i><FaLock /></i>
        </div>

        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;