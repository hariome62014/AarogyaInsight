const mongoose = require("mongoose");

const transfersSchema = new mongoose.Schema({
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
  transfer_id: {
    type: String,
    required: true,
  },
  eventtype: {
    type: String,
    required: true,
  },
  careunit: {
    type: String,
    required: true,
  },
  intime: {
    type: Date,
    required: true,
  },
  outtime: {
    type: Date,
    required: true,
  },
  // Add more fields for additional data related to transfers if needed
});

const Transfers = mongoose.model("Transfers", transfersSchema);

module.exports = Transfers;
