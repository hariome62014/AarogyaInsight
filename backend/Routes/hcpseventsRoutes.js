const express = require("express");
const router = express.Router();
const HCPSEvents = require("../models/hcpseventsSchema"); // Import the HCPSEvents schema

// API route to save HCPSEvents form data
router.post("/", async (req, res) => {
  try {
    const hcpseventsData = req.body;

    // Create a new HCPSEvents record in the database
    const newHCPSEvents = await HCPSEvents.create(hcpseventsData);

    res.status(201).json(newHCPSEvents); // Return the newly created HCPSEvents record
  } catch (error) {
    console.error("Error submitting HCPSEvents form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting HCPSEvents form" });
  }
});

module.exports = router;
