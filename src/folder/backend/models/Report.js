const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true, // Path to the uploaded photo
    },
    woundDetails: {
      type: String,
      required: true, // Details of the wound or injury
    },
    location: {
      lat: {
        type: Number,
        required: true, // Latitude of the location
      },
      lon: {
        type: Number,
        required: true, // Longitude of the location
      },
    },
    reportedAt: {
      type: Date,
      default: Date.now, // Automatically store the report's creation date
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
