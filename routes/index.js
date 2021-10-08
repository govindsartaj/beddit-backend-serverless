const express = require("express");
const router = express.Router();
const posts = require("./posts/posts.controller");
const boards = require("./boards/boards.controller");
const auth = require("./auth/auth.controller");
const users = require("./users/users.controller");
const { protectedRoute } = require("../middleware/protectedRoute");

router.use("/posts", posts);
router.use("/boards", boards);
router.use("/auth", auth);
router.use("/users", users);

router.get("/", (req, res) => {
  return res.status(200).json({ message: "we good" });
});

router.get("/protected", protectedRoute, (req, res) => {
  try {
    return res.status(200).json({ message: req.root });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// Add more routes here if you want!
module.exports = router;
