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
  // res.sendFile(__dirname + "/index.html");
  res.send("Hello World!");
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

app.post("/repas", async (req, res) => {
  console.log("Hello");
  var data = require("./src/aliment/repas.json");
  let listeRepas = data.filter(
    (repas) =>
      range((3 * calcCalorieRepas(repas)) / parseFloat(req.body.calories)) &&
      range(calcGlucidesRepas(repas) / parseFloat(req.body.glucides)) &&
      range(calcLipidesRepas(repas) / parseFloat(req.body.lipides)) &&
      range(calcProteinesRepas(repas) / parseFloat(req.body.proteines))
  );
  sendMail(req, listeRepas);
  res.send(listeRepas);
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

async function sendMail(req, liste) {
  let listeChosen = [];
  const info = await transporter.sendMail({
    from: '"Service Zeshortcut" <services@zeshortcut.com>', // sender address
    to: req.body.email, // list of receivers
    subject: `Résultat`, // Subject line
    text: "Hello world?", // plain text body
    html: `
  <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none"
  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
  <tbody>
    <tr>
      <td align="center" style="padding:0;Margin:0">
        <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#D7F3DB;background-repeat:no-repeat;width:600px;background-position:center top"
          role="none">
          <tbody>
            <tr>
              <td align="left"
                style="text-align:center;font-size:xxx-large;font-family:Marcellus, Arial, serif;padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;color: #DC2626;">
                Shortcut
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0;Margin:0">
        <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#D7F3DB;background-repeat:no-repeat;width:600px;background-position:center top"
          role="none">
          <tbody>
            <tr>
              <td align="left"
                style="text-align:center;font-size: larger;font-family:Marcellus, Arial, serif;padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px">
                <b>Bonjour ${req.body.nom}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0;Margin:0">
        <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#D7F3DB;background-repeat:no-repeat;width:600px;background-position:center top"
          role="none">
          <tbody>
            <tr>
              <td align="left"
                style="text-align:center;font-size: larger;font-family:Marcellus, Arial, serif;padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px">
                Tu as demandé à recevoir un menu convenant à tes besoins. Voici notre sélection:</td>
            </tr>

          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none"
  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
  <tbody>
    <tr>
      <td align="center" style="padding:0;Margin:0">
        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none"
          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#D7F3DB;width:600px">
          <tbody>
            <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                <table cellpadding="0" cellspacing="0" width="100%" role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tbody>
                    <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tbody>
                            <tr>
                              <td align="left" style="padding:0;Margin:0">
                                <h1
                                  style="Margin:0;line-height:48px;mso-line-height-rule:exactly;font-family:Marcellus, Arial, serif;font-size:40px;font-style:normal;font-weight:normal;color:#DC2626">
                                  Menus suggérés</h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
                <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                  <tbody>
                    ${["Petit-déjeuner", "Déjeuner", "Diner"].map((repas) => {
                      let texte = "";
                      let chosenRepas = liste.filter(
                        (element) =>
                          element.etiquette.includes(repas) &&
                          listeChosen.includes(element.nom) == false
                      );

                      if (chosenRepas) {
                        let rand = Math.floor(
                          Math.random() * listeChosen.length
                        );
                        chosenRepas = chosenRepas[rand];
                        listeChosen.push(chosenRepas.nom);
                        texte += `<tr>
                      <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tbody>
                            <tr>
                              <td align="left" style="padding:0;Margin:0;padding-top:10px">
                                <h2
                                  style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Marcellus, Arial, serif;font-size:24px;font-style:normal;font-weight:normal;color:#DC2626">
                                  ${repas}</h2>
                              </td>
                            </tr>`;
                        texte += `
                            <tr>
                              <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                <p
                                  style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                  <strong>${chosenRepas.nom} </strong>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="padding:0;Margin:0">
                                <p
                                  style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                  ${Object.keys(chosenRepas.recette)
                                    .map(
                                      (element) =>
                                        (chosenRepas.recette[element] >= 10
                                          ? `${
                                              chosenRepas.recette[element] / 10
                                            }kg`
                                          : `${
                                              100 * chosenRepas.recette[element]
                                            }g`) +
                                        " " +
                                        element
                                    )
                                    .join(", ")}</p>
                              </td>
                            </tr>
                            `;
                        texte += `
                          </tbody>
                        </table>
                      </td>
                    </tr>`;
                      } else {
                        texte = `
                        <tr>
                      <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                          style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tbody>
                            <tr>
                              <td align="left" style="padding:0;Margin:0">
                                <p
                                  style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                  Aucun repas prévu pour votre ${repas}</p>
                              </td>
                            </tr>`;
                      }
                      return texte;
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`, // html body
  });
}

function calcCalorieRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += repas.recette[element] * aliment.calories;
  });
  return totalCal;
}
function calcLipidesRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += repas.recette[element] * aliment.lipides;
  });
  return totalCal;
}
function calcGlucidesRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += repas.recette[element] * aliment.glucides;
  });
  return totalCal;
}
function calcProteinesRepas(repas) {
  var data = require("./src/aliment/aliments.json");
  let ingredients = Object.keys(repas.recette);
  let totalCal = 0;
  ingredients.forEach((element) => {
    let aliment = data.filter((obj) => obj.nom == element)[0];
    totalCal += repas.recette[element] * aliment.proteines;
  });
  return totalCal;
}
function range(valeur) {
  return 0.8 <= valeur && valeur <= 1.2;
}
