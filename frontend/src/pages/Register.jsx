import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard } from "react-icons/fa";
import "./Login.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    driverLicense: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { 
    name, 
    email, 
    password, 
    confirmPassword,
    phoneNumber,
    driverLicense
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify({ 
        name, 
        email, 
        password,
        phoneNumber,
        driverLicense
      });

      const res = await axios.post("/api/auth/register", body, config);

      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Your Account</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="auth-input-container">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={onChange}
            required
          />
          <i><FaUser /></i>
        </div>

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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
          <i><FaLock /></i>
        </div>

        <div className="auth-input-container">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChange}
            required
          />
          <i><FaLock /></i>
        </div>

        <div className="auth-input-container">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={onChange}
          />
          <i><FaPhone /></i>
        </div>

        <div className="auth-input-container">
          <input
            type="text"
            name="driverLicense"
            placeholder="Driver License Number"
            value={driverLicense}
            onChange={onChange}
          />
          <i><FaIdCard /></i>
        </div>

        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;