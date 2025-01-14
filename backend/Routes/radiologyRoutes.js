const express = require("express");
const router = express.Router();
const Radiology = require("../schema/radiologySchema");
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

// API route to save radiology form data
router.post("/", verifyToken, async (req, res) => {
  try {
    const radiologyData = req.body;

    // Create a new radiology record in the database
    const newRadiology = await Radiology.create(radiologyData);

    res.status(201).json(newRadiology); // Return the newly created radiology record
  } catch (error) {
    console.error("Error submitting radiology form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting radiology form" });
  }
});

module.exports = router;
