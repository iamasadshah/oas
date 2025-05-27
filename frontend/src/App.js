// Import React and routing dependencies
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import page components
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Overview from "./pages/OverviewPage/Overview";
import AdminDashboard from "./pages/AdminDashboardPage/AdminDashboard";

// Import layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import styles and context
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

/**
 * Main App Component
 * Sets up the application structure with routing and authentication
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    // Wrap the entire app with AuthProvider for authentication context
    <AuthProvider>
      <div className="app-container">
        {/* Set up React Router for navigation */}
        <Router>
          {/* Navigation bar component */}
          <Navbar />

          {/* Main content wrapper */}
          <div className="content-wrap">
            {/* Define application routes */}
            <Routes>
              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Main application routes */}
              <Route path="/" element={<Overview />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>

          {/* Footer component */}
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
