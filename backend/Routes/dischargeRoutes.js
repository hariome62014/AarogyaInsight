const express = require("express");
const router = express.Router();
const Discharge = require("../schema/dischargeSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify the authentication token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    next();
  });
};

// API route to save discharge form data
router.post("/", verifyToken, async (req, res) => {
  try {
    const dischargeData = req.body;

    // Create a new discharge record in the database
    const newDischarge = await Discharge.create(dischargeData);

    res.status(201).json(newDischarge); // Return the newly created discharge record
  } catch (error) {
    console.error("Error submitting discharge form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting discharge form" });
  }
});

module.exports = router;
