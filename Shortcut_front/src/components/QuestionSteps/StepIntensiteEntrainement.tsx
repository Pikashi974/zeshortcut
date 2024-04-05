import { useContext } from "react";
import { useWizard } from "react-use-wizard";
import { IntensiteEntrainementContext } from "../../App";

const StepIntensiteEntrainement = () => {
  const { handleStep, nextStep } = useWizard();

  const { setintensiteEntrainement } = useContext(IntensiteEntrainementContext);

  handleStep(() => {
    setintensiteEntrainement((document.getElementsByName("intensite")[0] as HTMLInputElement).value);
  });

  return (
    <div className="flex flex-col min-h-screen fontFasterStroker">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 pl-20">
          {/* FORM */}
          <div className="flex flex-col gap-4 p-2">
            <p className="text-3xl my-10">Quel est votre intensite</p>
            <input
              type="text"
              name="intensite"
              placeholder="Nom ..."
              className="bg-green-50 p-2 rounded-xl w-[60%] mb-5 border-2 border-green-900"
            />

            {/* BUTTON */}
              <button className="bg-green-800 py-3 px-4 w-[60%] text-slate-100 rounded-xl" onClick={() => nextStep()}>Suivant</button>
          </div>
        </div>

        <div className="flex justify-end items-center h-screen">
          <img className="h-full" src="/images/image_question.png" />
        </div>
      </div>
    </div>
  );
};

export default StepIntensiteEntrainement;
