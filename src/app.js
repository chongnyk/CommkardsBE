// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const userdataRouter = require("./routes/userdata");

const app = express();
app.use(bodyParser.json());

// Mount your routers
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/userdata", userdataRouter);

// Optional health check
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

module.exports = app;
