const express = require("express");
const router = express.Router();
const DiagnosesICD = require("../schema/diagnoses_icdSchema"); // Import the DiagnosesICD schema

// API route to save Diagnoses ICD form data
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new Diagnoses ICD record in the database
    const newDiagnosesICD = await DiagnosesICD.create(formData);

    res.status(201).json(newDiagnosesICD); // Return the newly created Diagnoses ICD record
  } catch (error) {
    console.error("Error submitting Diagnoses ICD form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Diagnoses ICD form" });
  }
});

module.exports = router;
