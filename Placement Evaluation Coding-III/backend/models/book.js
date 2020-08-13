var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  price: Number,
  quantity: Number,
  updatedBy: String,
});

module.exports = mongoose.model("Book", BookSchema);
