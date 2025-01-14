const express = require("express");
const router = express.Router();
const MicroEvents = require("../schema/microeventsSchema"); // Import the MicroEvents schema

// API route to save MicroEvents form data
router.post("/", async (req, res) => {
  try {
    const microeventsData = req.body;

    // Create a new MicroEvents record in the database
    const newMicroEvents = await MicroEvents.create(microeventsData);

    res.status(201).json(newMicroEvents); // Return the newly created MicroEvents record
  } catch (error) {
    console.error("Error submitting MicroEvents form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting MicroEvents form" });
  }
});

module.exports = router;
