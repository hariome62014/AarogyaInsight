const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
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
  transfertime: {
    type: Date,
    required: true,
  },
  prev_service: {
    type: String,
    required: true,
  },
  cur_service: {
    type: String,
    required: true,
  },
  // Add more fields for additional data related to services if needed
});

const Services = mongoose.model("Services", servicesSchema);

module.exports = Services;
