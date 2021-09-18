const express = require("express");
const router = express.Router();
const posts = require("./posts/posts.controller");
const boards = require("./boards/boards.controller");
router.use("/posts", posts);
router.use("/boards", boards);

router.get("/", (req, res) => {
  return res.status(200).json({ message: "we good" });
});

// Add more routes here if you want!
module.exports = router;
