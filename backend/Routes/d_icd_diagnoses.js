const express = require("express");
const router = express.Router();
const ICD = require("../schema/d_icd_diagnosesSchema"); // Import the ICD schema

// API route to save ICD Diagnoses form data
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new ICD Diagnoses record in the database
    const newICD = await ICD.create(formData);

    res.status(201).json(newICD); // Return the newly created ICD Diagnoses record
  } catch (error) {
    console.error("Error submitting ICD Diagnoses form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting ICD Diagnoses form" });
  }
});

module.exports = router;
