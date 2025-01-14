const mongoose = require("mongoose");

const labEventsSchema = new mongoose.Schema({
  labevent_id: {
    type: Number,
    required: true,
    unique: true, // Designate labevent_id as the primary key
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the "Patient" model
    required: true,
  },
  hadm_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
  specimen_id: {
    type: Number,
    required: true,
  },
  item_id: {
    type: Number,
    required: true,
  },
  order_provider_id: {
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
  value: {
    type: String,
    required: true,
  },
  valuenum: {
    type: Number,
    required: true,
  },
  valueuom: {
    type: String,
    required: true,
  },
  ref_range_lower: {
    type: String,
    required: true,
  },
  ref_range_upper: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const LabEvents = mongoose.model("LabEvents", labEventsSchema);

module.exports = LabEvents;
