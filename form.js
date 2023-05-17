let dataCount = 0;

export const createForm = () => {
  const form = document.createElement("form");
  form.id = "form";

  const degreeLabel = document.createElement("label");
  degreeLabel.textContent = "Grado del polinomio";
  const degreeInput = document.createElement("input");
  degreeInput.type = "number";
  degreeInput.step = "any";
  degreeInput.id = "degreeInput";
  degreeInput.required = true;

  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = "Datos de entrada";
  const dataInputsContainer = document.createElement("div");
  dataInputsContainer.id = "dataInputs";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "Agregar dato";
  addButton.addEventListener("click", addDataInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Calcular";

  fieldset.appendChild(legend);
  fieldset.appendChild(dataInputsContainer);
  fieldset.appendChild(addButton);

  form.appendChild(degreeLabel);
  form.appendChild(degreeInput);
  form.appendChild(fieldset);
  form.appendChild(submitButton);

  return form;
};

export function addDataInput() {
  const container = document.getElementById("dataInputs");

  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.step = "any";
  xInput.id = `x${dataCount}Input`;
  xInput.placeholder = "Valor de x";

  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.step = "any";
  yInput.id = `y${dataCount}Input`;
  yInput.placeholder = "Valor de y";

  container.appendChild(xInput);
  container.appendChild(yInput);

  dataCount++;
}
