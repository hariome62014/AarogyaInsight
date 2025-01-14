const mongoose = require("mongoose");

const d_hcpsSchema = new mongoose.Schema({
  code: { type: String, required: true },
  category: { type: String, required: true },
  longDescription: { type: String, required: true },
  shortDescription: { type: String, required: true },
});

const DHCPs = mongoose.model("DHCPs", d_hcpsSchema);

module.exports = DHCPs;
