const mongoose = require("mongoose");

const inputeventsSchema = new mongoose.Schema({
  stay_id: {
    type: Number,
    ref: "ICUStays", // Reference to the "ICUStays" model (foreign key)
    required: true,
  },
  caregiver_id: {
    type: Number,
    ref: "Caregivers", // Reference to the "Caregivers" model (foreign key)
    required: true,
  },
  patientId: {
    type: String,
    ref: "User", // Reference to the "User" model (foreign key)
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model (foreign key)
    required: true,
  },
  itemid: {
    type: Number,
    required: true,
  },
  order_id: {
    type: Number,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  endtime: {
    type: String,
    required: true,
  },
  storetime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amountuom: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  rateuom: {
    type: String,
    required: true,
  },
  linkorderid: {
    type: Number,
    required: true,
  },
  ordercategoryname: {
    type: String,
    required: true,
  },
  secondaryordercategoryname: {
    type: String,
    required: true,
  },
  ordercomponenttypedescription: {
    type: String,
    required: true,
  },
  ordercategorydescription: {
    type: String,
    required: true,
  },
  patientweight: {
    type: Number,
    required: true,
  },
  totalamount: {
    type: Number,
    required: true,
  },
  totalamountuom: {
    type: String,
    required: true,
  },
  isopenbag: {
    type: String,
    required: true,
  },
  continueinnextdept: {
    type: String,
    required: true,
  },
  statusdescription: {
    type: String,
    required: true,
  },
  originalamount: {
    type: Number,
    required: true,
  },
  originalrate: {
    type: Number,
    required: true,
  },
});

const InputEvents = mongoose.model("InputEvents", inputeventsSchema);

module.exports = InputEvents;
