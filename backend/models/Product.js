const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String
    // required: true
  },
  price: {
    type: String
    // required: true
  },
  desc: {
    type: String
    // required: true
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
