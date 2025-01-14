const express = require("express");
const router = express.Router();
const ProceduresICD = require("../schema/procedures_icdSchema");

// API route to save Procedures ICD form data
router.post("/", async (req, res) => {
  try {
    const proceduresICDData = req.body;

    // Create a new Procedures ICD record in the database
    const newProceduresICD = await ProceduresICD.create(proceduresICDData);

    res.status(201).json(newProceduresICD); // Return the newly created Procedures ICD record
  } catch (error) {
    console.error("Error submitting Procedures ICD form:", error);
    res.status(500).json({
      error: "An error occurred while submitting Procedures ICD form",
    });
  }
});

module.exports = router;
