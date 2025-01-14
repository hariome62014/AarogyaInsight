const mongoose = require("mongoose");

const dischargeSchema = new mongoose.Schema({
  note_id: {
    type: Number,
    unique: true,
    required: true,
  },
  subject_id: {
    type: Number,
    ref: "Patients", // Assuming there's a Patients model
    required: true,
  },
  hadm_id: {
    type: Number,
    ref: "Admission", // Assuming there's an Admission model
    required: true,
  },
  note_type: {
    type: String,
    required: true,
  },
  note_seq: {
    type: Number,
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
  text: {
    type: String,
    required: true,
  },
});

const Discharge = mongoose.model("Discharge", dischargeSchema);

module.exports = Discharge;
