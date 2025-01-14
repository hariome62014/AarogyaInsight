const express = require("express");
const router = express.Router();
const PoeDetails = require("../schema/poeDetailsSchema"); // Adjust the import path as needed

// Add middleware and authentication as needed

// API route to save Poe Details form data
router.post("/", async (req, res) => {
  try {
    const poeDetailsData = req.body;

    // Create a new Poe Details record in the database
    const newPoeDetails = await PoeDetails.create(poeDetailsData);

    res.status(201).json(newPoeDetails); // Return the newly created Poe Details record
  } catch (error) {
    console.error("Error submitting Poe Details form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Poe Details form" });
  }
});

// Add more routes as needed

module.exports = router;
