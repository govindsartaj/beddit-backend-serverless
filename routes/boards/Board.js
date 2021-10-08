const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "display name is required"],
    minlength: 1,
    maxlength: 64,
  },
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: 1,
    maxlength: 64,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    minlength: 1,
    maxlength: 512,
  },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  postCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Board", BoardSchema);
