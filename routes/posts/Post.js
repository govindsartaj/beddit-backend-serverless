const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  board: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
