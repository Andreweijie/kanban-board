const express = require("express");

const app = express();

app.get("/contact", (req, res) => {
  res.send("hi");
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
