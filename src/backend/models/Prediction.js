const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  prediction: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediction", PredictionSchema);