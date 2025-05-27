// Import mongoose for schema definition
const mongoose = require("mongoose");

// Define Attendance Schema
const AttendanceSchema = new mongoose.Schema({
  // Reference to the User model (foreign key)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Date of attendance record (required field)
  date: { type: String, required: true },

  // Attendance status with predefined options
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"], // Only these values are allowed
    default: "Present", // Default status if not specified
  },
});

// Export the Attendance model
module.exports = mongoose.model("Attendance", AttendanceSchema);
