import { useContext } from "react";
import { useWizard } from "react-use-wizard";
import { EmailContext, NomContext, AgeContext, GenreContext, ActiviteContext, IntensiteEntrainementContext, NbJourEntrainementContext, TailleContext, PoidsContext } from "../../App";

const StepSubmit = () => {
  const { previousStep } = useWizard();

  const { nom } = useContext(NomContext);
  const { age } = useContext(AgeContext);
  const {genre} = useContext(GenreContext);  
  const {activite} = useContext(ActiviteContext);  
  const {intensiteEntrainement} = useContext(IntensiteEntrainementContext);  
  const {NbJourEntrainement} = useContext(NbJourEntrainementContext);  
  const {taille} = useContext(TailleContext);  
  const {poids} = useContext(PoidsContext);  
  const {email} = useContext(EmailContext);  

  
  
  const submit = () => {    
    const array = [email, nom, age, genre, activite, intensiteEntrainement, NbJourEntrainement, taille, poids];
    // location.href = "/result";
    alert(array);
  };

  return (
    <div className="flex flex-col min-h-screen fontFasterStroker">
      <div className="flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 pl-20">
          {/* FORM */}
          <div className="flex flex-col gap-4 p-2">
            <p className="text-3xl my-10">Validez vos résultats</p>

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

