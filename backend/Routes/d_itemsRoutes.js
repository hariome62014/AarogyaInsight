const express = require("express");
const router = express.Router();
const DItems = require("../schema/d_itemsSchema");

// API route to save D Items form data
router.post("/", async (req, res) => {
  try {
    const dItemsData = req.body;

    // Create a new D Items record in the database
    const newDItem = await DItems.create(dItemsData);

    res.status(201).json(newDItem); // Return the newly created D Items record
  } catch (error) {
    console.error("Error submitting D Items form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting D Items form" });
  }
});

module.exports = router;
