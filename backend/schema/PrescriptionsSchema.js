const mongoose = require("mongoose");

const prescriptionsSchema = new mongoose.Schema({
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
  poe_id: {
    type: String,
    ref: "Poe", // Reference to the "POE" model
    required: true,
  },
  poe_seq: {
    type: Number,
    ref: "Poe",
    required: true,
  },
  order_provider_id: {
    type: String,
    required: true,
  },
  starttime: {
    type: Date,
    required: true,
  },
  stoptime: {
    type: Date,
    required: true,
  },
  drug_type: {
    type: String,
    required: true,
  },
  drug: {
    type: String,
    required: true,
  },
  formulary_drug_cd: {
    type: String,
    required: true,
  },
  gsn: {
    type: String,
    required: true,
  },
  ndc: {
    type: String,
    required: true,
  },
  prod_strength: {
    type: String,
    required: true,
  },
  form_rx: {
    type: String,
    required: true,
  },
  dose_val_rx: {
    type: String,
    required: true,
  },
  dose_unit_rx: {
    type: String,
    required: true,
  },
  form_val_disp: {
    type: String,
    required: true,
  },
  form_unit_disp: {
    type: String,
    required: true,
  },
  doses_per_24_hrs: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  // Add more fields for the rest of the form data
});

const Prescriptions = mongoose.model("Prescriptions", prescriptionsSchema);

module.exports = Prescriptions;
