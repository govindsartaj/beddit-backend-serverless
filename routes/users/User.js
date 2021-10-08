const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'username is required'], minlength: 4, maxlength: 64 },
  password: { type: String, required: [true, 'password is required'], minlength: 8, maxlength: 64 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  banned: { type: Boolean, default: false },
  bio: { type: String, default: 'No bio.' },
});


module.exports = mongoose.model("User", UserSchema);