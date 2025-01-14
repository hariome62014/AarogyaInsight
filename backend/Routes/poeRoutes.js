const express = require("express");
const router = express.Router();
const Poe = require("../schema/poeSchema"); // Adjust the import path as needed

// Add middleware and authentication as needed

// API route to save Poe form data
router.post("/", async (req, res) => {
  try {
    const poeData = req.body;

    // Create a new Poe record in the database
    const newPoe = await Poe.create(poeData);

    res.status(201).json(newPoe); // Return the newly created Poe record
  } catch (error) {
    console.error("Error submitting Poe form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Poe form" });
  }
});

// Add more routes as needed

module.exports = router;
