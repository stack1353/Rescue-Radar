import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  // Fetch reports when the component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/report");
        setReports(response.data);
      } catch (err) {
        setError("Failed to fetch reports");
      }
    };

    fetchReports();
  }, []);

  // Handle deleting a report
  const handleComplete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/report/${id}`);
      // Remove the report from the UI after deletion
      setReports((prevReports) => prevReports.filter((report) => report._id !== id));
    } catch (err) {
      setError("Failed to delete report");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Wound Details</th>
              <th>Location</th>
              <th>Reported At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report._id}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${report.photo}`}
                    alt="Report Photo"
                    className="report-photo"
                  />
                </td>
                <td>{report.woundDetails}</td>
                <td>
                  Lat: {report.location.lat}, Lon: {report.location.lon}
                </td>
                <td>{new Date(report.reportedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="complete-btn"
                    onClick={() => handleComplete(report._id)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .admin-dashboard {
          padding: 20px;
          background-color: #f9f9f9;
          min-height: 100vh;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }

        .table-container {
          overflow-x: auto;
        }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .reports-table th,
        .reports-table td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd;
        }

        .reports-table th {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }

        .reports-table td {
          background-color: #f9f9f9;
        }

        .reports-table tr:nth-child(even) td {
          background-color: #f1f1f1;
        }

        .report-photo {
          width: 100px;
          height: auto;
          border-radius: 5px;
        }

        .error {
          color: red;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .complete-btn {
          padding: 8px 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .complete-btn:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
