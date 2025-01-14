const mongoose = require("mongoose");

const outputEventsSchema = new mongoose.Schema({
  charttime: {
    type: Date,
    required: true,
  },
  storetime: {
    type: Date,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  valueuom: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    ref: "User", // Reference to the "User" model
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
  stay_id: {
    type: String,
    ref: "ICUStays", // Reference to the "ICUStays" model
    required: true,
  },
  itemid: {
    type: String,
    ref: "DItems", // Reference to the "DItems" model
    required: true,
  },
});

const OutputEvents = mongoose.model("OutputEvents", outputEventsSchema);

module.exports = OutputEvents;
