import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TbListDetails } from "react-icons/tb";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="logo-link">
            <div className="text-logo">
              <span className="logo-text">Online</span>
              <span className="logo-highlight">Attendance</span>
              <span className="logo-text">System</span>
            </div>
          </Link>

          <nav className={`navbar-nav ${isOpen ? "active" : ""}`}>
            <button
              className="close-menu"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <span className="close-icon"></span>
            </button>

            <ul className="nav-list">
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

              {!user ? (
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
                <li className="nav-item">
                  <button className="logout-button" onClick={handleLogout}>
                    <IoLogOutOutline className="nav-icon" />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>

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
