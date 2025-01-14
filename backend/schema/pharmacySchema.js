const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
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
  pharmacy_id: {
    type: Number,
    required: true,
    unique: true, // Designate pharmacy_id as the primary key
  },
  poe_id: {
    type: Number,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  stoptime: {
    type: String,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  proc_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  entertime: {
    type: String,
    required: true,
  },
  verifiedtime: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  disp_shed: {
    type: String,
    required: true,
  },
  infusion_type: {
    type: String,
    required: true,
  },
  sliding_scale: {
    type: String,
    required: true,
  },
  lockout_interval: {
    type: String,
    required: true,
  },
  basal_rate: {
    type: String,
    required: true,
  },
  one_hr_max: {
    type: String,
    required: true,
  },
  doses_per_24_hr: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  duration_interval: {
    type: String,
    required: true,
  },
  expiration_value: {
    type: String,
    required: true,
  },
  expiration_unit: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  dispensation: {
    type: String,
    required: true,
  },
  fill_quantity: {
    type: String,
    required: true,
  },
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

module.exports = Pharmacy;
