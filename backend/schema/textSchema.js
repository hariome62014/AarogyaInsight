const mongoose = require("mongoose");

const te_mo = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true, // Designate itemId as the primary key (unique identifier)
  },
  label: { type: String, required: true },
  fluid: { type: String, required: true },
  category: { type: String, required: true },
});

const texts = mongoose.model("texts", te_mo);

module.exports = texts;
