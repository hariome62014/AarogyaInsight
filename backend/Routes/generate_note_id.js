// Import necessary modules
const express = require("express");
const router = express.Router();
const Note = require("../schema/dischargeSchema"); // Assuming you have a "Note" schema
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify the authentication token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    next();
  });
};

// API route to generate a new note_id
router.get("/", verifyToken, async (req, res) => {
  try {
    // Retrieve the highest note_id
    const highestNote = await Note.findOne().sort({ note_id: -1 });
    const highestNoteId = highestNote ? highestNote.note_id : 0;

    // Generate a new note_id by adding 1
    const newNoteId = highestNoteId + 1;

    res.json({ note_id: newNoteId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
