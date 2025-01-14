// emar.js (your Mongoose schema file)

const mongoose = require("mongoose");

const emarDSchema = new mongoose.Schema({
  emar_sequence: Number,
  parent_field_ordinal: Number,
  administration_type: String,
  pharmacy_id: Number,
  barcode_type: String,
  reason_for_no_barcode: String,
  complete_dose_not_given: String,
  dose_due: String,
  dose_due_unit: String,
  dose_given_unit: String,
  will_remainder_of_dose_be_given: String,
  product_amout_given: String,
  product_given: String,
  product_code: String,
  product_description: String,
  product_description_other: String,
  prior_infusion_rate: String,
  prior_infusion: String,
  infusion_rate: String,
  infusion_rate_adjustment: String,
  infusion_rate_unit: String,
  route: String,
  infusion_complete: String,
  completion_interval: String,
  new_iv_bag_hung: String,
  continued_infusion_in_other_location: String,
  restart_interval: String,
  side: String,
  site: String,
  non_formulary_version_verification: String,

  // Foreign keys
  subject_id: {
    type: String,
    ref: "Patients", // Reference to the "Patient" model
    required: true,
  },
  emarId: {
    type: String,
    ref: "EMAR", // Reference to the "EMAR" model (assuming you're referring to the same model)
    required: true,
  },
});

const EMARD = mongoose.model("EMAR", emarDSchema);

module.exports = EMARD;
