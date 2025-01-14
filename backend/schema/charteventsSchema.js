const mongoose = require("mongoose");

const chartEventsSchema = new mongoose.Schema({
  stay_id: {
    type: String, // You can use the appropriate data type (e.g., Number) based on your data
    required: true,
    unique: true, // Designate stay_id as the primary key
  },
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "User" model (assuming patients are saved as User)
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
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
  item_id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  valuenum: {
    type: Number,
    required: true,
  },
  valueuom: {
    type: String,
    required: true,
  },
  warning: {
    type: String,
    required: true,
  },
  // Add more fields for additional data
});

const ChartEvents = mongoose.model("ChartEvents", chartEventsSchema);

module.exports = ChartEvents;
