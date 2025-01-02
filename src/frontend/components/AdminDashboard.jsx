import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const redirectToGoogleMaps = (location) => {
    const { lat, lon } = location;
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, "_blank");
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
                  <button
                    className="view-location-btn"
                    onClick={() => setSelectedLocation(report.location)}
                  >
                    View Location
                  </button>
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

      {/* Map Modal */}
      {selectedLocation && (
        <div className="map-modal">
          <div className="map-container">
            <MapContainer
              center={[selectedLocation.lat, selectedLocation.lon]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[selectedLocation.lat, selectedLocation.lon]}
                icon={new L.Icon({
                  iconUrl: require("leaflet/dist/images/marker-icon.png"),
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
                <Popup>
                  <div>
                    <p>Incident Location</p>
                    <button
                      className="google-maps-btn"
                      onClick={() => redirectToGoogleMaps(selectedLocation)}
                    >
                      Open in Google Maps
                    </button>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
            <button
              className="close-map-btn"
              onClick={() => setSelectedLocation(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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

        .complete-btn,
        .view-location-btn {
          padding: 8px 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
        }

        .view-location-btn {
          background-color: #007bff;
        }

        .view-location-btn:hover {
          background-color: #0056b3;
        }

        .complete-btn:hover {
          background-color: #218838;
        }

        .map-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-container {
          position: relative;
          width: 80%;
          max-width: 800px;
          background: white;
          border-radius: 10px;
          padding: 20px;
        }

        .google-maps-btn {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .google-maps-btn:hover {
          background-color: #0056b3;
        }

        .close-map-btn {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .close-map-btn:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
