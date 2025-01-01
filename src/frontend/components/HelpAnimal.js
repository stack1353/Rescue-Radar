import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing map marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const HelpAnimal = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [woundDetails, setWoundDetails] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });

  // Handle file upload
  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  // Get user's current location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          alert("Unable to fetch location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
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
        setIsPopupOpen(false); // Close popup after submission
      } else {
        alert("Failed to submit the report.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
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

              {/* Location Fetch */}
              <div style={popupStyles.field}>
                <label>Location:</label>
                {location.lat && location.lon ? (
                  <>
                    <p>
                      Latitude: {location.lat}, Longitude: {location.lon}
                    </p>
                    {/* Map Display */}
                    <MapContainer
                      center={[location.lat, location.lon]}
                      zoom={13}
                      style={{ height: "200px", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[location.lat, location.lon]}>
                        <Popup>Your Current Location</Popup>
                      </Marker>
                    </MapContainer>
                  </>
                ) : (
                  <button type="button" onClick={fetchLocation}>
                    Get Current Location
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <div style={popupStyles.actions}>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
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
