const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  code: String,
  name: String,
  stock: Number,
  price: Number,
  description: String,
});

module.exports = mongoose.model("item", itemSchema);
