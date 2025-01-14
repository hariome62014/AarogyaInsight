const mongoose = require("mongoose");

const emarSchema = new mongoose.Schema({
  emar_id: {
    type: Number,
    required: true,
    unique: true, // Designate emar_id as the primary key
  },
  emar_seq: { type: Number, required: true },
  poe_id: { type: Number, required: true },
  pharmacy_id: { type: Number, required: true },
  enter_provider_id: { type: Number, required: true },
  chart_time: { type: String, required: true },
  medication: { type: String, required: true },
  event_txt: { type: String, required: true },
  schedule_time: { type: String, required: true },
  store_time: { type: String, required: true },
  subject_id: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Patients", // Reference to the "Patient" model
    required: true,
  },
  hadm_id: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
});

const EMAR = mongoose.model("EMAR", emarSchema);

module.exports = EMAR;
