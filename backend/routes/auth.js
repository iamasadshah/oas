// Import required dependencies
const express = require("express"); // Express framework
const bcrypt = require("bcryptjs"); // Password hashing
const jwt = require("jsonwebtoken"); // JWT token generation
const User = require("../models/User"); // User model

// Create Express router
const router = express.Router();

/**
 * Register a new user
 * POST /api/auth/register
 * @body {string} name - User's full name
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @body {string} role - User's role (admin/employee)
 */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Login user
 * POST /api/auth/login
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @returns {Object} JWT token for authentication
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Verify password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );

  res.json({ token });
});

// Export the router
module.exports = router;
