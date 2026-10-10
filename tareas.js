// =====================================================
// LISTA DE TAREAS

// PASO 1: La lista "escondida" donde guardamos las tareas.
let tareas = [
  { descripcion: "Ejemplo: hacer la tarea de DWI", completada: false }
];


// PASO 2: "Agarramos" las partes de la página que vamos a usar
const formulario = document.getElementById("formTarea");
const inputTarea = document.getElementById("nuevaTarea");
const lista = document.getElementById("lista");


// PASO 3: renderTasks() = "dibujar la lista".
// Borra lo que hay en pantalla y lo vuelve a dibujar desde cero.
function renderTasks() {

  // Borramos todo lo que se ve
  lista.innerHTML = "";

  // Hacemos una copia y la ordenamos:
  const ordenadas = [...tareas].sort(function (a, b) {
    return a.completada - b.completada;
  });

  ordenadas.forEach(function (tarea) {

    const renglon = document.createElement("li");

    if (tarea.completada) {
      renglon.classList.add("completada");
    }

    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = tarea.completada; // palomeada si ya está hecha

    casilla.addEventListener("change", function () {
      tarea.completada = !tarea.completada; // si era true pasa a false y al revés
      renderTasks();
    });

    const texto = document.createElement("span");
    texto.textContent = tarea.descripcion;

    // --- El botón de eliminar ---
    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Eliminar";
    btnBorrar.className = "borrar";

    // Al darle clic: quitamos esta tarea de la lista y volvemos a dibujar
    btnBorrar.addEventListener("click", function () {
      // "filter" se queda con todas las tareas MENOS esta
      tareas = tareas.filter(function (otra) {
        return otra !== tarea;
      });
      renderTasks();
    });

    // Metemos la casilla, el texto y el botón dentro del renglón
    renglon.append(casilla, texto, btnBorrar);

    // Y ponemos el renglón en la lista de la pantalla
    lista.appendChild(renglon);
  });
}


// PASO 4: ¿Qué pasa cuando agregas una tarea (Enter o botón)?
formulario.addEventListener("submit", function (evento) {

  // Evita que la página se recargue sola
  evento.preventDefault();

  // Leemos lo que escribió (trim quita espacios de más al inicio y al final)
  const texto = inputTarea.value.trim();

  // Si no escribió nada, no hacemos nada
  if (texto === "") return;

  // Agregamos la tarea nueva a la lista escondida (como pendiente)
  tareas.push({ descripcion: texto, completada: false });

  // Limpiamos la cajita para escribir otra
  inputTarea.value = "";

  // Volvemos a dibujar
  renderTasks();
});


// PASO 5: Dibujamos la lista por primera vez cuando abre la página
renderTasks();
