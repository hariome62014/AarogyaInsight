const express = require("express");
const router = express.Router();
const d_labItems = require("../schema/d_labItemsSchema");

router.get("/", async (req, res) => {
  try {
    // Retrieve the highest item_id
    const highestItem = await d_labItems.findOne().sort({ item_id: -1 });
    const highest_item_id = highestItem ? highestItem.item_id : 0;

    // Generate a new item_id by adding 1
    const item_id = highest_item_id + 1;

    res.json({ item_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
