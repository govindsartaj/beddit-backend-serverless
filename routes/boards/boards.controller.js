const express = require("express");
const Post = require("../posts/Post");
const boardsController = express.Router();
const Board = require("./Board");

boardsController.post("/", async (req, res, next) => {
  try {
    const newBoard = new Board(req.body);

    const errors = newBoard.validateSync();
    if (errors) return res.status(500).send({ error: errors.message });

    await newBoard.save();
    res.status(200).send(newBoard);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

boardsController.put("/:name", async (req, res, next) => {
  try {
    const board = await Board.findOneAndUpdate(
      {name: req.params.name},
      { $set: { ...req.body, modified: Date.now() } },
      { $upsert: true, new: true }
    );

    if (!board) return res.status(404).send({ error: "board not found" });

    res.status(200).send(board);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

boardsController.get("/", async (req, res, next) => {
  try {
    const boards = await Board.find({});
    res.status(200).send(boards);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

boardsController.get("/:name", async (req, res, next) => {
  try {
    const board = await Board.findOne({name: req.params.name});
    const posts = await Post.find({ board: req.params.name });

    if (!board) return res.status(404).send({ error: "board not found" });

    res.status(200).send({ ...board._doc, posts });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

boardsController.delete("/:name", async (req, res, next) => {
  try {
    const board = await Board.findOneAndDelete({ name: req.params.name });

    if (!board) return res.status(404).send({ error: "board not found" });

    res.status(200).send(board);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = boardsController;
