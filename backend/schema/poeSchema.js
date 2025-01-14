const mongoose = require("mongoose");

const poeSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    ref: "Patients",
    required: true,
  },
  hadm_id: {
    type: String,
    ref:"Admission",
    required: true,
  },
  poe_id: {
    type: String,
    required: true,
    unique: true, // Designate poe_id as the primary key
  },
  poe_seq: { type: String, required: true },
  ordertime: { type: String, required: true },
  order_type: { type: String, required: true },
  order_subtype: { type: String, required: true },
  transaction_type: { type: String, required: true },
  discontinue_of_poe_id: { type: String, required: true },
  discontinued_by_poe_id: { type: String, required: true },
  order_provider_id: { type: String, required: true },
  order_status: { type: String, required: true },
  // Add more fields for the rest of the form data
});

const Poe = mongoose.model("Poe", poeSchema);

module.exports = Poe;
