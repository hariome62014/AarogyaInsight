const express = require("express");
const router = express.Router();
const Patients = require("../schema/patientsSchema");

// API route to save Patients form data
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new Patients record in the database
    const newPatient = await Patients.create(formData);

    res.status(201).json(newPatient); // Return the newly created Patients record
  } catch (error) {
    console.error("Error submitting Patients form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Patients form" });
  }
});

module.exports = router;
