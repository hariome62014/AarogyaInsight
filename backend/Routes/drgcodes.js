const express = require("express");
const router = express.Router();
const DRGCodes = require("../schema/drgcodesSchema"); // Import the DRGCodes schema

// API route to save DRG Codes form data
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new DRG Codes record in the database
    const newDRGCodes = await DRGCodes.create(formData);

    res.status(201).json(newDRGCodes); // Return the newly created DRG Codes record
  } catch (error) {
    console.error("Error submitting DRG Codes form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting DRG Codes form" });
  }
});

module.exports = router;
