const express = require("express");
const router = express.Router();
const posts = require("./posts/posts.controller");
router.use("/posts", posts);

router.get('/', (req, res) => {
  return res.status(200).json({message: 'we good'})
})

// Add more routes here if you want!
module.exports = router;
