const express = require("express");
const router = express.Router();
const LabEvents = require("../schema/labeventsSchema"); // Import the LabEvents schema

// API route to save LabEvents form data
router.post("/", async (req, res) => {
  try {
    const labEventsData = req.body;

    // Create a new LabEvents record in the database
    const newLabEvents = await LabEvents.create(labEventsData);

    res.status(201).json(newLabEvents); // Return the newly created LabEvents record
  } catch (error) {
    console.error("Error submitting LabEvents form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting LabEvents form" });
  }
});

module.exports = router;
