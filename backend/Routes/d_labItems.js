const express = require("express");
const router = express.Router();
const LabItems = require("../schema/d_labItemsSchema"); // Import the LabItems schema

// API route to save Lab Items form data
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new Lab Items record in the database
    const newLabItems = await LabItems.create(formData);

    res.status(201).json(newLabItems); // Return the newly created Lab Items record
  } catch (error) {
    console.error("Error submitting Lab Items form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Lab Items form" });
  }
});

module.exports = router;
