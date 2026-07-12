// js/ui/articulos/progreso.js

// Elementos del DOM (cartas)
const CartasAbiertasPagina = document.querySelector("#cartas-abiertas-pagina");
const CantidadCartasPagina = document.querySelector("#cantidad-cartas-pagina");
const PogresoCartasPagina = document.querySelector(
  ".progreso-cartas-personajes .progreso-completado",
);
const ReiniciarProgreso = document.querySelector("#reiniciar-progreso");
const WidgetCuestionario = document.querySelector(".widget-cuestionario");
const Cartas = document.querySelectorAll(".personaje");

// Elementos del DOM (países)
const CantidadPaisesPagina = document.querySelector("#cantidad-pais-pagina");
const CantidadPaisesAbiertos = document.querySelector("#pais-abiertas-pagina");
const ProgresoPaisesPagina = document.querySelector(
  ".progreso-paises-completado",
);
const Paises = document.querySelectorAll(".paises");

// Cantidades totales (fijas, según lo que hay en el DOM del artículo)
const cantidadCartas = Cartas.length;
const cantidadPaises = Paises.length;

// Estado en memoria (se llena desde la API al iniciar)
let cartasAbiertasSlugs = [];
let paisesAbiertosSlugs = [];
let cartasAbiertas = 0;
let paisesAbiertos = 0;
let progresoObtenido = 0;
let progresoTotal = cantidadCartas + cantidadPaises;

// ---------------------------------------------
// Inicialización: trae la colección real del usuario
// ---------------------------------------------
async function inicializarProgreso() {
  const slugsCartasArticulo = Array.from(Cartas).map((el) => el.dataset.carta);
  const slugsPaisesArticulo = Array.from(Paises).map((el) => el.dataset.pais);

  console.log("Slugs de cartas en el artículo:", slugsCartasArticulo);
  console.log("Slugs de países en el artículo:", slugsPaisesArticulo);

  try {
    cartasAbiertasSlugs =
      await obtenerMiColeccionCartasArticulo(slugsCartasArticulo);
    paisesAbiertosSlugs =
      await obtenerMiColeccionPaisesArticulo(slugsPaisesArticulo);
  } catch (error) {
    console.warn(
      "No se pudo cargar el progreso (¿sesión no iniciada?):",
      error.message,
    );
    cartasAbiertasSlugs = [];
    paisesAbiertosSlugs = [];
  }

  // Marca visualmente en el DOM las cartas/países que ya tiene
  Cartas.forEach((el) => {
    if (cartasAbiertasSlugs.includes(el.dataset.carta)) {
      el.classList.add("open");
    }
  });

  Paises.forEach((el) => {
    if (paisesAbiertosSlugs.includes(el.dataset.pais)) {
      el.classList.add("open");
    }
  });

  cartasAbiertas = Cartas.length
    ? Array.from(Cartas).filter((el) =>
        cartasAbiertasSlugs.includes(el.dataset.carta),
      ).length
    : 0;

  paisesAbiertos = Paises.length
    ? Array.from(Paises).filter((el) =>
        paisesAbiertosSlugs.includes(el.dataset.pais),
      ).length
    : 0;

  CartasAbiertasPagina.textContent = cartasAbiertas;
  if (CantidadCartasPagina) CantidadCartasPagina.textContent = cantidadCartas;
  CantidadPaisesAbiertos.textContent = paisesAbiertos;
  CantidadPaisesPagina.textContent = cantidadPaises;

  progreso();
  actualizarProgreso(progresoObtenido, progresoTotal);
  TippyCartas();

  if (cartasAbiertas === cantidadCartas && cantidadCartas > 0) {
    PogresoCartasPagina.style.display = "block";
  }
  if (paisesAbiertos === cantidadPaises && cantidadPaises > 0) {
    ProgresoPaisesPagina.style.display = "block";
  }
}

function progreso() {
  progresoObtenido = cartasAbiertas + paisesAbiertos;
  progresoTotal = cantidadCartas + cantidadPaises;
}

// ---------------------------------------------
// Click en un país
// ---------------------------------------------
Paises.forEach((element) => {
  element.addEventListener("click", async () => {
    const slug = element.dataset.pais;
    if (!slug || element.classList.contains("open")) return;

    try {
      const resultado = await otorgarPais(slug);

      element.classList.add("open");
      if (resultado.nueva) {
        paisesAbiertosSlugs.push(slug);
        paisesAbiertos++;
      }

      CantidadPaisesAbiertos.textContent = paisesAbiertos;

      if (paisesAbiertos === cantidadPaises) {
        ProgresoPaisesPagina.style.display = "block";
      }

      progreso();
      actualizarProgreso(progresoObtenido, progresoTotal);
    } catch (error) {
      console.error("Error al otorgar país:", error.message);
    }
  });
});

// ---------------------------------------------
// Click en una carta (personaje)
// ---------------------------------------------
Cartas.forEach((element) => {
  element.addEventListener("click", async () => {
    const slug = element.dataset.carta;
    if (!slug || element.classList.contains("open")) return;

    try {
      const resultado = await otorgarCarta(slug);

      element.classList.add("open");
      if (resultado.nueva) {
        cartasAbiertasSlugs.push(slug);
        cartasAbiertas++;
      }

      CartasAbiertasPagina.textContent = cartasAbiertas;

      if (cartasAbiertas === cantidadCartas) {
        PogresoCartasPagina.style.display = "block";
      }

      TippyCartas();
      progreso();
      actualizarProgreso(progresoObtenido, progresoTotal);
    } catch (error) {
      console.error("Error al otorgar carta:", error.message);
    }
  });
});

// ---------------------------------------------
// Anillo de progreso visual (sin cambios)
// ---------------------------------------------
function actualizarProgreso(obtenido, total) {
  const porcentaje = total > 0 ? (obtenido / total) * 100 : 0;
  const circle = document.querySelector(".progress-ring-circle");
  const text = document.getElementById("progress-text");

  const radio = 26;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;

  circle.style.strokeDashoffset = offset;
  text.textContent = `${Math.round(porcentaje)}%`;

  circle.style.stroke = porcentaje < 65 ? "var(--yellow)" : "#00bfa6";

  if (porcentaje === 100) {
    WidgetCuestionario.classList.add("active");
  }
}

// ---------------------------------------------
// Botón "reiniciar progreso" — ahora requiere endpoint en el backend
// ---------------------------------------------
ReiniciarProgreso.addEventListener("click", async () => {
  try {
    await reiniciarProgresoUsuario(); // ver paso 4 más abajo
    location.reload();
  } catch (error) {
    console.error("No se pudo reiniciar el progreso:", error.message);
  }
});

// ---------------------------------------------
// Widget de cuestionario (sin cambios)
// ---------------------------------------------
WidgetCuestionario.addEventListener("click", function () {
  const cuestionario = document.querySelector(".cuestionario-final");
  cuestionario.classList.add("active");
  document.body.classList.add("no-scroll");
});

// ---------------------------------------------
// Arranque
// ---------------------------------------------
inicializarProgreso();
