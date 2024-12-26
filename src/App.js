import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./frontend/components/Navbar";
import AnimalRescueLanding from "./frontend/components/AnimalRescueLanding";
import Login from "./frontend/components/Login";
import ServicePage from "./frontend/components/ServicePage";
import AboutUsPage from "./frontend/components/AboutUsPage";
import Register from "./frontend/components/Register";
import AdminDashboard from "./frontend/components/AdminDashboard";
import RescuersPage from "./frontend/components/RescuersPage";
import AdminNavbar from "./frontend/components/AdminNavbar";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is logged in and if the token is valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT to extract role
        if (decoded.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []); // This effect runs on mount to check the token once

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsAdmin(false); // Log out by clearing the token and resetting the state
  };

  return (
    <div className="App">
      <NavbarWithConditionalRender isAdmin={isAdmin} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<AnimalRescueLanding />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login updateAdminStatus={setIsAdmin} />}
        />

        {/* Admin Routes without ProtectedRoute */}
        {isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/rescuers" element={<RescuersPage />} />
          </>
        )}

        {/* Redirect to login if not admin */}
        {!isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<Login />} />
            <Route path="/admin/rescuers" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
};

const NavbarWithConditionalRender = ({ isAdmin, onLogout }) => {
  // Conditionally render navbar based on admin status
  if (window.location.pathname === "/login") {
    return null; // No navbar on the login page
  }

  return (
    <div>
      {isAdmin ? (
        <AdminNavbar onLogout={onLogout} /> // Pass logout function to AdminNavbar
      ) : (
        <Navbar />
      )}
    </div>
  );
};

export default App;
