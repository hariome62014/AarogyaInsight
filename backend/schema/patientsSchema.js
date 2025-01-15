const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  SUBJECT_ID: {
    type: String,
    required: true,
    unique: true,
  },
  GENDER: {
    type: String,
  },
  anchor_age: {
    type: Number,
  },
  anchor_year: {
    type: Number,
  },
  anchor_year_group: {
    type: String,
  },
  dod: {
    type: Date,
  },
});

const Patients = mongoose.model("Patients", patientsSchema);

module.exports = Patients;
