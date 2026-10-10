// =====================================================
// CONVERTIDOR DE TEMPERATURA
// Este archivo hace que la página funcione.
// =====================================================


// PASO 1: "Agarramos" las partes de la página que vamos a usar
const inputValor = document.getElementById("valor");
const selOrigen = document.getElementById("origen");
const selDestino = document.getElementById("destino");
const boton = document.getElementById("btnConvertir");
const formulario = document.getElementById("formTemp");
const resultado = document.getElementById("resultado");

// Para escribir el nombre completo en la respuesta (C = Celsius, etc.)
const nombres = { C: "Celsius", F: "Fahrenheit", K: "Kelvin" };


// PASO 2: Revisar si ya llenó las 3 cosas.
// Si sí, prendemos el botón. Si falta algo, lo dejamos apagado.
function revisarCampos() {
  const todoLleno =
    inputValor.value !== "" &&   // ¿escribió un número?
    selOrigen.value !== "" &&    // ¿eligió "De"?
    selDestino.value !== "";     // ¿eligió "A"?

  // Si todo está lleno, el botón NO está apagado
  boton.disabled = !todoLleno;
}

// Cada vez que el usuario escribe o elige algo, volvemos a revisar
inputValor.addEventListener("input", revisarCampos);
selOrigen.addEventListener("change", revisarCampos);
selDestino.addEventListener("change", revisarCampos);


// PASO 3: Las fórmulas para convertir.
// Truco: primero pasamos todo a Celsius,
// y luego de Celsius a la unidad que queremos.
// Así no tenemos que escribir muchas fórmulas.
function convertir(valor, origen, destino) {
  let celsius;

  // Primero: lo pasamos a Celsius
  if (origen === "C") celsius = valor;
  if (origen === "F") celsius = (valor - 32) * 5 / 9;
  if (origen === "K") celsius = valor - 273.15;

  // Después: de Celsius a lo que pidió
  if (destino === "C") return celsius;
  if (destino === "F") return celsius * 9 / 5 + 32;
  if (destino === "K") return celsius + 273.15;
}


// PASO 4: ¿Qué pasa cuando le das clic a "Convertir"?
formulario.addEventListener("submit", function (evento) {

  // Evita que la página se recargue sola
  evento.preventDefault();

  // Leemos lo que puso el usuario
  const valor = Number(inputValor.value);
  const origen = selOrigen.value;
  const destino = selDestino.value;

  // Hacemos la conversión
  const respuesta = convertir(valor, origen, destino);

  // Dejamos solo 2 decimales para que se vea bonito
  const redondeado = Number(respuesta.toFixed(2));

  // Mostramos la respuesta en verde, debajo del formulario
  resultado.className = "ok";
  resultado.textContent = `${valor} ${nombres[origen]} son ${redondeado} ${nombres[destino]}`;
});
