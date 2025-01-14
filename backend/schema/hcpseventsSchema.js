const mongoose = require("mongoose");

const hcpseventsSchema = new mongoose.Schema({
  chartdate: {
    type: Date,
    required: true,
  },
  hcps_cd: {
    type: String,
    required: true,
  },
  seq_num: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    ref: "User", // Reference to the "Patient" model
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
});

const HCPSEvents = mongoose.model("HCPSEvents", hcpseventsSchema);

module.exports = HCPSEvents;
