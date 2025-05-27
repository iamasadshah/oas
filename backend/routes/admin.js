// Import required dependencies
const express = require("express"); // Express framework
const Attendance = require("../models/Attendance"); // Attendance model
const User = require("../models/User"); // User model
const { verifyAdmin } = require("../middleware/auth"); // Admin verification middleware

// Create Express router
const router = express.Router();

/**
 * Get all users
 * GET /api/admin/users
 * @requires Admin authentication
 */
router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/**
 * Update user details
 * PUT /api/admin/user/:id
 * @requires Admin authentication
 * @param {string} id - User ID
 * @body {Object} - Updated user details
 */
router.put("/user/:id", verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User details updated" });
});

/**
 * Get attendance records for a specific user and date
 * GET /api/admin/attendance
 * @requires Admin authentication
 * @query {string} userId - User ID
 * @query {string} date - Date of attendance
 */
router.get("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date } = req.query;
  try {
    const attendance = await Attendance.find({ userId, date });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * Add or update attendance record
 * POST /api/admin/attendance
 * @requires Admin authentication
 * @body {string} userId - User ID
 * @body {string} date - Date of attendance
 * @body {string} status - Attendance status
 */
router.post("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date, status } = req.body;
  try {
    // Check for existing record
    const existingRecord = await Attendance.findOne({ userId, date });

    if (existingRecord) {
      // Update existing record
      existingRecord.status = status;
      await existingRecord.save();
      return res.json({ message: "Attendance updated" });
    }

    // Create new record
    const newAttendance = new Attendance({ userId, date, status });
    await newAttendance.save();
    res.json({ message: "Attendance added" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * Get all attendance records for a user
 * GET /api/admin/attendance/all
 * @requires Admin authentication
 * @query {string} userId - User ID
 */
router.get("/attendance/all", verifyAdmin, async (req, res) => {
  const { userId } = req.query;
  try {
    const attendanceRecords = await Attendance.find({ userId }).sort({
      date: -1,
    });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * Delete attendance record
 * DELETE /api/admin/attendance/:id
 * @requires Admin authentication
 * @param {string} id - Attendance record ID
 */
router.delete("/attendance/:id", verifyAdmin, async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * Delete user and their attendance records
 * DELETE /api/admin/users/:id
 * @param {string} id - User ID
 */
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete all attendance records for the user
    await Attendance.deleteMany({ userId });

    res.json({
      message: "User and their attendance records deleted successfully!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete user and attendance records" });
  }
});

/**
 * Update user role
 * PUT /api/admin/users/:id/role
 * @param {string} id - User ID
 * @body {string} role - New role (admin/employee)
 */
router.put("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  // Validate role
  if (!["admin", "employee"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

// Export the router
module.exports = router;
