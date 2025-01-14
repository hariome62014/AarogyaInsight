const express = require("express");
const router = express.Router();
const ChartEvents = require("../schema/charteventsSchema");

// API route to save Chart Events form data
router.post("/", async (req, res) => {
  try {
    const chartEventsData = req.body;

    // Create a new chart event record in the database
    const newChartEvent = await ChartEvents.create(chartEventsData);

    res.status(201).json(newChartEvent); // Return the newly created chart event record
  } catch (error) {
    console.error("Error submitting Chart Events form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Chart Events form" });
  }
});

module.exports = router;
