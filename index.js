const express = require("express");
const app = express();
const port = 5001;
const path = require("node:path");
const fs = require("fs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "",
    pass: "",
  },
});

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
app.get("/repas", async (req, res) => {
  var data = require("./src/aliment/repas.json");
  res.send(data);
});
app.get("/src/js/index.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/src/js/index.js"));
});
app.post("/repas/maigrir", async (req, res) => {
  var data = require("./src/aliment/repas.json");
  res.send(
    data.filter(
      (repas) =>
        calcCalorieRepas(repas) <= parseFloat(req.body.calories) &&
        calcGlucidesRepas(repas) <= parseFloat(req.body.glucides) &&
        calcLipidesRepas(repas) <= parseFloat(req.body.lipides) &&
        calcProteinesRepas(repas) <= parseFloat(req.body.proteines)
    )
  );
});
app.post("/repas/grossir", async (req, res) => {
  var data = require("./src/aliment/repas.json");
  res.send(
    data.filter(
      (repas) =>
        calcCalorieRepas(repas) >= parseFloat(req.body.calories) &&
        calcGlucidesRepas(repas) >= parseFloat(req.body.glucides) &&
        calcLipidesRepas(repas) >= parseFloat(req.body.lipides) &&
        calcProteinesRepas(repas) >= parseFloat(req.body.proteines)
    )
  );
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

app.post("/sendMail", async function (req, res) {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: req.body.mail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  res.send(info);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
function calcCalorieRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += aliment.calories;
  });
  return totalCal;
}
function calcLipidesRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += aliment.lipides;
  });
  return totalCal;
}
function calcGlucidesRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += aliment.glucides;
  });
  return totalCal;
}
function calcProteinesRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += aliment.proteines;
  });
  return totalCal;
}
