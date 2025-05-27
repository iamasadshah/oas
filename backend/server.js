// Load environment variables from .env.local file
require("dotenv").config({ path: ".env.local" });

// Import required dependencies
const express = require("express"); // Web framework for Node.js
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Enable Cross-Origin Resource Sharing

// Initialize Express application
const app = express();

// Middleware configuration
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection Configuration
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
  })
  .then(() => console.log("MongoDB Connected")) // Log successful connection
  .catch((err) => console.log("Error: " + err)); // Log connection errors

// API Routes Configuration
app.use("/api/auth", require("./routes/auth")); // Authentication routes
app.use("/api/attendance", require("./routes/attendance")); // Attendance management routes
app.use("/api/admin", require("./routes/admin")); // Admin management routes

// Server Configuration
const PORT = process.env.PORT || 5000; // Use environment PORT or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server
