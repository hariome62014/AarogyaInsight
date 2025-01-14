const mongoose = require("mongoose");

const icdDiagnosesSchema = new mongoose.Schema({
  icdCode: { type: Number, required: true },
  icdVersion: { type: String, required: true },
  longTitle: { type: String, required: true },
});

const ICD = mongoose.model("ICD", icdDiagnosesSchema);

module.exports = ICD;
