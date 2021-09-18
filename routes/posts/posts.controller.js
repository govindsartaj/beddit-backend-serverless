const express = require("express");
const postsController = express.Router();
const Post = require("./Post");
const Board = require("../boards/Board");

postsController.post("/", async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const errors = newPost.validateSync();

    if (errors) return res.status(500).send({ error: errors.message });

    const board = await Board.findById(newPost.board);

    if (!board) return res.status(500).send({ error: "board not found" });

    await newPost.save();
    await Board.findByIdAndUpdate(
      newPost.board,
      { $inc: { postCount: 1 } },
      { $upsert: true, new: true }
    );
    res.status(200).send(newPost);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

postsController.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, modified: Date.now() } },
      { $upsert: true, new: true }
    );

    if (!post) return res.status(404).send({ error: "post not found" });

    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

postsController.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

postsController.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).send({ error: "post not found" });

    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

postsController.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id });
    if (post.deletedCount === 0)
      return res.status(404).send({ error: "post not found" });

    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = postsController;
