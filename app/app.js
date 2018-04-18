const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("Function Created!");
});

module.exports = app;
