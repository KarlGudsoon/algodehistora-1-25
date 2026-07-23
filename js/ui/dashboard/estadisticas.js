async function inicializarEstadisticas() {
  try {
    const catalogoCartas = await fetch("/data/cartas.json").then((r) =>
      r.json(),
    );
    const catalogoPaises = await fetch("/data/paises.json").then((r) =>
      r.json(),
    );
    const totalCartas = Object.keys(catalogoCartas).length;
    const totalPaises = Object.keys(catalogoPaises).length;
    const datosUsuario = await obtenerDatosUsuario();
    const datos = await obtenerEstadisticasDashboard();
    const nivelInfo = await obtenerNivelUsuario();

    renderizarUsuario(datosUsuario);
    renderizarNivel(nivelInfo);
    renderizarResumenProgreso(datos.progreso, totalCartas, totalPaises);
    renderizarHistorialArticulos(datos.historial_articulos);
  } catch (error) {
    if (error.message === "No autenticado") {
      window.location.href = "/login.html";
    } else {
      console.error("Error al cargar estadísticas:", error);
    }
  }
}

function renderizarUsuario(datos) {
  const primerNombre = datos.name?.trim().split(/\s+/)[0] || "Usuario";
  document.getElementById("nombreUsuario").textContent = primerNombre;
}

function renderizarNivel(nivelInfo) {
  document.getElementById("nivelUsuario").textContent =
    `Nivel ${nivelInfo.nivel}`;
  document.getElementById("xpActual").textContent =
    nivelInfo.xp_en_nivel_actual;
  document.getElementById("xpSiguiente").textContent =
    nivelInfo.xp_para_siguiente_nivel;

  const barra = document.getElementById("barraNivel");
  if (barra) barra.style.width = `${nivelInfo.porcentaje_nivel}%`;
}

function renderizarResumenProgreso(progreso, totalCartas, totalPaises) {
  const contenedor = document.getElementById("resumenProgreso");
  const porcentaje =
    progreso.articulos_totales > 0
      ? Math.round(
          (progreso.articulos_completados / progreso.articulos_totales) * 100,
        )
      : 0;

  const articulosCompletados = document.getElementById("articulosCompletados");
  const articulosTotales = document.getElementById("articulosTotales");
  articulosCompletados.textContent = progreso.articulos_completados;
  articulosTotales.textContent = progreso.articulos_totales;

  document.getElementById("cartasObtenidas").textContent =
    progreso.cartas_obtenidas;
  document.getElementById("cartasTotales").textContent = totalCartas;

  document.getElementById("paisesDescubiertos").textContent =
    progreso.paises_descubiertos;
  document.getElementById("paisesTotales").textContent = totalPaises;

  document.querySelectorAll(".infocards").forEach((card) => {
    card.classList.remove("skeleton");
  });
}

function renderizarHistorialArticulos(historial) {
  const contenedor = document.getElementById("historialArticulos");

  if (historial.length === 0) {
    contenedor.innerHTML = "<p>Todavía no has completado ningún artículo.</p>";
    return;
  }

  contenedor.innerHTML = historial
    .map(
      (item) => `
    <div class="historial-item">
      <span>${item.titulo}</span>
      <span>${item.aprobado ? "✅" : "❌"} Nota: ${item.nota}</span>
    </div>
  `,
    )
    .join("");
}
