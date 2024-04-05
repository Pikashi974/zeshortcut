const express = require("express");
const app = express();
const port = 5001;

app.use("/aliment", express.static(__dirname + "src/aliment"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/aliments", async (req, res) => {
  var data = require("./src/aliment/aliments.json");
  res.send(data);
});
// app.get("/aliment/regimes", async (req, res) => {
//   var data = require("./src/aliment/regime.json");
//   res.send(data);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
