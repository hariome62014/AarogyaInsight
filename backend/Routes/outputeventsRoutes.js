const express = require("express");
const router = express.Router();
const OutputEvents = require("../schema/outputeventsSchema");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Verify the token and set user data in req.user if needed

  next();
};

// API route to save OutputEvents form data
router.post("/", verifyToken, async (req, res) => {
  try {
    const outputEventData = req.body;

    // Create a new output event record in the database
    const newOutputEvent = await OutputEvents.create(outputEventData);

    res.status(201).json(newOutputEvent); // Return the newly created output event record
  } catch (error) {
    console.error("Error submitting OutputEvents form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting OutputEvents form" });
  }
});

module.exports = router;
