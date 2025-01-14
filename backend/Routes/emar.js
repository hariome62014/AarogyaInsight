const express = require("express");
const router = express.Router();
const EMAR = require("../schema/emarSchema"); // Import the EMAR schema

// API route to save EMAR form data
router.post("/", async (req, res) => {
  try {
    const emarData = req.body;

    // Create a new EMAR record in the database
    const newEMAR = await EMAR.create(emarData);

    res.status(201).json(newEMAR); // Return the newly created EMAR record
  } catch (error) {
    console.error("Error submitting EMAR form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting EMAR form" });
  }
});

module.exports = router;
