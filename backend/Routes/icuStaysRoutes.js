const express = require("express");
const router = express.Router();
const ICUStays = require("../schema/icuStaysSchema");

// API route to save ICUStays form data
router.post("/", async (req, res) => {
  try {
    const icuStaysData = req.body;

    // Create a new ICUStays record in the database
    const newICUStay = await ICUStays.create(icuStaysData);

    res.status(201).json(newICUStay); // Return the newly created ICUStays record
  } catch (error) {
    console.error("Error submitting ICUStays form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting ICUStays form" });
  }
});

module.exports = router;
