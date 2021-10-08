const jwt = require("jsonwebtoken");
const User = require("../routes/users/User");

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const buildUnauthorizedError = () => {
  const error = new Error("Unauthorized");
  error.status = 401;

  return error;
};

const protectedRoute = async (req, res, next) => {
  try {
    const unauthorizedError = buildUnauthorizedError();

    const token = getToken(req);

    if (!token) {
      next(unauthorizedError);
    }

    const verifiedToken = jwt.verify(token, "secret");

    const user = await User.findOne({ _id: verifiedToken._id });

    if (verifiedToken && user) {
      req.root = user;
      next();
    } else {
      next(unauthorizedError);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { protectedRoute };
