const express = require("express");
const router = express.Router();
const IngredientEvent = require("../schema/ingredientEventsSchema");

// POST route to create a new ingredient event
router.post("/", async (req, res) => {
  try {
    const ingredientEvent = new IngredientEvent(req.body);
    const result = await ingredientEvent.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating ingredient event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating ingredient event" });
  }
});

// Add more routes as needed (e.g., GET, PUT, DELETE)

module.exports = router;
