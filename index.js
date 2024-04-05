const express = require("express");
const app = express();
const port = 5001;
const path = require("node:path");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.json());
app.use("/aliment", express.static(__dirname + "src/aliment"));
app.use(express.static(__dirname + "src/js"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/aliment", async (req, res) => {
  var data = require("./src/aliment/aliments.json");
  res.send(data);
});
app.get("/src/js/index.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/js/index.js"));
});

app.post("/aliment/add", function (req, res) {
  let message = "Echec de l'envoi";
  try {
    var jsonFile = require("./src/aliment/aliments.json");
    jsonFile.push(req.body);
    fs.writeFileSync("./src/aliment/aliments.json", JSON.stringify(jsonFile));
    message = "Success";
    res.send(message);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
// app.get("/aliment/regimes", async (req, res) => {
//   var data = require("./src/aliment/regime.json");
//   res.send(data);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
