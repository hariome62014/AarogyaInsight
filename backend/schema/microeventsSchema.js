const mongoose = require("mongoose");

const microBiologyEventsSchema = new mongoose.Schema({
  microevent_id: {
    type: Number,
    required: true,
    unique: true, // Designate microevents_id as the primary key
    sparse: true,
  },
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "Patient" model
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
  micro_specimen_id: {
    type: Number,
    required: true,
  },
  order_provider_id: {
    type: Number,
    required: true,
  },
  chartdate: {
    type: Date,
    required: true,
  },
  charttime: {
    type: Date,
    required: true,
  },
  specimen_itemid: {
    type: Number,
    required: true,
  },
  spec_type_desc: {
    type: String,
    required: true,
  },
  test_seq: {
    type: String,
    required: true,
  },
  storedate: {
    type: Date,
    required: true,
  },
  storetime: {
    type: Date,
    required: true,
  },
  test_itemid: {
    type: Number,
    required: true,
  },
  test_name: {
    type: String,
    required: true,
  },
  org_itemid: {
    type: Number,
    required: true,
  },
  org_name: {
    type: String,
    required: true,
  },
  isolate_num: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  ab_itemid: {
    type: Number,
    required: true,
  },
  ab_name: {
    type: String,
    required: true,
  },
  dilution_text: {
    type: String,
    required: true,
  },
  dilution_comparison: {
    type: String,
    required: true,
  },
  dilution_value: {
    type: String,
    required: true,
  },
  interpretation: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const MicroBiologyEvents = mongoose.model("MicroBiologyEvents", microBiologyEventsSchema);

module.exports = MicroBiologyEvents;
