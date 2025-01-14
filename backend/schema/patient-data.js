// const mongoose = require("mongoose");

// const patientDataSchema = new mongoose.Schema({
//   AadhaarID: String,
//   MedicalRecords: [
//     {
//       Timestamp: Number,
//       DoctorID: String,
//       Conditions: [String],
//       Prescription: [String],
//       PhysicalExamination: {
//         Pulse: Number,
//         BloodPressure: { Sys: Number, Dia: Number },
//         Weight: Number,
//         Temperature: Number,
//         SpO2: Number,
//       },
//       LabTests: [
//         {
//           TestType: String,
//           HealthWorkerID: String,
//           Results: String,
//         },
//       ],
//     },
//   ],
// });

// const patientData = mongoose.model("patientData", patientDataSchema);

// module.exports = patientData;
const mongoose = require("mongoose");

const patientDetailsSchema = new mongoose.Schema({
  //patient
  subject_id: {
    type: String,
    required: true,
    unique: true,
  },
  Personal_details: [
    {
      name: String,
      contact_number: Number,
      address: String,
      email: String,
      gender: {
        type: String,
      },

      anchor_age: {
        type: Number,
      },
      anchor_year: {
        type: Number,
      },
      anchor_year_group: {
        type: String,
      },
      dod: {
        type: Date,
      },
    },
  ],
  //admission
  Admission_details: [
    {
      hadm_id: {
        type: Number,
        unique: true,
      },
      admittime: {
        type: String,
        required: true,
      },
      dischtime: {
        type: String,
        required: true,
      },
      deathtime: {
        type: String,
        required: true,
      },
      admission_type: {
        type: String,
        required: true,
      },
      admission_provider_id: {
        type: String,
        required: true,
      },
      admission_location: {
        type: String,
        required: true,
      },
      discharge_location: {
        type: String,
        required: true,
      },
      insurance: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      martial_status: {
        type: String,
        required: true,
      },
      race: {
        type: String,
        required: true,
      },
      edregtime: {
        type: String,
        required: true,
      },
      edouttime: {
        type: String,
        required: true,
      },
      hospital_expire_flag: {
        type: Number,
        required: true,
      },
    },
  ],
  //dateTimeEvents
  dateTimeEvents_details: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      stay_id: {
        type: String,
        required: true,
      },
      caregiver_id: {
        type: String,
        ref: "Caregivers", // Reference to the "Caregiver" model
        required: true,
      },
      charttime: {
        type: Date,
        required: true,
      },
      storetime: {
        type: Date,
        required: true,
      },
      itemid: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
      valueuom: {
        type: String,
        required: true,
      },
      warning: {
        type: String,
      },
    },
  ],
  //diagnosis_icd
  diagnosis_icd: [
    {
      seq_no: { type: Number, required: true },
      icd_code: { type: String, required: true },
      icd_version: { type: String, required: true },
      hadm_id: {
        type: String,
        required: true,
        ref: "Admission", // Reference to the Admission model
      },
    },
  ],

  //discharge
  discharge: [
    {
      note_id: {
        type: Number,
        unique: true,
        required: true,
      },
      hadm_id: {
        type: Number,
        ref: "Admission", // Assuming there's an Admission model
        required: true,
      },
      note_type: {
        type: String,
        required: true,
      },
      note_seq: {
        type: Number,
        required: true,
      },
      charttime: {
        type: Date,
        required: true,
      },
      storetime: {
        type: Date,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  //DISCHARGE-DETAILS
  Discharge_details: [
    {
      note_id: {
        type: Number,
        unique: true, //change it to ref
        required: true,
      },
      field_name: {
        type: String,
        required: true,
      },
      field_value: {
        type: String,
        required: true,
      },
      field_ordinal: {
        type: Number,
        required: true,
      },
    },
  ],
  //DRGCODES
  drgcodes: [
    {
      drg_type: { type: String, required: true },
      drg_code: { type: String, required: true },
      description: { type: String, required: true },
      drg_severity: { type: String, required: true },
      drg_mortality: { type: String, required: true },
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
    },
  ],
  //EMAR
  emar: [
    {
      emar_id: {
        type: Number,
        required: true,
        unique: true, // Designate emar_id as the primary key
      },
      emar_seq: { type: Number, required: true },
      poe_id: { type: Number, required: true },
      pharmacy_id: { type: Number, required: true },
      enter_provider_id: { type: Number, required: true },
      chart_time: { type: String, required: true },
      medication: { type: String, required: true },
      event_txt: { type: String, required: true },
      schedule_time: { type: String, required: true },
      store_time: { type: String, required: true },
      hadm_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
    },
  ],
  //EMAR-DETAILS
  emar_details: [
    {
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

      emarId: {
        type: String,
        ref: "EMAR", // Reference to the "EMAR" model (assuming you're referring to the same model)
        required: true,
      },
    },
  ],
  //HCPS-EVENTS
  hcps_events: [
    {
      chartdate: {
        type: Date,
        required: true,
      },
      hcps_cd: {
        type: String,
        required: true,
      },
      seq_num: {
        type: String,
        required: true,
      },
      short_description: {
        type: String,
        required: true,
      },

      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
    },
  ],
  //ICU-STAY
  icu_stay: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      stay_id: {
        type: String,
        required: true,
      },
      firstcareunit: {
        type: String,
        required: true,
      },
      lastcareunit: {
        type: String,
        required: true,
      },
      intime: {
        type: Date,
        required: true,
      },
      outtime: {
        type: Date,
        required: true,
      },
      los: {
        type: Number,
        required: true,
      },
    },
  ],
  //PHARMACY-SCHEMA
  pharmacy: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      pharmacy_id: {
        type: Number,
        required: true,
        unique: true, // Designate pharmacy_id as the primary key
      },
      poe_id: {
        type: Number,
        required: true,
      },
      starttime: {
        type: String,
        required: true,
      },
      stoptime: {
        type: String,
        required: true,
      },
      medication: {
        type: String,
        required: true,
      },
      proc_type: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      entertime: {
        type: String,
        required: true,
      },
      verifiedtime: {
        type: String,
        required: true,
      },
      route: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
      disp_shed: {
        type: String,
        required: true,
      },
      infusion_type: {
        type: String,
        required: true,
      },
      sliding_scale: {
        type: String,
        required: true,
      },
      lockout_interval: {
        type: String,
        required: true,
      },
      basal_rate: {
        type: String,
        required: true,
      },
      one_hr_max: {
        type: String,
        required: true,
      },
      doses_per_24_hr: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      duration_interval: {
        type: String,
        required: true,
      },
      expiration_value: {
        type: String,
        required: true,
      },
      expiration_unit: {
        type: String,
        required: true,
      },
      expiration_date: {
        type: Date,
        required: true,
      },
      dispensation: {
        type: String,
        required: true,
      },
      fill_quantity: {
        type: String,
        required: true,
      },
    },
  ],
  //POE SCHEMA
  poe: [
    {
      hadm_id: {
        type: String,
        ref: "Admission",
        required: true,
      },
      poe_id: {
        type: String,
        required: true,
        unique: true, // Designate poe_id as the primary key
      },
      poe_seq: { type: String, required: true },
      ordertime: { type: String, required: true },
      order_type: { type: String, required: true },
      order_subtype: { type: String, required: true },
      transaction_type: { type: String, required: true },
      discontinue_of_poe_id: { type: String, required: true },
      discontinued_by_poe_id: { type: String, required: true },
      order_provider_id: { type: String, required: true },
      order_status: { type: String, required: true },
    },
  ],
  //POE-DETAILS
  poe_details: [
    {
      poe_id: {
        type: String,
        ref: "Poe", // Reference to the "Poe" model
        required: true,
      },
      poe_seq: {
        type: String,
        ref: "Poe", // Reference to the "Poe" model
        required: true,
      },
      field_name: {
        type: String,
        required: true,
      },
      field_value: {
        type: String,
        required: true,
      },
    },
  ],
  //PRESCRIPTIONS
  prescriptions: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      poe_id: {
        type: String,
        ref: "Poe", // Reference to the "POE" model
        required: true,
      },
      poe_seq: {
        type: Number,
        ref: "Poe",
        required: true,
      },
      order_provider_id: {
        type: String,
        required: true,
      },
      starttime: {
        type: Date,
        required: true,
      },
      stoptime: {
        type: Date,
        required: true,
      },
      drug_type: {
        type: String,
        required: true,
      },
      drug: {
        type: String,
        required: true,
      },
      formulary_drug_cd: {
        type: String,
        required: true,
      },
      gsn: {
        type: String,
        required: true,
      },
      ndc: {
        type: String,
        required: true,
      },
      prod_strength: {
        type: String,
        required: true,
      },
      form_rx: {
        type: String,
        required: true,
      },
      dose_val_rx: {
        type: String,
        required: true,
      },
      dose_unit_rx: {
        type: String,
        required: true,
      },
      form_val_disp: {
        type: String,
        required: true,
      },
      form_unit_disp: {
        type: String,
        required: true,
      },
      doses_per_24_hrs: {
        type: String,
        required: true,
      },
      route: {
        type: String,
        required: true,
      },
    },
  ],
  //PROCEDURE-EVENTS
  procedure_events: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      stay_id: {
        type: String,
        ref: "ICUStays", // Reference to the "ICUStay" model
        required: true,
      },
      itemid: {
        type: String,
        ref: "DItem", // Reference to the "DItem" model
        required: true,
      },
      caregiver_id: {
        type: String,
        ref: "User", // Reference to the "User" model
        required: true,
      },
      starttime: { type: Date, required: true },
      endtime: { type: Date, required: true },
      storetime: { type: Date, required: true },
      value: { type: String, required: true },
      valueuom: { type: String, required: true },
      location: { type: String, required: true },
      locationcategory: { type: String, required: true },
      orderid: { type: String, required: true, unique: true },
      linkorderid: { type: String, required: true },
      ordercategoryname: { type: String, required: true },
      ordercategorydescription: { type: String, required: true },
      patientweight: { type: Number, required: true },
      isopenbag: { type: String, required: true },
      continueinnextdept: { type: String, required: true },
      statusdescription: { type: String, required: true },
      ORIGINALAMOUNT: { type: Number, required: true },
      ORIGINALRATE: { type: Number, required: true },
    },
  ],
  //PROCEDURE-ICD
  procedure_icd: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      seq_number: {
        type: Number,
        required: true,
      },
      chartdate: {
        type: Date,
        required: true,
      },
      icd_code: {
        type: String,
        required: true,
      },
      icd_version: {
        type: String,
        required: true,
      },
    },
  ],
  //RADIOLOGY-SCHEMA
  radiology: [
    {
      note_id: {
        type: Number,
        unique: true,
        required: true,
      },
      hadm_id: {
        type: Number,
        ref: "Admission", // Assuming there's an Admission model
        required: true,
      },
      note_type: {
        type: String,
        required: true,
      },
      note_seq: {
        type: Number,
        required: true,
      },
      charttime: {
        type: Date,
        required: true,
      },
      storetime: {
        type: Date,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  //RADIOLOGY-DETAILS
  radiology_details: [
    {
      note_id: {
        type: Number,
        unique: true, //ref.
        required: true,
      },

      field_name: {
        type: String,
        required: true,
      },
      field_value: {
        type: String,
        required: true,
      },
      field_ordinal: {
        type: Number,
        required: true,
      },
    },
  ],
  //SERVICES
  services: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      transfertime: {
        type: Date,
        required: true,
      },
      prev_service: {
        type: String,
        required: true,
      },
      cur_service: {
        type: String,
        required: true,
      },
    },
  ],
  //TRANSFERS
  transfers: [
    {
      hadm_id: {
        type: String,
        ref: "Admission", // Reference to the "Admission" model
        required: true,
      },
      transfer_id: {
        type: String,
        required: true,
      },
      eventtype: {
        type: String,
        required: true,
      },
      careunit: {
        type: String,
        required: true,
      },
      intime: {
        type: Date,
        required: true,
      },
      outtime: {
        type: Date,
        required: true,
      },
    },
  ],
});

const PatientData = mongoose.model("PatientData", patientDetailsSchema);

module.exports = PatientData;
