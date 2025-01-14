const mongoose = require("mongoose");

const caregiversSchema = new mongoose.Schema({
  caregiver_id: {
    type: Number,
    required: true,
    unique: true, // Designate caregivers_id as the primary key
  },
  // Add more fields for the rest of the form data
});

const Caregivers = mongoose.model("Caregivers", caregiversSchema);

module.exports = Caregivers;
