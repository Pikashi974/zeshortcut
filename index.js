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
                  <b>Bonjour ${req.body.prenom}</b>
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
                                    Special Holiday Menus</h1>
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
                  <!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                    <tbody>
                      <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tbody>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-top:10px">
                                  <h2
                                    style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Marcellus, Arial, serif;font-size:24px;font-style:normal;font-weight:normal;color:#DC2626">
                                    Appetizers</h2>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Roasted Chestnut Soup | $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    A creamy blend of roasted chestnuts and seasonal spices.</p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Cranberry Walnut Salad</strong> <strong>| $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    Fresh mixed greens with cranberries, walnuts, and feta cheese, drizzled
                                    with a balsamic vinaigrette.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tbody>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-top:40px">
                                  <h2
                                    style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Marcellus, Arial, serif;font-size:24px;font-style:normal;font-weight:normal;color:#DC2626">
                                    Main Courses</h2>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Holiday Roast Turkey | $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    Succulent turkey served with homemade stuffing, cranberry sauce, and
                                    gravy.</p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Baked Salmon</strong> <strong>| $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    Baked salmon fillet with a dill and lemon butter sauce.</p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Vegetarian Wellington</strong> <strong>| $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    A flavorful mix of roasted vegetables, nuts, and cheese wrapped in puff
                                    pastry.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tbody>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-top:40px">
                                  <h2
                                    style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:Marcellus, Arial, serif;font-size:24px;font-style:normal;font-weight:normal;color:#DC2626">
                                    Desserts</h2>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Desserts | $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    Succulent turkey served with homemade stuffing, cranberry sauce, and
                                    gravy.</p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:15px">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:21px;color:#2A1B0F;font-size:14px">
                                    <strong>Chocolate Yule Log</strong> <strong>| $45</strong>
                                  </p>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="padding:0;Margin:0">
                                  <p
                                    style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Lexend, Arial, sans-serif;line-height:18px;color:#2A1B0F;font-size:12px">
                                    A decadent chocolate log-shaped cake filled with rich cream.</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                  <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                    <tbody>
                      <tr>
                        <td align="left" style="padding:0;Margin:0;width:270px">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tbody>
                              <tr>
                                <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank"
                                    href="https://viewstripo.email"
                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2A1B0F;font-size:14px"><img
                                      class="adapt-img" alt=""
                                      style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                      width="270"></a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding:0;Margin:0;width:270px">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tbody>
                              <tr>
                                <td align="center" style="padding:0;Margin:0;padding-top:20px;font-size:0px">
                                  <a target="_blank" href="https://viewstripo.email"
                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2A1B0F;font-size:14px"><img
                                      class="adapt-img" alt=""
                                      style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"
                                      width="270"></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table><!--[if mso]></td></tr></table><![endif]-->
                </td>
              </tr>
              <tr>
                <td align="left"
                  style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:40px">
                  <table cellpadding="0" cellspacing="0" width="100%" role="none"
                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tbody>
                      <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tbody>
                              <tr>
                                <td align="center" style="padding:0;Margin:0"><!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                style="height:41px; v-text-anchor:middle; width:161px" arcsize="0%" stroke="f"  fillcolor="#bf9000">
		<w:anchorlock></w:anchorlock>
		<center style='color:#ffffff; font-family:Lexend, Arial, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>See more</center>
	</v:roundrect></a>
<![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border"
                                    style="border-style:solid;border-color:#2CB543;background:#BF9000;border-width:0px;display:inline-block;border-radius:0px;width:auto;mso-hide:all"><a
                                      href="https://viewstripo.email" class="es-button" target="_blank"
                                      style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;display:inline-block;background:#BF9000;border-radius:0px;font-family:Lexend, Arial, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;padding:10px 30px 10px 30px;mso-padding-alt:0;mso-border-alt:10px solid #BF9000">See
                                      more</a></span><!--<![endif]--></td>
                              </tr>
                            </tbody>
                          </table>
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
    </tbody>
  </table>`, // html body
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
