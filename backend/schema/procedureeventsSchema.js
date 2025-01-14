const mongoose = require("mongoose");

const procedureEventsSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "User" model
    required: true,
  },
  hadm_id: {
    type: String,
    ref: "Admission", // Reference to the "Admission" model
    required: true,
  },
  stay_id: {
    type: String,
    ref: "ICUStays", // Reference to the "ICUStay" model
    required: true,
  },
  itemid: {
    type: String,
    ref: "DItem", // Reference to the "DItem" model
    required: true,
  },
  caregiver_id: {
    type: String,
    ref: "User", // Reference to the "User" model
    required: true,
  },
  starttime: { type: Date, required: true },
  endtime: { type: Date, required: true },
  storetime: { type: Date, required: true },
  value: { type: String, required: true },
  valueuom: { type: String, required: true },
  location: { type: String, required: true },
  locationcategory: { type: String, required: true },
  orderid: { type: String, required: true, unique: true },
  linkorderid: { type: String, required: true },
  ordercategoryname: { type: String, required: true },
  ordercategorydescription: { type: String, required: true },
  patientweight: { type: Number, required: true },
  isopenbag: { type: String, required: true },
  continueinnextdept: { type: String, required: true },
  statusdescription: { type: String, required: true },
  ORIGINALAMOUNT: { type: Number, required: true },
  ORIGINALRATE: { type: Number, required: true },
});

const ProcedureEvent = mongoose.model("ProcedureEvent", procedureEventsSchema);

module.exports = ProcedureEvent;
