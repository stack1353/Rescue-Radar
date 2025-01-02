import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HelpAnimal = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [woundDetails, setWoundDetails] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [defaultLocation, setDefaultLocation] = useState([13.0827, 80.2707]); // Default to Chennai

  // Fetch user's current location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDefaultLocation([latitude, longitude]);
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Unable to fetch location: " + error.message);
        }
      );
    }
  }, []);

  // Handle file upload
  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!photo || !woundDetails || !location.lat || !location.lon) {
      alert("Please complete all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("woundDetails", woundDetails);
    formData.append("location", JSON.stringify(location));

    try {
      const response = await fetch("http://localhost:5000/api/report", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Report submitted successfully!");
        handleClosePopup(); // Close and reset the form
      } else {
        alert("Failed to submit the report.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  // Handle closing the popup and resetting form
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPhoto(null);
    setWoundDetails("");
    setLocation({ lat: null, lon: null });
  };

  // Component for handling map events
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
      },
    });

    return location.lat && location.lon ? (
      <Marker position={[location.lat, location.lon]}></Marker>
    ) : null;
  };

  return (
    <div>
      {/* Main Button */}
      <button className="action-button" onClick={() => setIsPopupOpen(true)}>
        Help Animal Now
      </button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.popup}>
            <h2>Report Injured Animal</h2>
            <form onSubmit={handleSubmit}>
              {/* Photo Upload */}
              <div style={popupStyles.field}>
                <label>Animal Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  required
                />
              </div>

              {/* Wound Details */}
              <div style={popupStyles.field}>
                <label>Wound Details:</label>
                <textarea
                  value={woundDetails}
                  onChange={(e) => setWoundDetails(e.target.value)}
                  placeholder="Describe the wound or injury"
                  required
                  style={{ width: "100%", height: "60px" }}
                />
              </div>

              {/* Graphical Location Input */}
              <div style={popupStyles.field}>
                <label>Location:</label>
                <div style={{ height: "200px", marginBottom: "15px" }}>
                  <MapContainer
                    center={defaultLocation}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                  </MapContainer>
                </div>
                {location.lat && location.lon ? (
                  <p>
                    Selected Location: Latitude: {location.lat}, Longitude: {location.lon}
                  </p>
                ) : (
                  <p>Please click on the map to select a location.</p>
                )}
              </div>

              {/* Submit Button */}
              <div style={popupStyles.actions}>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the popup
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
    width: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  field: {
    marginBottom: "15px",
  },
  actions: {
    textAlign: "right",
  },
};

export default HelpAnimal;
