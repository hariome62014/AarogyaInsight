const express = require("express");
const router = express.Router();
const ProcedureEvent = require("../schema/procedureeventsSchema");

// Create a new procedure event
router.post("/", async (req, res) => {
  try {
    const procedureEvent = new ProcedureEvent(req.body);
    const savedProcedureEvent = await procedureEvent.save();
    res.status(201).json(savedProcedureEvent);
  } catch (error) {
    console.error("Error creating procedure event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the procedure event" });
  }
});

module.exports = router;
