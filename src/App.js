import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Header, Footer, Chart } from "./components";
import options from "./data";
import "./App.css";

const initialResults = { a: 0, b: 0, c: 0, d: 0 };

function App() {
  const [totals, setTotals] = useState(initialResults);
  const [step, setStep] = useState(-1);

  function handleStart() {
    setStep(0);
  }

  function handleReset() {
    setTotals(initialResults);
    setStep(-1);
  }

  function handleSelectOption(index) {
    const letter = options[step][index].group;
    setTotals((state) => ({
      ...state,
      [letter]: state[letter] + 1,
    }));
    setStep((step) => step + 1);
  }

  return (
    <>
      <Header />
      <main>
        {step >= options.length && (
          <Chart results={totals} onReset={handleReset} />
        )}
        {step > -1 && step < options.length && (
          <>
            <p style={{ marginBottom: "40px" }}>
              Selecciona la palabra que más concuerda contigo:
            </p>
            {options[step].map((op, i) => (
              <>
                <button type="button" onClick={() => handleSelectOption(i)}>
                  {op.label}
                </button>
                {i === 0 && <p style={{ margin: "15px 0" }}>vs</p>}
              </>
            ))}
          </>
        )}
        {step < 0 && (
          <div style={{ position: "relative", top: "-35px" }}>
            <p>
              El <strong>test de Herrmann</strong> de dominancia cerebral se
              basa en el modelo de los cuatro cuadrantes del mismo autor: Ned
              Herrmann.
            </p>
            <p style={{ marginBottom: "30px" }}>
              ¿Qué parte domina tu mente? ¿Eres una persona más lógica o
              emocional? ¡Descúbrelo!
            </p>
            <button type="button" onClick={handleStart}>
              <FontAwesomeIcon icon={faPlay} style={{ marginRight: "8px" }} />{" "}
              Comenzar
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
