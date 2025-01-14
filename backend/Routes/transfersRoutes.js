const express = require("express");
const router = express.Router();
const Transfers = require("../schema/transfersSchema");

// API route to save Transfers form data
router.post("/", async (req, res) => {
  try {
    const transfersData = req.body;

    // Create a new Transfers record in the database
    const newTransfers = await Transfers.create(transfersData);

    res.status(201).json(newTransfers); // Return the newly created Transfers record
  } catch (error) {
    console.error("Error submitting Transfers form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting Transfers form" });
  }
});

module.exports = router;
