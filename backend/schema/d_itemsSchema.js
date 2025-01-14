const mongoose = require("mongoose");

const dItemsSchema = new mongoose.Schema({
  itemid: {
    type: String, // You can use the appropriate data type (e.g., Number) based on your data
    required: true,
    unique: true, // Designate itemid as the primary key
  },
  label: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  linksto: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  unitname: {
    type: String,
    required: true,
  },
  param_type: {
    type: String,
    required: true,
  },
  lownormalvalue: {
    type: String,
    required: true,
  },
  highnormalvalue: {
    type: String,
    required: true,
  },
  // Add more fields for additional data
});

const DItems = mongoose.model("DItems", dItemsSchema);

module.exports = DItems;
