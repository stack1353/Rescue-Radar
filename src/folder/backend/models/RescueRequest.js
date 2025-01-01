const mongoose = require("mongoose");
const rescueRequestSchema = new mongoose.Schema({
  rescuerName: { type: String, required: true },
  email: { type: String, required: true }, // Add email field
  contact: { type: String, required: true },
  availability: { type: String, default: "Available" },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  loggedDate: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
  action: { type: String, default: "Pending" },
});

const RescueRequest = mongoose.model("RescueRequest", rescueRequestSchema);

module.exports = RescueRequest;
