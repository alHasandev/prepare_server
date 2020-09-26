const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ ...req.query });

    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.get("/:itemID", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemID);

    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const item = new Item({
      code: req.body.code,
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
    });

    const newItem = await item.save();

    return res.json(newItem);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.patch("/:itemID", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemID);

    if (req.body.code) item.code = req.body.code;
    if (req.body.name) item.name = req.body.name;
    if (req.body.stock) item.stock = req.body.stock;
    if (req.body.price) item.price = req.body.price;
    if (req.body.description) item.description = req.body.description;

    const updatedItem = await item.save();

    return res.json(updatedItem);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

router.delete("/:itemID", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemID);

    await item.remove();

    return res.json({ removed: true });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
