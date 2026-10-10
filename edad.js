// =====================================================
// CALCULADORA DE EDAD
// Este archivo hace que la página funcione.
// =====================================================


// PASO 1: "Agarramos" las partes de la página que vamos a usar.
const selDia = document.getElementById("dia");
const selMes = document.getElementById("mes");
const selAnio = document.getElementById("anio");
const formulario = document.getElementById("formEdad");
const resultado = document.getElementById("resultado");

// Los nombres de los meses, en orden
const nombresMeses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];


// PASO 2: Llenamos las tres listas.

// Lista de días: escribimos del 1 al 31
selDia.innerHTML = '<option value="">Día</option>';
for (let d = 1; d <= 31; d++) {
  selDia.innerHTML += `<option value="${d}">${d}</option>`;
}

// Lista de meses: escribimos Enero, Febrero, Marzo...
// (por dentro cada mes guarda su número: Enero = 1, Febrero = 2...)
selMes.innerHTML = '<option value="">Mes</option>';
nombresMeses.forEach(function (nombre, posicion) {
  selMes.innerHTML += `<option value="${posicion + 1}">${nombre}</option>`;
});

// Lista de años: desde este año hacia atrás, 120 años
const anioActual = new Date().getFullYear();
selAnio.innerHTML = '<option value="">Año</option>';
for (let a = anioActual; a >= anioActual - 120; a--) {
  selAnio.innerHTML += `<option value="${a}">${a}</option>`;
}


// PASO 3: Una ayudita para escribir mensajes en pantalla.
// Le das el texto y si es "ok" (sale verde) o "error" (sale rojo).
function mostrar(texto, tipo) {
  resultado.innerHTML = texto;
  resultado.className = tipo;
}


// PASO 4: ¿Qué pasa cuando le das clic a "Calcular"?
formulario.addEventListener("submit", function (evento) {

  // Evita que la página se recargue sola (si no, se borra todo)
  evento.preventDefault();

  // Leemos lo que eligió el usuario
  const dia = Number(selDia.value);
  const mes = Number(selMes.value);
  const anio = Number(selAnio.value);


  // REVISIÓN 1: ¿Eligió día, mes y año?
  if (!dia || !mes || !anio) {
    mostrar("Elige día, mes y año.", "error");
    return; // "return" = aquí nos detenemos, no seguimos
  }

  // Armamos la fecha de nacimiento.
  // OJO: para la computadora Enero es 0 y Diciembre es 11,
  // por eso le restamos 1 al mes.
  const nacimiento = new Date(anio, mes - 1, dia);

  // REVISIÓN 2: ¿La fecha existe de verdad?
  // Ejemplo: el 31 de febrero no existe. La computadora lo convierte
  // en otro día (2 o 3 de marzo), entonces el día ya no coincide.
  if (nacimiento.getDate() !== dia) {
    mostrar("Esa fecha no existe. Revisa el día y el mes.", "error");
    return;
  }

  // REVISIÓN 3: ¿No es una fecha del futuro?
  const hoy = new Date();
  if (nacimiento > hoy) {
    mostrar("La fecha no puede ser después de hoy.", "error");
    return;
  }


  // PASO 5: Sacamos la cuenta de años y meses.

  // Restamos: año de hoy menos año en que naciste
  let anios = hoy.getFullYear() - anio;

  // Restamos: mes de hoy menos mes en que naciste
  let meses = hoy.getMonth() - (mes - 1);

  // Si este mes todavía no llega tu día, aún no se completa el mes
  if (hoy.getDate() < dia) {
    meses = meses - 1;
  }

  // Si los meses salen negativos, es que todavía no cumples años este año.
  // Entonces quitamos un año y le sumamos 12 a los meses.
  if (meses < 0) {
    anios = anios - 1;
    meses = meses + 12;
  }

  // Mostramos la respuesta en verde
  mostrar(`Tienes <strong>${anios} años y ${meses} meses</strong>.`, "ok");
});
