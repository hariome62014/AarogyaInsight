const mongoose = require("mongoose");

const proceduresICDSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "User" model
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
  seq_number: {
    type: Number,
    required: true,
  },
  chartdate: {
    type: Date,
    required: true,
  },
  icd_code: {
    type: String,
    required: true,
  },
  icd_version: {
    type: String,
    required: true,
  },
  // Add more fields for the rest of the form data
});

const ProceduresICD = mongoose.model("ProceduresICD", proceduresICDSchema);

module.exports = ProceduresICD;
