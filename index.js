const express = require("express");
const app = express();
const port = 5001;

app.use("/aliment", express.static(__dirname + "src/aliment"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/aliment/viandes", async (req, res) => {
  var data = require("./src/aliment/viandes.json");
  res.send(data);
});
app.get("/aliment/regimes", async (req, res) => {
  var data = require("./src/aliment/regime.json");
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
