const mongoose = require("mongoose");

const labItemsSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true, // Designate itemId as the primary key (unique identifier)
  },
  label: { type: String, required: true },
  fluid: { type: String, required: true },
  category: { type: String, required: true },
});

const LabItems = mongoose.model("LabItems", labItemsSchema);

module.exports = LabItems;
