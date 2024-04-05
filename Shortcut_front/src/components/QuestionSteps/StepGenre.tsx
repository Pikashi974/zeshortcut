import { useContext } from "react";
import { useWizard } from "react-use-wizard";
import { GenreContext } from "../../App";

const StepGenre = () => {
  const { nextStep, previousStep } = useWizard();

  const { setGenre } = useContext(GenreContext);

  return (
    <div className="flex flex-col min-h-screen fontFasterStroker">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 pl-20">
          {/* FORM */}
          <div className="flex flex-col gap-4 p-2">
            <p className="text-3xl my-10">Quel est votre genre ?</p>
            <div>
              <div onClick={() => setGenre(true)}>
                <p>Homme</p>
              </div>

              <div onClick={() => setGenre(false)}>
                <p>Femme</p>
              </div>
            </div>

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

export default StepGenre;
