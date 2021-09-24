const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  displayName: { type: String, required: [true, 'display name is required'] },
  name: { type: String, required: [true, 'name is required'] },
  description: { type: String, required: [true, 'description is required'] },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  postCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Board", BoardSchema);
