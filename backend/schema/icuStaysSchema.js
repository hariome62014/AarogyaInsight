const mongoose = require("mongoose");

const icustaysSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "User" model for patients
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
  stay_id: {
    type: String,
    required: true,
  },
  firstcareunit: {
    type: String,
    required: true,
  },
  lastcareunit: {
    type: String,
    required: true,
  },
  intime: {
    type: Date,
    required: true,
  },
  outtime: {
    type: Date,
    required: true,
  },
  los: {
    type: Number,
    required: true,
  },
  // Add more fields for additional data
});

const ICUStays = mongoose.model("ICUStays", icustaysSchema);

module.exports = ICUStays;
