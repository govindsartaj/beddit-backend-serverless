const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  body: { type: String, required: [true, "comment body is required"] },
  user: { type: String, required: [true, "user is required"] },
  created: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  parent: { type: String, required: [true, "comment parent is required"] },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment", CommentSchema);
