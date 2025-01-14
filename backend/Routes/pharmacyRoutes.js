const express = require("express");
const router = express.Router();
const Pharmacy = require("../schema/pharmacySchema"); // Adjust the import path as needed

// Add middleware and authentication as needed

// API route to save Pharmacy form data
router.post("/", async (req, res) => {
  try {
    const pharmacyData = req.body;

    // Create a new pharmacy record in the database
    const newPharmacy = await Pharmacy.create(pharmacyData);

    res.status(201).json(newPharmacy); // Return the newly created pharmacy record
  } catch (error) {
    console.error("Error submitting Pharmacy form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Pharmacy form" });
  }
});

// Add more routes as needed

module.exports = router;
