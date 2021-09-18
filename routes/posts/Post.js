const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'post title is required'] },
  body: { type: String, required: [true, 'post body is required'] },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  board: { type: String, required: [true, 'board is required'] },
});

module.exports = mongoose.model("Post", PostSchema);