const mongoose = require("mongoose");

const radiologyDetailsSchema = new mongoose.Schema({
  note_id: {
    type: Number,
    unique: true, //ref. 
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

const RadiologyDetails = mongoose.model("RadiologyDetails", radiologyDetailsSchema);

module.exports = RadiologyDetails;
