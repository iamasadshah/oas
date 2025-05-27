import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { FaCalendarAlt, FaUser, FaEnvelope, FaChartBar } from "react-icons/fa";
import "./Overview.css";

/**
 * Overview Component
 * Displays user's attendance overview with summary statistics and daily records
 * @returns {JSX.Element} Overview dashboard
 */
function Overview() {
  // State management for attendance data and UI
  const [summary, setSummary] = useState({});
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Effect to fetch attendance data on component mount and filter changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      navigate("/login");
      return;
    }

    /**
     * Fetch attendance summary for the selected period
     * @param {string} userId - User's unique identifier
     */
    const fetchAttendanceSummary = (userId) => {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/attendance/summary/${userId}`, {
          params: { year: selectedYear, month: selectedMonth },
        })
        .then(({ data }) => {
          setSummary(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching attendance summary:", err);
          alert("Failed to fetch attendance data. Please try again later.");
          setLoading(false);
        });
    };

    /**
     * Fetch daily attendance records for the selected period
     * @param {string} userId - User's unique identifier
     */
    const fetchDailyAttendance = (userId) => {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/attendance/details/${userId}`, {
          params: { year: selectedYear, month: selectedMonth },
        })
        .then(({ data }) => {
          setAttendanceDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(
            "Error fetching daily attendance:",
            err.response?.data || err.message
          );
          setLoading(false);
        });
    };

    try {
      const userId = jwtDecode(token).id;
      fetchAttendanceSummary(userId);
      fetchDailyAttendance(userId);
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login");
    }
  }, [selectedMonth, selectedYear, navigate]);

  /**
   * Generate array of all days in the selected month with attendance status
   * @returns {Array} Array of day objects with date and status
   */
  const getAllDaysOfMonth = () => {
    const daysInMonth = moment(
      `${selectedYear}-${selectedMonth}`,
      "YYYY-MM"
    ).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const date = moment(
        `${selectedYear}-${selectedMonth}-${index + 1}`,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD");
      const record = attendanceDetails.find(
        (att) => moment(att.date).format("YYYY-MM-DD") === date
      );
      return { date, status: record ? record.status : "No Record" };
    });
  };

  /**
   * Get CSS class name based on attendance status
   * @param {string} status - Attendance status
   * @returns {string} CSS class name
   */
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "status-present";
      case "absent":
        return "status-absent";
      case "leave":
        return "status-leave";
      default:
        return "status-no-record";
    }
  };

  return (
    <div className="overview-container">
      {/* Header section with filters */}
      <div className="overview-header">
        <h2>Attendance Overview</h2>
        <div className="filter-container">
          {/* Year filter */}
          <div className="filter-group">
            <label>Year</label>
            <div className="filter-select-container">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
              >
                {[2023, 2024, 2025].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Month filter */}
          <div className="filter-group">
            <label>Month</label>
            <div className="filter-select-container">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="filter-select"
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <option
                    key={index}
                    value={String(index + 1).padStart(2, "0")}
                  >
                    {moment().month(index).format("MMMM")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading attendance data...</p>
        </div>
      ) : (
        <>
          {/* Summary cards section */}
          <div className="summary-section">
            {/* User information card */}
            <div className="summary-card">
              <div className="summary-header">
                <FaUser className="summary-icon" />
                <h3>User Information</h3>
              </div>
              <div className="summary-content">
                <p>
                  <strong>Name:</strong> {summary.userName}
                </p>
                <p>
                  <strong>Email:</strong> {summary.userEmail}
                </p>
              </div>
            </div>

            {/* Period information card */}
            <div className="summary-card">
              <div className="summary-header">
                <FaCalendarAlt className="summary-icon" />
                <h3>Period</h3>
              </div>
              <div className="summary-content">
                <p>
                  <strong>Year:</strong> {selectedYear}
                </p>
                <p>
                  <strong>Month:</strong>{" "}
                  {moment(selectedMonth, "MM").format("MMMM")}
                </p>
              </div>
            </div>

            {/* Attendance summary card */}
            <div className="summary-card">
              <div className="summary-header">
                <FaChartBar className="summary-icon" />
                <h3>Attendance Summary</h3>
              </div>
              <div className="summary-content">
                <p>
                  <strong>Present Days:</strong> {summary.presentDays || 0}
                </p>
                <p>
                  <strong>Absent Days:</strong> {summary.absentDays || 0}
                </p>
                <p>
                  <strong>Leave Days:</strong> {summary.leaveDays || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Daily attendance records section */}
          <div className="attendance-details-section">
            <h3>Daily Attendance Records</h3>
            <div className="attendance-table-container">
              <div className="scrollable-table">
                <table className="attendance-detail-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllDaysOfMonth().map((record, index) => (
                      <tr key={index}>
                        <td>{moment(record.date).format("MMMM D, YYYY")}</td>
                        <td>
                          <span
                            className={`status-badge ${getStatusClass(
                              record.status
                            )}`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Overview;
