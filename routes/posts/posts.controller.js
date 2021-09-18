const express = require("express");
const postsController = express.Router();
const Post = require("./Post");
const Board = require("../boards/Board");

postsController.post("/", async (req, res, next) => {
  const newPost = new Post(req.body);
  const board = await Board.findById(newPost.board);

  if (board) {
    await newPost.save();
    await Board.findByIdAndUpdate(
      newPost.board,
      { $inc: { postCount: 1 } },
      { $upsert: true, new: true }
    );
    res.status(200).send(newPost);
  }
});

postsController.put("/:id", async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body, modified: Date.now() } },
    { $upsert: true, new: true }
  );
  res.status(200).send(post);
});

postsController.get("/", async (req, res, next) => {
  const posts = await Post.find({});
  res.status(200).send(posts);
});

postsController.get("/:id", async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(200).send(post);
});

postsController.delete("/:id", async (req, res, next) => {
  const post = await Post.deleteOne({ _id: req.params.id });
  res.status(200).send(post);
});
module.exports = postsController;
