const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Admin credentials (stored in .env for now)
// In a real-world application, this should be stored securely in a database
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD; // Password hash from .env

// Admin Login Route
router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email matches the stored admin email
  if (email !== adminEmail) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (password != adminPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Create JWT token with admin role
  const token = jwt.sign(
    { email: adminEmail, role: "admin" }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "1h" } // Expiry time
  );

  res.status(200).json({ token });
});

module.exports = router;
