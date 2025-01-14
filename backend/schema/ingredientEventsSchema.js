const mongoose = require("mongoose");

const ingredientEventSchema = new mongoose.Schema({
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
    ref: "ICUStays", // Reference to a "Stay" model (if exists)
    required: true,
  },
  caregiver_id: {
    type: String,
    ref: "Caregivers", // Reference to a "Caregiver" model (if exists)
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
  itemid: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  amountuom: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  rateuom: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
    unique: true, // Designate orderid as the primary key
  },
  linkorderid: {
    type: String,
    required: true,
  },
  statusdescription: {
    type: String,
    required: true,
  },
  originalrate: {
    type: String,
    required: true,
  },
  originalamount: {
    type: String,
    required: true,
  },
  // Add more fields for additional data
});

const IngredientEvent = mongoose.model(
  "IngredientEvent",
  ingredientEventSchema
);

module.exports = IngredientEvent;
