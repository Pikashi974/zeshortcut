import { useContext } from "react";
import { useWizard } from "react-use-wizard";
import * as calcul from "../../utils/calcul";
import {
  EmailContext,
  NomContext,
  AgeContext,
  GenreContext,
  ActiviteContext,
  TailleContext,
  PoidsContext,
  CalorieContext,
} from "../../App";
import { useNavigate } from "react-router-dom";

const StepSubmit = () => {
  const { previousStep } = useWizard();

  const { nom } = useContext(NomContext);
  const { age } = useContext(AgeContext);
  const { genre } = useContext(GenreContext);
  const { activite } = useContext(ActiviteContext);
  const { taille } = useContext(TailleContext);
  const { poids } = useContext(PoidsContext);
  const { email } = useContext(EmailContext);
  const { setCalorie } = useContext(CalorieContext);
  const navigate = useNavigate();

  const submit = () => {
    if (genre === true) {
      const calorie = calcul.calculHome(poids, taille, age, activite);
      setCalorie(calorie);
    } else {
      const calorie = calcul.calculFemme(poids, taille, age, activite);
      setCalorie(calorie);
    }
    navigate("/result");
  };

  return (
    <div className="flex flex-col min-h-screen fontFasterStroker">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 pl-20">
          {/* FORM */}
          <div className="flex flex-col gap-4 p-2 justify-center items-center">
            <div className="flex flex-col text-red-500 gap-2 justify-center items-center bg-green-300 px-6 py-10 rounded-xl text-xl">
              <p className="text-3xl text-red-600 mb-5 underline">
                Récapitulatif de tes informations
              </p>
              <p>
                Nom: <span className="font-bold text-black">{nom}</span>
              </p>
              <p>
                Âge: <span className="font-bold text-black">{age} ans</span>
              </p>
              {genre == true ? <p>Tu es un Homme</p> : <p>Tu es une Femme</p>}
              <p>Ton activité: <span className="font-bold text-black">{activite}</span></p>
              <p>Ta taille: <span className="font-bold text-black">{taille}cm</span></p>
              <p>Ton poids: <span className="font-bold text-black">{poids}Kg</span></p>
              <p>Email: <span className="font-bold text-black">{email}</span></p>
            </div>
            <p className="text-3xl my-10 text-center">Obtenir mes résultats</p>

            {/* BUTTON */}
            <div className="flex gap-4 w-[60%]">
              <button
                className="bg-green-800 py-3 px-4 text-slate-100 rounded-xl flex-1"
                onClick={() => previousStep()}
              >
                Précédent
              </button>
              <button
                className="bg-green-800 py-3 px-4 text-slate-100 rounded-xl flex-1"
                onClick={() => submit()}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center h-screen">
          <img className="h-full" src="/images/image_question.png" />
        </div>
      </div>
    </div>
  );
};

export default StepSubmit;
