const mongoose = require("mongoose");

const drgCodesSchema = new mongoose.Schema({
  // rowID: {
  //   type: Number,
  //   required: true,
  //   unique: true, // Designate rowID as the primary key (auto-incrementing)
  // },
  drg_type: { type: String, required: true },
  drg_code: { type: String, required: true },
  description: { type: String, required: true },
  drg_severity: { type: String, required: true },
  drg_mortality: { type: String, required: true },
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "Patient" model
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
});

const DRGCodes = mongoose.model("DRGCodes", drgCodesSchema);

module.exports = DRGCodes;
