const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
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
