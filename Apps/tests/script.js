document.addEventListener("DOMContentLoaded", () => {
    fetch("/Apps/tests/cuestionarios.json")
      .then(response => response.json())
      .then(data => {
        renderizarMapas(data);
        agregarEventosDeClic(data);
  
        // Seleccionar un mapa aleatorio al inicio
        const mapaAleatorio = data[Math.floor(Math.random() * data.length)];
        actualizarMapaSeleccionado(mapaAleatorio);
  
        // Marcarlo como activo
        document.querySelector(`.mapa[data-id="${mapaAleatorio.id}"]`).classList.add("active");
      })
      .catch(error => console.error("Error cargando JSON:", error));
  });
  
  function renderizarMapas(mapas) {
    const contenedorMapas = document.querySelector(".contenedor-mapas-interactivos");
    contenedorMapas.innerHTML = ""; 
  
    mapas.forEach(mapa => {
      let divMapa = document.createElement("div");
      divMapa.classList.add("mapa");
      divMapa.setAttribute("data-id", mapa.id);
      divMapa.setAttribute("data-periodo", mapa.periodo);
  
      divMapa.innerHTML = `
        <h1>${mapa.titulo}</h1>
        <img src="${mapa.imagen}" alt="${mapa.titulo}">
      `;
  
      contenedorMapas.appendChild(divMapa);
    });
  }
  
  function agregarEventosDeClic(mapas) {
    document.querySelectorAll(".mapa").forEach(mapaElement => {
      mapaElement.addEventListener("click", () => {
        const mapaId = mapaElement.getAttribute("data-id");
        const mapaSeleccionado = mapas.find(mapa => mapa.id === mapaId);
        const menu = document.getElementById("menu-mapa");

        /// menu.classList.remove("active") * Descomentar si se quiere cerrar el menú al seleccionar un mapa

        document.querySelectorAll(".mapa").forEach(m => m.classList.remove("active"));

        if (mapaSeleccionado) {
          actualizarMapaSeleccionado(mapaSeleccionado);
          mapaElement.classList.add("active")
        }
      });
    });
  }
  
  function actualizarMapaSeleccionado(mapa) {
    document.getElementById("titulo-mapa-seleccionado").textContent = mapa.titulo;
    document.getElementById("descripcion-mapa-seleccionado").textContent = mapa.descripcion;
    document.getElementById("periodo-mapa-selecionado").textContent = mapa.periodo;
    document.getElementById("periodo-mapa-selecionado").className = "";
    document.getElementById("periodo-mapa-selecionado").classList.add(mapa.clasePeriodo);
    document.querySelector("#mapa-seleccionado img").src = mapa.imagen;
    document.getElementById("mapa").src = mapa.srcMapa;
    document.getElementById("enlace-mapa-seleccionado").href = mapa.hrefMapa;
  }

var abrirMapa = document.getElementById("abrir-menu");

abrirMapa.addEventListener("click", () => {
    const menu = document.getElementById("menu-mapa");

    menu.classList.add("active")
});  
  
var cerrarMapa = document.getElementById("cerrar-menu");

cerrarMapa.addEventListener("click", () => {
    const menu = document.getElementById("menu-mapa");

    menu.classList.remove("active")
});

function filtrarCuestionarios() {
  let input = document.getElementById("buscador").value.toLowerCase();
  let cuestionarios = document.querySelectorAll(".mapa");

  cuestionarios.forEach(cuestionario => {
      let nombre = cuestionario.getAttribute("data-id");
      if (nombre.includes(input)) {
          cuestionario.style.display = "flex";
      } else {
          cuestionario.style.display = "none";
      }
  });
}

function filtrarPorPeriodo() {
  let periodoSeleccionado = document.getElementById("periodo").value;
  let cuestionarios = document.querySelectorAll(".mapa");

  cuestionarios.forEach(cuestionario => {
      let periodo = cuestionario.getAttribute("data-periodo");

      if (periodoSeleccionado === "todos" || periodo === periodoSeleccionado) {
          cuestionario.style.display = "flex"; // Muestra el cuestionario
      } else {
          cuestionario.style.display = "none"; // Oculta si no coincide
      }
  });
}
