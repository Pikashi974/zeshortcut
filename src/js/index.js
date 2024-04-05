function checkElement(id) {
  if (document.getElementById(id).value != "") {
    return document.getElementById(id).value;
  } else throw Error("No data given");
}

async function addAliment() {
  let data = {
    nom: checkElement("nom"),
    calories: parseFloat(checkElement("nbCalories")),
    proteines: parseFloat(checkElement("nbProteines")),
    glucides: parseFloat(checkElement("nbGlucides")),
    lipides: parseFloat(checkElement("nbLipides")),
    etiquette: getRepas(),
  };
  let bodyContent = JSON.stringify(data);
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let response = await fetch("./aliment/add", {
    method: "POST",
    headers: headersList,
    body: bodyContent,
  });

  console.log(response);

  let responseText = await response.text();
  switch (responseText) {
    case "Success":
      var toastLiveExample = document.getElementById("liveToast");
      var toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
      break;

    default:
      var toastLiveExample = document.getElementById("failToast");
      var toast = new bootstrap.Toast(toastLiveExample);

      toast.show();
      break;
  }
}

function getRepas() {
  let tab = [];
  var repas = document.getElementById("labelMeal");
  repas.querySelectorAll("input:checked").forEach((element) => {
    tab.push(element.name);
  });
  return tab;
}
