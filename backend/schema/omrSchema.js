const mongoose = require("mongoose");

const omrSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "Patient" model
    required: true,
  },
  chartdate: {
    type: Date,
    required: true,
  },
  seq_date: {
    type: Date,
    required: true,
  },
  result_name: {
    type: String,
    required: true,
  },
  result_value: {
    type: String,
    required: true,
  },
});

const OMR = mongoose.model("OMR", omrSchema);

module.exports = OMR;
