const express = require("express");
const router = express.Router();
const DateTimeEvents = require("../schema/datetimeEventsSchema");

// API route to save DateTimeEvents form data
router.post("/", async (req, res) => {
  try {
    const dateTimeEventsData = req.body;

    // Create a new DateTimeEvents record in the database
    const newDateTimeEvent = await DateTimeEvents.create(dateTimeEventsData);

    res.status(201).json(newDateTimeEvent); // Return the newly created DateTimeEvents record
  } catch (error) {
    console.error("Error submitting DateTimeEvents form:", error);
    res.status(500).json({
      error: "An error occurred while submitting DateTimeEvents form",
    });
  }
});

module.exports = router;
