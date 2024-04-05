function ResultPage() {
  return (
    <div className="fontFasterStroker bg-slate-50 flex justify-between">
      {/* IMAGE */}
      <div className="bg-green-50 flex items-end h-screen">
        <img className="h-[90%]" src="/images/image_result.png" />
      </div>

      <div className=" flex flex-col justify-center p-4 gap-16 bg-slate-50 pr-20">
        {/* CARD */}
        <div className="flex flex-col gap-4 bg-green-300 items-center h-[90vh] rounded-xl py-10 px-6">
          <p className="text-3xl mb-8 w-[60%] text-center">
            Vous avez un besoin calorique de
          </p>
          <p className=" text-6xl text-red-600">2000 Cal</p>
          <p className="text-xl mt-8">Choisissez votre objectif</p>
          <p className="text-lg text-gray-500 w-[70%] text-center">
            Vous recevrez votre régime totalement personalisé par mail !
          </p>

          <div className="h-1 w-1/2 bg-green-600 my-6"></div>

          {/* ======= BOUTON */}
          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="flex hover:scale-105 justify-between gap-2 items-center hover:cursor-pointer">
              <img className="w-11" src="/images/icon1.png" />
              <p className="text-3xl">Perdre du poids</p>
            </div>

            <div className="flex hover:scale-105 justify-between gap-2 items-center hover:cursor-pointer">
              <img className="w-11" src="/images/icon2.png" />
              <p className="text-3xl">Gagner en masse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
