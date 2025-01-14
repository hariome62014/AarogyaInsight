const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    ref: "User",

    required: true,
  },
  hadm_id: { type: Number, unique: true, required: true },
  // admissionDate: { type: Date, required: true },
  admittime: { type: String, required: true },
  dischtime: { type: String, required: true },
  deathtime: { type: String, required: false },
  admission_type: { type: String, required: true },
  admission_provider_id: { type: String, required: true },
  admission_location: { type: String, required: true },
  discharge_location: { type: String, required: true },
  insurance: { type: String, required: true },
  language: { type: String, required: true },
  martial_status: { type: String, required: true },
  race: { type: String, required: true },
  edregtime: { type: String, required: true },
  edouttime: { type: String, required: true },
  // hospital_expire_flag: { type: Number, required: true },
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
