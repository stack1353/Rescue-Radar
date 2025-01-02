import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Rescuer = ({ isOpen, onClose }) => {
  const [rescuerName, setRescuerName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [category, setCategory] = useState("Domestic");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });

  const subcategories = {
    Domestic: ["Dog", "Cat", "Bird", "Other"],
    Wild: ["Snake", "Deer", "Elephant", "Other"],
  };

  // Custom hook to set location by clicking on the map
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
        });
      },
    });

    return location.lat && location.lon ? (
      <Marker position={[location.lat, location.lon]} />
    ) : null;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rescuerName || !email || !contact || !subcategory || !location.lat || !location.lon) {
      alert("Please fill in all the required fields.");
      return;
    }

    const rescuerData = {
      rescuerName,
      email,
      contact,
      availability,
      category,
      subcategory,
      location,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rescuers",
        rescuerData
      );
      console.log("Rescuer Data Submitted:", response.data);
      alert("Thank you for updating your details!");
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error submitting rescuer data:", error);
      alert("Error submitting rescuer data. Please try again.");
    }
  };

  if (!isOpen) return null; // Do not render if not open

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <h2>Rescuer Information</h2>
        <form onSubmit={handleSubmit}>
          <div style={popupStyles.field}>
            <label>Rescuer Name:</label>
            <input
              type="text"
              value={rescuerName}
              onChange={(e) => setRescuerName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div style={popupStyles.field}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={popupStyles.field}>
            <label>Contact Number:</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div style={popupStyles.field}>
            <label>Availability:</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div style={popupStyles.field}>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(""); // Reset subcategory when category changes
              }}
            >
              <option value="Domestic">Domestic</option>
              <option value="Wild">Wild</option>
            </select>
          </div>

          <div style={popupStyles.field}>
            <label>Type:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              {subcategories[category].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div style={popupStyles.field}>
            <label>Location:</label>
            <div style={{ height: "200px", marginBottom: "10px" }}>
              <MapContainer
                center={[12.9716, 77.5946]} // Default to Bangalore's coordinates
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <LocationMarker />
              </MapContainer>
            </div>
            {location.lat && location.lon ? (
              <p>
                Selected Location: Latitude {location.lat}, Longitude {location.lon}
              </p>
            ) : (
              <p>Click on the map to select your location.</p>
            )}
          </div>

          <div style={popupStyles.actions}>
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={onClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "500px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  field: {
    marginBottom: "15px",
  },
  actions: {
    textAlign: "right",
  },
};

export default Rescuer;
