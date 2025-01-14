const mongoose = require("mongoose");

const poeDetailsSchema = new mongoose.Schema({
  poe_id: {
    type: String,
    ref: "Poe", // Reference to the "Poe" model
    required: true,
  },
  poe_seq: {
    type: String,
    ref: "Poe", // Reference to the "Poe" model
    required: true,
  },
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "Patient" model
    required: true,
  },
  field_name: {
    type: String,
    required: true,
  },
  field_value: {
    type: String,
    required: true,
  },
  // Add more fields for the rest of the form data
});

const PoeDetails = mongoose.model("PoeDetails", poeDetailsSchema);

module.exports = PoeDetails;
