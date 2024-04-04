
function HomePage() {
  return (
    <div className="flex flex-col min-h-screen fontFasterStroker bg-green-50">
      <header className="bg-[url('public/images/header.png')] h-20"></header>

      <div className="bg-[url('public/images/main.png')] flex-1 flex justify-between">
        <div className="flex-1 flex flex-col justify-center p-4 gap-16 bg-green-50 pl-20">
          <div className="flex flex-col gap-4">
            <h1 className=" text-6xl text-red-600">Shortcut</h1>
            <p className="text-3xl mb-8">Le raccourci vers le bonheur</p>
            <p className="text-lg text-gray-500">
              Réponds aux questions et obtiens ton régime personalisé !
            </p>
          </div>

          <button className="text-2xl bg-green-400 rounded-xl px-4 py-2 w-1/3 hover:scale-105">
            Commencez
          </button>
        </div>

        <div className=" bg-green-50 flex justify-end items-center">
          <img className="max-h-[80%]" src="public/images/image_home.png" />
        </div>
      </div>

      <footer className="bg-[url('public/images/footer.png')] h-20"></footer>
    </div>
  );
}

export default HomePage