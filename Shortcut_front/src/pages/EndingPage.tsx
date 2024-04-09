import { useNavigate } from "react-router-dom";

function EndingPage() {
    const navigate = useNavigate();

    const renvoiAccueil = () => {
      
      navigate("/");
    }

  return (
    <div className="fontFasterStroker bg-slate-50 flex justify-between">
      {/* IMAGE */}
      <div className="bg-green-50 flex items-end h-screen">
        <img className="h-[90%]" src="/images/image_result.png" />
      </div>

      <div className=" flex flex-col justify-center p-4 gap-16 bg-slate-50 pr-20">
        {/* CARD */}
        <div className="flex flex-col gap-4 bg-green-300 justify-center items-center h-[90vh] rounded-xl py-10 px-6">
          <p className="text-4xl mb-8 w-[60%] text-center text-red-600">
            Félicitation 🥳
          </p>
          <p className="text-lg text-gray-500 w-[70%] text-center">
            Tu vas recevoir ton régime totalement personalisé par mail ! 🥗
          </p>

          <div className="h-1 w-1/2 bg-green-600 my-6"></div>

          {/* ======= BOUTON */}
          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="flex hover:scale-105 justify-between gap-2 items-center hover:cursor-pointer">
              <p className="text-2xl text-red-600" onClick={renvoiAccueil}>
                Retour à l'accueil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndingPage;
