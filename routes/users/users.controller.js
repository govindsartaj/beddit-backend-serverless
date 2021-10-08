const express = require("express");
const User = require("./User");
const Post = require("../posts/Post");
const usersController = express.Router();
const { protectedRoute } = require("../../middleware/protectedRoute");

usersController.get("/:username", protectedRoute, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).send({ error: "user does not exist" });

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

usersController.get("/:username/posts", protectedRoute, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).send({ error: "user does not exist" });

    const posts = Post.find({ author: user.username });

    return res.status(200).send(posts);
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

module.exports = usersController;
