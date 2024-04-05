import { useContext } from "react";
import { useWizard } from "react-use-wizard";
import { NbJourEntrainementContext } from "../../App";

const StepNbJourEntrainement = () => {
  const { handleStep, nextStep, previousStep } = useWizard();

  const { setNbJourEntrainement } = useContext(NbJourEntrainementContext);

  handleStep(() => {
    setNbJourEntrainement(
      (document.getElementsByName("jourEntrainement")[0] as HTMLInputElement)
        .valueAsNumber
    );
  });

  return (
    <div className="flex flex-col min-h-screen fontFasterStroker">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 pl-20">
          {/* FORM */}
          <div className="flex flex-col gap-4 p-2">
            <p className="text-3xl my-10">
              Combien de jour d'entrainement dans la semaine ?
            </p>
            <input
              type="number"
              name="jourEntrainement"
              placeholder="Je m'entraine ..."
              className="bg-green-50 p-2 rounded-xl w-[60%] mb-5 border-2 border-green-900"
            />

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
                onClick={() => nextStep()}
              >
                Suivant
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

export default StepNbJourEntrainement;
