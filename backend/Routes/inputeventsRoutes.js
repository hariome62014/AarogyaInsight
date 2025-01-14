const express = require("express");
const router = express.Router();
const InputEvents = require("../schema/inputeventsSchema");

// API route to save InputEvents form data
router.post("/", async (req, res) => {
  try {
    const inputData = req.body;

    // Create a new inputevents record in the database
    const newInputEvent = await InputEvents.create(inputData);

    res.status(201).json(newInputEvent); // Return the newly created inputevents record
  } catch (error) {
    console.error("Error submitting InputEvents form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting InputEvents form" });
  }
});

module.exports = router;
