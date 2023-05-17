import * as math from "mathjs";
import Chart, {
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js/auto";
import { createForm, addDataInput } from "./form";

let chart;

function polynomialRegression(xData, yData, degree) {
  const xMatrix = [];
  const yMatrix = [];

  for (let i = 0; i < xData.length; i++) {
    let row = [];
    let x = xData[i];

    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(x, j));
    }

    xMatrix.push(row);
    yMatrix.push([yData[i]]);
  }

  const xMatrixT = math.transpose(xMatrix);
  const xMatrixT_xMatrix = math.multiply(xMatrixT, xMatrix);
  const xMatrixT_xMatrix_inv = math.inv(xMatrixT_xMatrix);
  const xMatrixT_yMatrix = math.multiply(xMatrixT, yMatrix);

  const coefficients = math.multiply(xMatrixT_xMatrix_inv, xMatrixT_yMatrix);
  return Array.from(coefficients).flat();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const degree = parseFloat(document.getElementById("degreeInput").value);
  const xData = [];
  const yData = [];

  for (let i = 0; i <= degree; i++) {
    const x = parseFloat(document.getElementById(`x${i}Input`).value);
    const y = parseFloat(document.getElementById(`y${i}Input`).value);

    xData.push(x);
    yData.push(y);
  }

  const coefficients = polynomialRegression(xData, yData, degree);

  console.log(coefficients);

  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  Chart.register(LinearScale, PointElement, LineElement, Tooltip);

  const labels = xData.map((x, index) => `(${x}, ${yData[index]})`);

  if (chart) {
    chart.destroy(); // Destruye la instancia de Chart existente si ya existe
  }

  chart = new Chart(ctx, {
    type: "scatter",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Datos",
          data: xData.map((x, index) => ({ x: x, y: yData[index] })),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Regresion",
          data: [],
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
          id: "regressionLine",
        },
      ],
    },

    options: {
      responsive: true,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
        y: {
          type: "linear",
          position: "left",
        },
      },
    },
  });

  const regressionLineData = [];
  for (let x = Math.min(...xData); x <= Math.max(...xData); x += 0.1) {
    let y = 0;
    for (let i = 0; i <= degree; i++) {
      y += coefficients[i] * Math.pow(x, i);
    }
    regressionLineData.push({ x: x, y: y });
  }

  chart.data.datasets.find((dataset) => dataset.id === "regressionLine").data =
    regressionLineData;
  chart.update();
}

const form = createForm();
form.addEventListener("submit", handleFormSubmit);
document.body.appendChild(form);

let dataCount = 0;

window.addDataInput = addDataInput;
