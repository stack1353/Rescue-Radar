// routes/rescues.js
const express = require("express");
const RescueRequest = require("../models/RescueRequest");

const router = express.Router();

// Route to get all rescue requests (GET)
router.get("/", async (req, res) => {
  try {
    const rescues = await RescueRequest.find(); // Fetch all rescue requests from the database
    res.status(200).json(rescues); // Return the rescue requests as a JSON response
  } catch (error) {
    console.error("Error fetching rescue requests:", error);
    res.status(500).json({ message: "Failed to fetch rescue requests" }); // Return an error if fetching fails
  }
});

// Route to create a new rescue request (POST)
// Route to create a new rescue request (POST)
router.post("/", async (req, res) => {
  try {
    // Create a new rescue request with the provided data from req.body
    const newRescue = new RescueRequest(req.body);

    // Save the new rescue request to the database
    await newRescue.save();

    // Send the created rescue request as a response
    res.status(201).json(newRescue);
  } catch (error) {
    console.error("Error creating new rescue request:", error);
    res.status(500).json({ message: "Failed to create rescue request" });
  }
});

module.exports = router;
