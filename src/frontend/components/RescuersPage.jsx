import React, { useState, useEffect } from "react";
import axios from "axios";

const RescuersPage = () => {
  const [rescues, setRescues] = useState([]);
  const [error, setError] = useState(null);

  // Fetch rescue requests when the component mounts
  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rescuers");
        setRescues(response.data);
      } catch (err) {
        setError("Failed to fetch rescue requests");
      }
    };

    fetchRescues();
  }, []);

  const handleViewLocation = (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, "_blank");
  };

  return (
    <div className="rescuer-page">
      <h1>OUR RESCUERS</h1>
      {error && <p className="error">{error}</p>}

      <div className="table-container">
        <table className="rescuer-table">
          <thead>
            <tr>
              <th>Rescuer Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Availability</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {rescues.map((rescue) => (
              <tr key={rescue._id}>
                <td>{rescue.rescuerName}</td>
                <td>{rescue.email}</td>
                <td>{rescue.contact}</td>
                <td>{rescue.availability}</td>
                <td>{rescue.category}</td>
                <td>{rescue.subcategory}</td>
                <td>
                  <button
                    className="view-location-button"
                    onClick={() => handleViewLocation(rescue.location.lat, rescue.location.lon)}
                  >
                    View Location
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline CSS Styling */}
      <style jsx>{`
        .rescuer-page {
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

        .rescuer-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .rescuer-table th,
        .rescuer-table td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd;
        }

        .rescuer-table th {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }

        .rescuer-table td {
          background-color: #f9f9f9;
        }

        .rescuer-table tr:nth-child(even) td {
          background-color: #f1f1f1;
        }

        .rescuer-table tr:hover {
          background-color: #f0f0f0;
        }

        .view-location-button {
          padding: 8px 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .view-location-button:hover {
          background-color: #218838;
        }

        .error {
          color: red;
          font-weight: bold;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default RescuersPage;
