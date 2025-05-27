import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import "./Footer.css";

/**
 * Footer Component
 * Displays the application footer with branding, navigation links, and social media connections
 * @returns {JSX.Element} Footer section
 */
const Footer = () => {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand section with logo and description */}
        <div className="footer-section brand-section">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="text-logo">
                <span className="logo-text">Online</span>
                <span className="logo-highlight">Attendance</span>
                <span className="logo-text">System</span>
              </div>
            </Link>
          </div>
          <p className="company-description">
            Streamline your organization's attendance tracking with our
            comprehensive management system.
          </p>
          <p className="copyright">
            &copy; {currentYear} Attendance Management System. All rights
            reserved.
          </p>
        </div>

        {/* Quick links section */}
        <div className="footer-section links-section">
          <h4 className="section-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/admin" className="footer-link">
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="footer-link">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/register" className="footer-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Social media section */}
        <div className="footer-section social-section">
          <h4 className="section-title">Connect With Us</h4>
          <div className="social-links">
            {/* GitHub link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <FaGithub className="social-icon" />
            </a>
            {/* Twitter link */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Twitter"
            >
              <FaTwitter className="social-icon" />
            </a>
            {/* LinkedIn link */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="social-icon" />
            </a>
            {/* Facebook link */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <FaFacebook className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
