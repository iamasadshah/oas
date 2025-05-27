// Import required dependencies
const express = require("express"); // Express framework
const Attendance = require("../models/Attendance"); // Attendance model
const User = require("../models/User"); // User model
const router = express.Router(); // Create Express router

/**
 * Mark attendance for a user
 * POST /api/attendance
 * @body {string} userId - ID of the user
 * @body {string} status - Attendance status (Present/Absent/Leave)
 */
router.post("/", async (req, res) => {
  const { userId, status } = req.body;
  const attendance = new Attendance({ userId, status });
  await attendance.save();

  res.json({ message: "Attendance marked" });
});

/**
 * Get all attendance records for a user
 * GET /api/attendance/:userId
 * @param {string} userId - ID of the user
 */
router.get("/:userId", async (req, res) => {
  const attendance = await Attendance.find({ userId: req.params.userId });
  res.json(attendance);
});

/**
 * Get monthly attendance summary for a user
 * GET /api/attendance/summary/:userId
 * @param {string} userId - ID of the user
 * @query {string} year - Year for the summary
 * @query {string} month - Month for the summary
 */
router.get("/summary/:userId", async (req, res) => {
  const { userId } = req.params;
  const { year, month } = req.query;

  try {
    // Validate required parameters
    if (!year || !month) {
      return res.status(400).json({ message: "Year and Month are required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate date range for the month
    const startDate = new Date(`${year}-${month}-01`)
      .toISOString()
      .slice(0, 10);
    const endDate = new Date(`${year}-${month}-31`).toISOString().slice(0, 10);

    // Fetch attendance records for the date range
    const attendanceRecords = await Attendance.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    // Calculate attendance statistics
    const presentDays = attendanceRecords.filter(
      (record) => record.status.trim().toLowerCase() === "present"
    ).length;
    const absentDays = attendanceRecords.filter(
      (record) => record.status.trim().toLowerCase() === "absent"
    ).length;
    const leaveDays = attendanceRecords.filter(
      (record) => record.status.trim().toLowerCase() === "leave"
    ).length;

    // Return summary data
    res.json({
      userName: user.name,
      userEmail: user.email,
      year,
      month,
      presentDays,
      absentDays,
      leaveDays,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

/**
 * Get detailed attendance records for a user
 * GET /api/attendance/details/:userId
 * @param {string} userId - ID of the user
 * @query {string} year - Year for the records
 * @query {string} month - Month for the records
 */
router.get("/details/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.query;

    // Validate required parameters
    if (!userId || !year || !month) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    // Parse and validate year and month
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);

    if (isNaN(y) || isNaN(m) || m < 1 || m > 12) {
      return res.status(400).json({ error: "Invalid year or month format" });
    }

    // Calculate date range for the month
    const startDate = `${y}-${String(m).padStart(2, "0")}-01`;
    const endDate = `${y}-${String(m + 1).padStart(2, "0")}-01`;

    console.log(`Querying MongoDB from: ${startDate} to ${endDate}`);

    // Fetch and sort attendance records
    const records = await Attendance.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    }).sort({ date: 1 });

    console.log("Fetched Records:", records);

    res.json(records);
  } catch (error) {
    console.error("Server Error Fetching Attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
});

// Export the router
module.exports = router;
