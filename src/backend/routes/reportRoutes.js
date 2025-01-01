const express = require("express");
const multer = require("multer");
const path = require("path");
const Report = require("../models/Report");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST /api/report - Handle report submission
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { woundDetails, location } = req.body;
    const locationParsed = JSON.parse(location);

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const newReport = new Report({
      photo: req.file.path,
      woundDetails,
      location: locationParsed,
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/report - Fetch all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ reportedAt: -1 }); // Get reports sorted by the most recent
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/report/:id - Fetch a specific report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reportId = req.params.id;

    // Find the report by ID and delete it
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    console.log(`Report with ID ${reportId} deleted successfully`);
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /api/report/approved/count - Fetch the total number of approved reports
router.get("/approved/count", async (req, res) => {
  try {
    const count = await Report.countDocuments({ isApproved: true }); // Filter by approved requests
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /api/report/count - Fetch the total number of reports
router.get("/count", async (req, res) => {
  console.log("Fetching total report count...");
  try {
    const count = await Report.countDocuments();
    console.log("Total count fetched:", count);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching report count:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
