import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import "./Register.css";

/**
 * Register Component
 * Handles user registration with form validation and role selection
 * @returns {JSX.Element} Registration form and interface
 */
const Register = () => {
  // State management for form inputs and UI
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handle registration form submission
   * Creates new user account and manages registration state
   * @param {Event} event - Form submission event
   */
  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Send registration request to backend
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("Registration Successful!");
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      alert("Registration Failed: " + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Registration header section */}
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Join us and start managing your attendance</p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            {/* Full name input field */}
            <div className="input-box">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email input field */}
            <div className="input-box">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input field with toggle visibility */}
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role selection dropdown */}
            <div className="role-select">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-select-input"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit button with loading state */}
          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <IoMdPersonAdd className="register-icon" />
                Create Account
              </>
            )}
          </button>

          {/* Login link for existing users */}
          <div className="login-link">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-cta">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
