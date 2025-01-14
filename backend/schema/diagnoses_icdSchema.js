const mongoose = require("mongoose");

const diagnosesICDSchema = new mongoose.Schema({
  // rowId: {
  //   type: Number,
  //   required: true,
  //   unique: true, // Designate rowId as the primary key (auto-incrementing)
  // },
  seq_no: { type: Number, required: true },
  icd_code: { type: String, required: true },
  icd_version: { type: String, required: true },
  subject_id: {
    type: String,
    required: true,
    ref: "Patients", // Reference to the Patient model
  },
  hadm_id: {
    type: String,
    required: true,
    ref: "Admission", // Reference to the Admission model
  },
});

const DiagnosesICD = mongoose.model("DiagnosesICD", diagnosesICDSchema);

module.exports = DiagnosesICD;
