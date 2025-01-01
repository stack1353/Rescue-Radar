import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AdminDashboard = ({ reports = [] }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {reports.length === 0 ? (
        <p>No reports available</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white" }}>
              <th>ID</th>
              <th>Photo</th>
              <th>Wound Details</th>
              <th>Location</th>
              <th>Reported At</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ textAlign: "center" }}>
                <td>{report.id}</td>
                <td>
                  {report.photo ? (
                    <img
                      src={report.photo}
                      alt="Report"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>
                <td>{report.woundDetails || "No Details"}</td>
                <td>
                  {report.location?.lat && report.location?.lon ? (
                    <div>
                      <p>
                        Latitude: {report.location.lat}, Longitude: {report.location.lon}
                      </p>
                      <MapContainer
                        center={[report.location.lat, report.location.lon]}
                        zoom={13}
                        style={{ height: "200px", width: "300px", margin: "auto" }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[report.location.lat, report.location.lon]}>
                          <Popup>
                            Location: {report.location.lat}, {report.location.lon}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  ) : (
                    "Unknown Location"
                  )}
                </td>
                <td>{new Date(report.reportedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
