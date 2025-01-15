const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  subject_id: {
    type: Number,
    required: true,
  },
  hadm_id: { type: Number, unique: true, required: true },
  // admissionDate: { type: Date, required: true },
  admittime: { type: String, required: true },
  dischtime: { type: String, },
  deathtime: { type: String, required: false },
  admission_type: { type: String, },
  admission_provider_id: { type: String, },
  admission_location: { type: String, },
  discharge_location: { type: String, },
  insurance: { type: String, },
  language: { type: String},
  martial_status: { type: String },
  race: { type: String  },
  religion: { type: String  },  
  ethnicity: { type: String  },
  edregtime: { type: String },
  edouttime: { type: String},
  diagnosis : { type : String },
  hospital_expire_flag: { type: Number },
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
