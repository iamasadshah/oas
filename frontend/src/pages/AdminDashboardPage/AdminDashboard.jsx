import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaUserCog,
  FaCalendarAlt,
  FaTrash,
  FaSave,
  FaEye,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState("Present");
  const [attendance, setAttendance] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const user = jwtDecode(token);
    if (user.role !== "admin") {
      alert("Access denied. Admins only.");
      return navigate("/");
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("User and their attendance records deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.response?.data);
      alert("Failed to delete user.");
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(`User role updated to ${newRole}!`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error.response?.data);
      alert("Failed to update role.");
    }
  };

  const fetchAttendance = () => {
    axios
      .get("http://localhost:5000/api/admin/attendance", {
        params: {
          userId: selectedUser,
          date: selectedDate.toISOString().split("T")[0],
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => setAttendance(data));
  };

  const addAttendance = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/attendance",
        {
          userId: selectedUser,
          date: selectedDate.toISOString().split("T")[0],
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Attendance saved!");
      fetchAttendance();
    } catch (error) {
      console.error("Error saving attendance:", error.response?.data);
      alert("Failed to save attendance");
    }
  };

  const fetchAllAttendance = () => {
    axios
      .get("http://localhost:5000/api/admin/attendance/all", {
        params: { userId: selectedUser },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setAttendance(data);
        setShowAttendance(true);
      })
      .catch((err) => {
        console.error("Error fetching attendance:", err.response?.data);
        alert("Failed to fetch attendance records");
      });
  };

  const deleteAttendance = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Attendance deleted!");
      fetchAttendance();
    } catch (error) {
      console.error("Error deleting attendance:", error.response?.data);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <section className="dashboard-section">
          <div className="section-header">
            <FaUserCog className="section-icon" />
            <h2>User Management</h2>
          </div>

          <div className="users-table-container">
            {users && (
              <div className="users-table-wrapper">
                {users.length === 0 ? (
                  <div className="no-data-message">No users found!</div>
                ) : (
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <select
                              value={user.role}
                              onChange={(e) =>
                                changeUserRole(user._id, e.target.value)
                              }
                              className="role-select"
                            >
                              <option value="employee">Employee</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="delete-button"
                              onClick={() => deleteUser(user._id)}
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <FaCalendarAlt className="section-icon" />
            <h2>Attendance Management</h2>
          </div>

          <div className="attendance-controls">
            <div className="form-group">
              <div className="input-group">
                <label>Select User</label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setSelectedUser(selectedId);
                    const user = users.find((user) => user._id === selectedId);
                    setSelectedUserName(user ? user.name : "");
                    setAttendance([]);
                    setShowAttendance(false);
                  }}
                >
                  <option value="">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Select Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="form-select"
                />
              </div>

              <div className="input-group">
                <label>Status</label>
                <select
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
            </div>

            <div className="button-group">
              <button className="action-button save" onClick={addAttendance}>
                <FaSave /> Save Attendance
              </button>
              <button
                className="action-button view"
                onClick={fetchAllAttendance}
              >
                <FaEye /> View Records
              </button>
            </div>
          </div>

          {showAttendance && (
            <div className="attendance-records">
              <h3 className="records-title">
                Attendance Records for {selectedUserName || "Selected User"}
              </h3>
              <div className="records-container">
                {attendance.length === 0 ? (
                  <div className="no-data-message">
                    No attendance records found!
                  </div>
                ) : (
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((record) => (
                        <tr key={record._id}>
                          <td>{new Date(record.date).toLocaleDateString()}</td>
                          <td>
                            <span
                              className={`status-badge ${record.status.toLowerCase()}`}
                            >
                              {record.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="delete-button"
                              onClick={() => deleteAttendance(record._id)}
                              title="Delete Record"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
