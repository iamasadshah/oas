// Import required dependencies
const jwt = require("jsonwebtoken"); // For JWT token verification
const User = require("../models/User"); // User model for database queries

/**
 * Middleware to verify if the user is an admin
 * This middleware checks the JWT token and verifies the user's role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const verifyAdmin = async (req, res, next) => {
  // Extract token from Authorization header (Bearer token)
  const token = req.headers.authorization?.split(" ")[1];

  // Check if token exists
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in database using the decoded user ID
    const user = await User.findById(decoded.id);

    // Check if user has admin role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Attach user object to request for use in route handlers
    req.user = user;

    // Proceed to next middleware/route handler
    next();
  } catch (err) {
    // Handle any errors during token verification or user lookup
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Export the middleware function
module.exports = { verifyAdmin };
