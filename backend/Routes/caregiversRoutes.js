const express = require("express");
const router = express.Router();
const Caregivers = require("../schema/caregiversSchema");

// API route to save Caregivers form data
router.post("/", async (req, res) => {
  try {
    const caregiversData = req.body;

    // Create a new Caregivers record in the database
    const newCaregivers = await Caregivers.create(caregiversData);

    res.status(201).json(newCaregivers); // Return the newly created Caregivers record
  } catch (error) {
    console.error("Error submitting Caregivers form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Caregivers form" });
  }
});

module.exports = router;
