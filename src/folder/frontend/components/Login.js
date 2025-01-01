import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../css/Login.css";
import Navbar from "./Navbar";

const Login = ({ updateAdminStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/adminlogin",
        {
          email: username, // You are using 'email' instead of 'username'
          password,
        }
      );

      alert("Login Successful!");
      localStorage.setItem("token", response.data.token); // Save token to localStorage

      // Update admin status in parent component (App)
      updateAdminStatus(true);

      // Navigate to the admin dashboard after successful login
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (<> <Navbar/>
    <div className="login-container">
       
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
            <span className="icon">&#128100;</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <span className="icon">&#128274;</span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
