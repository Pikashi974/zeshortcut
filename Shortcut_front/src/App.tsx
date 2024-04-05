import { RouterProvider } from "react-router-dom";
import router from "./router";
import * as context from "./utils/context";
import { useState } from "react";

export const NomContext = context.NomContext();
export const EmailContext = context.EmailContext();
export const AgeContext = context.AgeContext();
export const PoidsContext = context.PoidsContext();
export const TailleContext = context.TailleContext();
export const GenreContext = context.GenreContext();
export const ActiviteContext = context.ActiviteContext();
export const NbJourEntrainementContext = context.NbJourEntrainementContext();
export const IntensiteEntrainementContext =
  context.IntensiteEntrainementContext();

function App() {
  const [nom, setNom] = useState("");
  const [age, setAge] = useState(0);
  const [poids, setPoids] = useState(0);
  const [taille, setTaille] = useState(0);
  const [genre, setGenre] = useState(false);
  const [activite, setActivite] = useState("");
  const [NbJourEntrainement, setNbJourEntrainement] = useState(0);
  const [intensiteEntrainement, setintensiteEntrainement] = useState("");
  const [email, setEmail] = useState("");

  return (
    <NomContext.Provider value={{ nom, setNom }}>
      <EmailContext.Provider value={{ email, setEmail }}>
        <AgeContext.Provider value={{ age, setAge }}>
          <PoidsContext.Provider value={{ poids, setPoids }}>
            <TailleContext.Provider value={{ taille, setTaille }}>
              <GenreContext.Provider value={{ genre, setGenre }}>
                <ActiviteContext.Provider value={{ activite, setActivite }}>
                  <NbJourEntrainementContext.Provider
                    value={{
                      NbJourEntrainement,
                      setNbJourEntrainement,
                    }}
                  >
                    <IntensiteEntrainementContext.Provider
                      value={{
                        intensiteEntrainement,
                        setintensiteEntrainement,
                      }}
                    >
                      <>
                        <RouterProvider router={router} />
                      </>
                    </IntensiteEntrainementContext.Provider>
                  </NbJourEntrainementContext.Provider>
                </ActiviteContext.Provider>
              </GenreContext.Provider>
            </TailleContext.Provider>
          </PoidsContext.Provider>
        </AgeContext.Provider>
      </EmailContext.Provider>
    </NomContext.Provider>
  );
}

export default App;
