const mongoose = require("mongoose");

const datetimeEventsSchema = new mongoose.Schema({
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
  caregiver_id: {
    type: String,
    ref: "Caregivers", // Reference to the "Caregiver" model
    required: true,
  },
  charttime: {
    type: Date,
    required: true,
  },
  storetime: {
    type: Date,
    required: true,
  },
  itemid: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  valueuom: {
    type: String,
    required: true,
  },
  warning: {
    type: String,
  },
  // Add more fields for additional data
});

const DateTimeEvents = mongoose.model("DateTimeEvents", datetimeEventsSchema);

module.exports = DateTimeEvents;
