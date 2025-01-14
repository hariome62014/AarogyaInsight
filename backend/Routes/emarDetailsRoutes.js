const express = require("express");
const router = express.Router();
const EMARDetails = require("../schema/emar_detailsSchema"); // Import the EMAR Details schema

// API route to save EMAR Details form data
router.post("/emar-details", async (req, res) => {
  try {
    const emarDetailsData = req.body;

    // Create a new EMAR Details record in the database
    const newEMARDetails = await EMARDetails.create(emarDetailsData);

    res.status(201).json(newEMARDetails); // Return the newly created EMAR Details record
  } catch (error) {
    console.error("Error submitting EMAR Details form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting EMAR Details form" });
  }
});

module.exports = router;
