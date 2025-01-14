const express = require("express");
const router = express.Router();
const DischargeDetail = require("../schema/dischargeDetailSchema");
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

// API route to save discharge detail form data
router.post("/", verifyToken, async (req, res) => {
  try {
    const dischargeDetailData = req.body;

    // Create a new discharge detail record in the database
    const newDischargeDetail = await DischargeDetail.create(dischargeDetailData);

    res.status(201).json(newDischargeDetail); // Return the newly created discharge detail record
  } catch (error) {
    console.error("Error submitting discharge detail form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting discharge detail form" });
  }
});

module.exports = router;
