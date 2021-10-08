const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ origin: "https://kind-ptolemy-b8ccf2.netlify.app", credentials: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./db");
const routes = require("./routes");
app.use("/api", routes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports = app;
