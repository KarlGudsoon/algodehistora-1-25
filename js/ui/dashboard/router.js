// Mapa de rutas: nombre de vista -> archivo HTML + función de inicialización
const rutasDashboard = {
  estadisticas: {
    html: "/dashboard/views/estadisticas.html",
    init: () => inicializarEstadisticas(),
  },
  coleccion: {
    html: "/dashboard/views/coleccion.html",
    init: () => inicializarColeccion(),
  },
  perfil: {
    html: "/dashboard/views/perfil.html",
    init: () => inicializarPerfil(),
  },
};

async function cargarVista(nombreVista) {
  const ruta = rutasDashboard[nombreVista];
  if (!ruta) {
    console.warn(`Vista "${nombreVista}" no existe`);
    return;
  }

  const contenedor = document.getElementById("contenedor-principal");

  try {
    const res = await fetch(ruta.html);
    if (!res.ok) throw new Error("No se pudo cargar la vista");
    contenedor.innerHTML = await res.text();

    marcarBotonActivo(nombreVista);

    // Ejecuta la lógica propia de esa vista, ahora que su HTML ya está insertado
    await ruta.init();

    // Actualiza el hash de la URL, para que sea recargable/compartible
    window.location.hash = nombreVista;
  } catch (error) {
    console.error("Error al cargar la vista:", error);
    contenedor.innerHTML = "<p>Ocurrió un error al cargar esta sección.</p>";
  }
}

function marcarBotonActivo(nombreVista) {
  document.querySelectorAll(".nav-interno button").forEach((btn) => {
    btn.classList.toggle("activo", btn.dataset.vista === nombreVista);
  });
}

function inicializarRouterDashboard() {
  // Conecta cada botón con su vista mediante data-vista
  document.querySelectorAll(".nav-interno button").forEach((btn) => {
    btn.addEventListener("click", () => cargarVista(btn.dataset.vista));
  });

  // Carga la vista según el hash de la URL (o "estadisticas" por defecto)
  const vistaInicial = window.location.hash.replace("#", "") || "estadisticas";
  cargarVista(vistaInicial);
}

document.addEventListener("DOMContentLoaded", inicializarRouterDashboard);
