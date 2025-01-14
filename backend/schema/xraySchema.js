// xrayReportSchema.js

const mongoose = require('mongoose');

const xrayReportSchema = new mongoose.Schema({
  subject_Id: {
    type: String,
    required: true,
    ref: "User",
  },
  hadm_Id: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Add more fields as needed, such as date, description, etc.
});

const XRayReport = mongoose.model('XRayReport', xrayReportSchema);

module.exports = XRayReport;
