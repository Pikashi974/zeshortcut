import { useContext } from "react";
import { useWizard } from "react-use-wizard";
import { AgeContext } from "../../App";

const StepAge = () => {
  const { handleStep, nextStep, previousStep } = useWizard();

  const { setAge } = useContext(AgeContext);

  handleStep(() => {
    setAge((document.getElementsByName("age")[0] as HTMLInputElement).valueAsNumber);
  });

  return (
    <div className="flex flex-col min-h-screen fontFasterStroker">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 pl-20">
          {/* FORM */}
          <div className="flex flex-col gap-4 p-2">
            <p className="text-3xl my-10">Tu as quelle âge ?</p>
            <input
              type="number"
              name="age"
              placeholder="Age ..."
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
            </div>{" "}
          </div>
        </div>

        <div className="flex justify-end items-center h-screen">
          <img className="h-full" src="/images/image_question.png" />
        </div>
      </div>
    </div>
  );
};

export default StepAge;
