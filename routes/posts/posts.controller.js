const express = require("express");
const postsController = express.Router();
const Post = require("./Post");


postsController.post("/", async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(200).send(post);
});
postsController.put("/:id", async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
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
