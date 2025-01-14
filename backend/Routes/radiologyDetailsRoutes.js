const express = require("express");
const router = express.Router();
const RadiologyDetails = require("../schema/radiologyDetailsSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify the authentication token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("Middleware: No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("Middleware: Token verification failed");
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    console.log("Middleware: Token verified successfully");
    next();
  });
};

// API route to save radiology details form data
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("Route: Handling POST request");
    const radiologyDetailsData = req.body;

    // Create a new radiology details record in the database
    const newRadiologyDetails = await RadiologyDetails.create(radiologyDetailsData);

    console.log("Route: Radiology details created successfully");
    res.status(201).json(newRadiologyDetails); // Return the newly created radiology details record
  } catch (error) {
    console.error("Error submitting radiology details form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting radiology details form" });
  }
});

module.exports = router;
