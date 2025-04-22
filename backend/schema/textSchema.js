const mongoose = require("mongoose");

const te_mo = new mongoose.Schema({
  id: {
    type: Number,
// Designate itemId as the primary key (unique identifier)
  },
  text: { type: String, },
  hospital_expire_flag: { type: Number, },
  los_label: { type: String, },
});

const texts = mongoose.model("texts", te_mo);

module.exports = texts;
