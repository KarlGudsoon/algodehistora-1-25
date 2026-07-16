async function inicializarEstadisticas() {
  try {
    const datos = await obtenerEstadisticasDashboard();
    renderizarResumenProgreso(datos.progreso);
    renderizarHistorialArticulos(datos.historial_articulos);
  } catch (error) {
    if (error.message === "No autenticado") {
      window.location.href = "/login.html";
    } else {
      console.error("Error al cargar estadísticas:", error);
    }
  }
}

function renderizarResumenProgreso(progreso) {
  const contenedor = document.getElementById("resumenProgreso");
  const porcentaje =
    progreso.articulos_totales > 0
      ? Math.round(
          (progreso.articulos_completados / progreso.articulos_totales) * 100,
        )
      : 0;

  contenedor.innerHTML = `
    <p>Artículos completados: ${progreso.articulos_completados} / ${progreso.articulos_totales} (${porcentaje}%)</p>
  `;
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
