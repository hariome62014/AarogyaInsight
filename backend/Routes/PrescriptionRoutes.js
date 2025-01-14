const express = require("express");
const router = express.Router();
const Prescriptions = require("../schema/PrescriptionsSchema");

// API route to save Prescriptions form data
router.post("/", async (req, res) => {
  try {
    const prescriptionsData = req.body;

    // Create a new prescriptions record in the database
    const newPrescriptions = await Prescriptions.create(prescriptionsData);

    res.status(201).json(newPrescriptions); // Return the newly created prescriptions record
  } catch (error) {
    console.error("Error submitting Prescriptions form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Prescriptions form" });
  }
});

module.exports = router;
