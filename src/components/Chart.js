import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import chartImage from "../assets/grafico.jpg";

function Chart({ results, onReset }) {
  // The scale factor has been calc by size of the circle chart to scale and fit lines
  const scaleFactor = 10.25;
  const canvasRef = useRef(null);
  const downloadRef = useRef(null);

  function drawChart() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Chart image
    let img = new Image();
    img.onload = function () {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      ctx.lineWidth = 7;
      const center = canvas.width / 2;

      // Calc points
      const ax = center - results.a * scaleFactor;
      const ay = center - results.a * scaleFactor;
      const bx = center - results.b * scaleFactor;
      const by = center + results.b * scaleFactor;
      const cx = center + results.c * scaleFactor;
      const cy = center + results.c * scaleFactor;
      const dx = center + results.d * scaleFactor;
      const dy = center - results.d * scaleFactor;

      // Draw lines
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(cx, cy);
      ctx.lineTo(dx, dy);
      ctx.lineTo(ax, ay);
      ctx.stroke();
      ctx.closePath();
    };
    img.src = chartImage;
  }

  function handleDownload() {
    const download = downloadRef.current;
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    download.setAttribute("href", image);
    download.click();
  }

  useEffect(() => {
    drawChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card">
        <h2 style={{ color: "#000", textAlign: "center" }}>Resultados</h2>
        <canvas ref={canvasRef}></canvas>
        <div className="legend">
          <div>
            <span className="blue"></span> A ({results.a}): Lógico, Analítico,
            Hechos, Cuantitativo.
          </div>
          <div>
            <span className="green"></span> B ({results.b}): Organizador,
            Secuencial, Planeador, Detallado
          </div>
          <div>
            <span className="red"></span> C ({results.c}): Interpersonal,
            Sentimientos, Estético, Emocional
          </div>
          <div>
            <span className="yellow"></span> D ({results.d}): Holístico,
            Intuitivo, Integrador, Sintetizador
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        style={{ marginTop: "25px" }}
      >
        <FontAwesomeIcon icon={faDownload} style={{ marginRight: "8px" }} />{" "}
        Descargar
      </button>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        ref={downloadRef}
        download="test-herrmann.png"
        style={{ display: "none" }}
      >
        Link de descarga
      </a>
      {onReset && (
        <button onClick={onReset} style={{ margin: "25px 0" }}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "8px" }} />{" "}
          Ir al inicio
        </button>
      )}
    </>
  );
}

export default Chart;
