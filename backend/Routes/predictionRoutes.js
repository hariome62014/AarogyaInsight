const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const Admission = require("../schema/admissionSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.error("Token verification error:", err);
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    next();
  });
};

// Define endpoint to fetch predictions from Python API
router.post("/get-prediction", verifyToken, async (req, res) => {
  try {
    // Fetch all admission records from the database
    const admissions = await Admission.find();

    // Prepare data to send to the Flask app
    const inputData = admissions.map(admission => {
      return {
        feature1: admission.feature1, // Adjust according to your schema
        feature2: admission.feature2, // Adjust according to your schema
        // Add more features as required
      };
    });

    // Make a POST request to the Flask app
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    // Send prediction results back to client
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching prediction:", error);
    res.status(500).json({ error: "Error fetching prediction" });
  }
});

module.exports = router;
