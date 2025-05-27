// Import mongoose for schema definition
const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  // User's full name (required field)
  name: { type: String, required: true },

  // User's email address (required and must be unique)
  email: { type: String, required: true, unique: true },

  // User's password (required field, will be hashed before saving)
  password: { type: String, required: true },

  // User's role in the system (either 'admin' or 'employee', defaults to 'employee')
  role: { type: String, enum: ["admin", "employee"], default: "employee" },
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
