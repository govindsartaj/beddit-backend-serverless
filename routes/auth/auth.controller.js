const express = require("express");
const User = require("../users/User");
const authController = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isUsernameTaken = async (username) => {
  const user = await User.findOne({ username });
  return !!user;
};

const buildToken = (user, refreshToken = false) => {
  return jwt.sign(
    {
      user: user.username,
      _id: user._id,
    },
    refreshToken ? "refreshSecret" : "secret",
    { expiresIn: refreshToken ? 525600 : 86400 }
  );
};

authController.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).send({ error: "check credentials and try again" });

    const accessToken = buildToken(user);
    const refreshToken = buildToken(user, true);
    res.cookie("bedditAccessToken", accessToken, {
      secure: true,
      maxAge: 86400000,
      path: '/',
      httpOnly: true,
    });
    res.cookie("bedditRefreshToken", refreshToken, {
      secure: true,
      maxAge: 525600000,
      path: '/',
      httpOnly: true,
    });
    return res.status(200).send({ accessToken, refreshToken });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

authController.post("/signup", async (req, res, next) => {
  try {
    if (await isUsernameTaken(req.body.username))
      return res.status(409).send({ error: "username is taken" });

    const newUserRawPassword = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const errors = newUserRawPassword.validateSync();
    if (errors) return res.status(500).send({ error: errors.message });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const accessToken = buildToken(savedUser);
    const refreshToken = buildToken(savedUser, true);

    return res.status(200).send({ accessToken, refreshToken });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

authController.post("/refresh-token", async (req, res) => {
  try {
    const currRefreshToken = req.body.refreshToken;
    const verifiedToken = jwt.verify(currRefreshToken, "refreshSecret");
    const user = await User.findOne({ _id: verifiedToken._id });

    if (verifiedToken && user) {
      const accessToken = buildToken(user);
      const refreshToken = buildToken(user, true);
      return res.status(200).send({ success: { accessToken, refreshToken } });
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

module.exports = authController;
