const mongoose = require("mongoose");

const dischargeDetailSchema = new mongoose.Schema({
  note_id: {
    type: Number,
    unique: true, //change it to ref
    required: true,
  },
  subject_id: {
    type: Number,
    ref: "Patients", // Assuming there's a Patients model
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
  field_ordinal: {
    type: Number,
    required: true,
  },
});

const DischargeDetail = mongoose.model("discharge-dtail", dischargeDetailSchema);

module.exports = DischargeDetail;
