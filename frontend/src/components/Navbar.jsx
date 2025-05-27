import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TbListDetails } from "react-icons/tb";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

/**
 * Navigation Bar Component
 * Provides responsive navigation with authentication-based menu items
 * @returns {JSX.Element} Navigation bar
 */
const Navbar = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Get user authentication state and logout function
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Handle user logout
   * Logs out user and redirects to login page
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /**
   * Toggle mobile menu
   * Handles menu state and body scroll
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo and brand name */}
          <Link to="/" className="logo-link">
            <div className="text-logo">
              <span className="logo-text">Online</span>
              <span className="logo-highlight">Attendance</span>
              <span className="logo-text">System</span>
            </div>
          </Link>

          {/* Navigation menu */}
          <nav className={`navbar-nav ${isOpen ? "active" : ""}`}>
            {/* Mobile menu close button */}
            <button
              className="close-menu"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <span className="close-icon"></span>
            </button>

            {/* Navigation links */}
            <ul className="nav-list">
              {/* Overview link - visible when user is logged in */}
              {user && (
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <TbListDetails className="nav-icon" />
                    <span>Overview</span>
                  </NavLink>
                </li>
              )}

              {/* Admin link - visible only for admin users */}
              {user?.role === "admin" && (
                <li className="nav-item">
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <MdOutlineAdminPanelSettings className="nav-icon" />
                    <span>Admin</span>
                  </NavLink>
                </li>
              )}

              {/* Authentication links */}
              {!user ? (
                // Show login/register when user is not authenticated
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <IoLogInOutline className="nav-icon" />
                      <span>Login</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <HiOutlineUserAdd className="nav-icon" />
                      <span>Register</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                // Show logout when user is authenticated
                <li className="nav-item">
                  <button className="logout-button" onClick={handleLogout}>
                    <IoLogOutOutline className="nav-icon" />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile menu toggle button */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="menu-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
