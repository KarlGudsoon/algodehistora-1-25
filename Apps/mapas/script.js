document.addEventListener("DOMContentLoaded", () => {
    fetch("/Apps/mapas/mapas-interactivos.json")
      .then(response => response.json())
      .then(data => {
        renderizarMapas(data);
        agregarEventosDeClic(data);
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
    document.querySelector("#mapa-seleccionado img").src = mapa.imagen;
    document.getElementById("mapa").src = mapa.srcMapa;
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