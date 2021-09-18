const express = require("express");
const Post = require("../posts/Post");
const boardsController = express.Router();
const Board = require("./Board");

boardsController.post("/", async (req, res, next) => {
  const newBoard = new Board(req.body);
  await newBoard.save();
  res.status(200).send(newBoard);
});

boardsController.put("/:id", async (req, res, next) => {
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body, modified: Date.now() } },
    { $upsert: true, new: true }
  );
  res.status(200).send(board);
});

boardsController.get("/", async (req, res, next) => {
  const boards = await Board.find({});
  res.status(200).send(boards);
});

boardsController.get("/:id", async (req, res, next) => {
  const board = await Board.findById(req.params.id);
  const posts = await Post.find({ board: req.params.id });

  res.status(200).send({ ...board._doc, posts });
});

boardsController.delete("/:id", async (req, res, next) => {
  const board = await Board.deleteOne({ _id: req.params.id });
  res.status(200).send(board);
});
module.exports = boardsController;
