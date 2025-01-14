const express = require("express");
const router = express.Router();
const Services = require("../schema/serviceScehma");

// API route to save Services form data
router.post("/", async (req, res) => {
  try {
    const servicesData = req.body;

    // Create a new Services record in the database
    const newServices = await Services.create(servicesData);

    res.status(201).json(newServices); // Return the newly created Services record
  } catch (error) {
    console.error("Error submitting Services form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Services form" });
  }
});

module.exports = router;
