const express = require("express");
const router = express.Router();
const OMR = require("../schema/omrSchema"); // Import the OMR schema

// API route to save OMR form data
router.post("/", async (req, res) => {
  try {
    const omrData = req.body;

    // Create a new OMR record in the database
    const newOMR = await OMR.create(omrData);

    res.status(201).json(newOMR); // Return the newly created OMR record
  } catch (error) {
    console.error("Error submitting OMR form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting OMR form" });
  }
});

module.exports = router;
