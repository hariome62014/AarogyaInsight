const express = require("express");
const router = express.Router();
const Provider = require("../schema/ProviderrSchema");

// API route to save Provider form data
router.post("/", async (req, res) => {
  try {
    const providerData = req.body;

    // Create a new Provider record in the database
    const newProvider = await Provider.create(providerData);

    res.status(201).json(newProvider); // Return the newly created Provider record
  } catch (error) {
    console.error("Error submitting Provider form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Provider form" });
  }
});

module.exports = router;
