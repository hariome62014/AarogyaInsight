const express = require("express");
const router = express.Router();
const DHCPs = require("../schema/d_hcpsSchema");

// API route to save DHCPs form data
router.post("/", async (req, res) => {
  try {
    const formData = req.body;

    // Create a new DHCPs record in the database
    const newDHCPs = await DHCPs.create(formData);

    res.status(201).json(newDHCPs); // Return the newly created DHCPs record
  } catch (error) {
    console.error("Error submitting DHCPs form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting DHCPs form" });
  }
});

module.exports = router;
