// Import React and ReactDOM for rendering
import React from "react";
import ReactDOM from "react-dom/client";

// Import global styles and main App component
import "./index.css";
import App from "./App";

// Import performance monitoring utility
import reportWebVitals from "./reportWebVitals";

// Create root element for React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  // StrictMode helps identify potential problems in the application
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring setup
// This can be used to measure and analyze application performance
// For more information: https://bit.ly/CRA-vitals
reportWebVitals();
