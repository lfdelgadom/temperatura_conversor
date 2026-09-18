(() => {
  "use strict";

  const units = {
    celsius: { symbol: "°C", name: "Celsius", absoluteZero: -273.15 },
    fahrenheit: { symbol: "°F", name: "Fahrenheit", absoluteZero: -459.67 },
    kelvin: { symbol: "K", name: "Kelvin", absoluteZero: 0 }
  };

  const elements = {
    form: document.querySelector("#temperature-form"),
    temperature: document.querySelector("#temperature"),
    fromUnit: document.querySelector("#from-unit"),
    toUnit: document.querySelector("#to-unit"),
    inputUnit: document.querySelector("#input-unit"),
    swapButton: document.querySelector("#swap-button"),
    clearButton: document.querySelector("#clear-button"),
    validationMessage: document.querySelector("#validation-message"),
    resultPanel: document.querySelector("#result-panel"),
    result: document.querySelector("#result"),
    formulaSummary: document.querySelector("#formula-summary"),
    thermalLabel: document.querySelector("#thermal-label"),
    thermalIcon: document.querySelector("#thermal-icon"),
    thermalIndicator: document.querySelector("#thermal-indicator")
  };

  function toCelsius(value, unit) {
    if (unit === "fahrenheit") return (value - 32) * 5 / 9;
    if (unit === "kelvin") return value - 273.15;
    return value;
  }

  function fromCelsius(value, unit) {
    if (unit === "fahrenheit") return value * 9 / 5 + 32;
    if (unit === "kelvin") return value + 273.15;
    return value;
  }

  function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    return fromCelsius(toCelsius(value, fromUnit), toUnit);
  }

  function formatNumber(value) {
    const normalizedValue = Math.abs(value) < 0.005 ? 0 : value;
    return new Intl.NumberFormat("es-CO", {
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(normalizedValue);
  }

  function validateInput() {
    const rawValue = elements.temperature.value.trim();
    const fromUnit = elements.fromUnit.value;

    if (rawValue === "") {
      return { isValid: false, isEmpty: true, message: "Ingresa una temperatura para realizar la conversión." };
    }

    const value = Number(rawValue);
    if (!Number.isFinite(value)) {
      return { isValid: false, isEmpty: false, message: "Escribe un número válido y finito." };
    }

    const limit = units[fromUnit].absoluteZero;
    if (value < limit) {
      return {
        isValid: false,
        isEmpty: false,
        message: `La temperatura mínima en ${units[fromUnit].name} es ${formatNumber(limit)} ${units[fromUnit].symbol} (cero absoluto).`
      };
    }

    return { isValid: true, value };
  }

  function getThermalState(celsius) {
    if (celsius < 0) return { level: "very-cold", label: "Muy fría", icon: "❄", position: 8 };
    if (celsius < 15) return { level: "cold", label: "Fría", icon: "◈", position: 28 };
    if (celsius < 28) return { level: "mild", label: "Templada", icon: "◉", position: 50 };
    if (celsius < 40) return { level: "hot", label: "Caliente", icon: "☀", position: 73 };
    return { level: "very-hot", label: "Muy caliente", icon: "♨", position: 92 };
  }

  function resetResult(message = "Ingresa una temperatura") {
    elements.result.textContent = message;
    elements.formulaSummary.textContent = "La conversión aparecerá automáticamente.";
    elements.thermalLabel.textContent = "Sin datos";
    elements.thermalIcon.textContent = "◉";
    elements.resultPanel.className = "result-panel is-empty";
    elements.resultPanel.removeAttribute("data-level");
    elements.thermalIndicator.style.setProperty("--meter-position", "50%");
  }

  function showValidation(validation) {
    elements.validationMessage.textContent = validation.message;
    elements.temperature.classList.toggle("is-invalid", !validation.isEmpty);
    elements.temperature.classList.remove("is-valid");
    elements.temperature.setAttribute("aria-invalid", String(!validation.isEmpty));
    resetResult(validation.isEmpty ? "Ingresa una temperatura" : "No disponible");
  }

  function animateResult() {
    elements.resultPanel.classList.remove("has-result");
    void elements.resultPanel.offsetWidth;
    elements.resultPanel.classList.add("has-result");
  }

  function updateConversion() {
    const validation = validateInput();
    elements.inputUnit.textContent = units[elements.fromUnit.value].symbol;

    if (!validation.isValid) {
      showValidation(validation);
      return;
    }

    const fromUnit = elements.fromUnit.value;
    const toUnit = elements.toUnit.value;
    const convertedValue = convertTemperature(validation.value, fromUnit, toUnit);
    const celsiusValue = toCelsius(convertedValue, toUnit);
    const thermalState = getThermalState(celsiusValue);

    elements.validationMessage.textContent = "";
    elements.temperature.classList.remove("is-invalid");
    elements.temperature.classList.add("is-valid");
    elements.temperature.setAttribute("aria-invalid", "false");
    elements.result.textContent = `${formatNumber(convertedValue)} ${units[toUnit].symbol}`;
    elements.formulaSummary.textContent = `${formatNumber(validation.value)} ${units[fromUnit].symbol} equivalen a ${formatNumber(convertedValue)} ${units[toUnit].symbol}.`;
    elements.thermalLabel.textContent = thermalState.label;
    elements.thermalIcon.textContent = thermalState.icon;
    elements.resultPanel.className = "result-panel";
    elements.resultPanel.dataset.level = thermalState.level;
    elements.thermalIndicator.style.setProperty("--meter-position", `${thermalState.position}%`);
    animateResult();
  }

  function swapUnits() {
    const previousFromUnit = elements.fromUnit.value;
    elements.fromUnit.value = elements.toUnit.value;
    elements.toUnit.value = previousFromUnit;
    updateConversion();
  }

  function clearConverter() {
    elements.form.reset();
    elements.validationMessage.textContent = "";
    elements.temperature.classList.remove("is-invalid", "is-valid");
    elements.temperature.removeAttribute("aria-invalid");
    elements.inputUnit.textContent = units[elements.fromUnit.value].symbol;
    resetResult();
    elements.temperature.focus();
  }

  elements.form.addEventListener("submit", (event) => event.preventDefault());
  elements.temperature.addEventListener("input", updateConversion);
  elements.fromUnit.addEventListener("change", updateConversion);
  elements.toUnit.addEventListener("change", updateConversion);
  elements.swapButton.addEventListener("click", swapUnits);
  elements.clearButton.addEventListener("click", clearConverter);

  resetResult();
})();
