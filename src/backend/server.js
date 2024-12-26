const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
const rescuersRouter = require("./routes/rescues");
const path = require("path");

const adminRoutes = require("./routes/admin");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and credentials if needed
  })
);

// Middleware to parse JSON and handle file uploads
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/report", reportRoutes);

app.use("/api/rescuers", rescuersRouter);

// Authentication routes
app.use("/api/admin", adminRoutes); // Admin-specific routes

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
