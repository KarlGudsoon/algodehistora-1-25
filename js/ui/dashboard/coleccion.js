// Variables a nivel de módulo, para reutilizar sin volver a pedir la API
let catalogoCartasActual = {};
let slugsObtenidosActual = [];

async function inicializarColeccion() {
  try {
    const datos = await obtenerColeccionDashboard();
    const catalogoCartas = await fetch("/data/cartas.json").then((r) =>
      r.json(),
    );

    catalogoCartasActual = catalogoCartas;
    slugsObtenidosActual = datos.cartas.map((c) => c.carta_slug);

    renderizarColeccionCartas(datos.cartas, catalogoCartas);
    renderizarColeccionPaises(datos.paises);

    activarBuscadorCartas(); // <-- nuevo
  } catch (error) {
    console.error("Error al cargar la colección:", error);
  }
}

function renderizarColeccionCartas(cartasUsuario, catalogo) {
  const contenedor = document.getElementById("coleccionCartas");
  const slugsObtenidos = cartasUsuario.map((c) => c.carta_slug);

  const entradasOrdenadas = Object.entries(catalogo).sort((a, b) => {
    const periodoA = a[1].periodo ?? 0;
    const periodoB = b[1].periodo ?? 0;
    return periodoA - periodoB;
  });

  if (entradasOrdenadas.length === 0) {
    contenedor.innerHTML = `<p class="sin-resultados">No se encontraron personajes.</p>`;
    activarTiltEnNuevasCartas();
    activarTippyEnNuevasCartas();
    activarExpandirEnNuevasCartas();
    return;
  }

  contenedor.innerHTML = entradasOrdenadas
    .map(([slug, carta]) => renderizarCartaHtml(slug, carta, slugsObtenidos))
    .join("");

  activarTiltEnNuevasCartas();
  activarTippyEnNuevasCartas();
  activarExpandirEnNuevasCartas();
}

// Extraje el template de una sola carta a su propia función,
// para no duplicar el bloque gigante de HTML dentro del .map() de categorías
function renderizarCartaHtml(slug, carta, slugsObtenidos) {
  const obtenida = slugsObtenidos.includes(slug);
  const esp = carta.especialidad.toLowerCase();
  let especialidadImg = "";

  if (esp === "agricultor") {
    especialidadImg = "/assets/icons/trigo.svg";
  } else if (esp === "intrepido" || esp === "intrépido") {
    especialidadImg = "/assets/icons/game-icons--angry-eyes.svg";
  } else if (esp === "pensador") {
    especialidadImg = "/assets/icons/cerebro.svg";
  }

  return `
    <div class="carta-placeholder">
      ${
        obtenida
          ? `
          <div class="item " id="personaje-historico" data-tilt>
              <div id="carta-expandir">«»</div>
              <div class="etiqueta">
                  <span>Personaje Histórico</span>
                  <h1 id="nombre-personaje">${carta.titulo}</h1>
                  <span id="categoria-personaje" class="${carta.categoria[0].clase}">${carta.categoria[0].nombre}</span>
              </div>
              <div class="contenedor-caracteristicas">
                  <span id="puntaje-carta-personaje">${carta.puntaje}</span>
                  <span class="conector"></span>
                  <span class="caracteristicas-personaje-frontal ${carta.personalidad[0]?.clase || "punto-basico"}" data-content="${carta.personalidad[0]?.nombre || ""}"><img src="${carta.personalidad[0]?.img || ""}"></span>
                  <span class="conector"></span>
                  <span class="caracteristicas-personaje-frontal ${carta.personalidad[1]?.clase || "punto-basico"}" data-content="${carta.personalidad[1]?.nombre || ""}"><img src="${carta.personalidad[1]?.img || ""}"></span>
                  <span class="conector"></span>
                  <span class="caracteristicas-personaje-frontal ${carta.personalidad[2]?.clase || "punto-basico"}" data-content="${carta.personalidad[2]?.nombre || ""}"><img src="${carta.personalidad[2]?.img || ""}"></span>
              </div>
              <div class="contenedor-especialidad">
                  <div class="especialidad-personaje">
                      <img src="${especialidadImg}">
                  </div>
                  <span class="especialidad-nombre">${carta.especialidad}</span>
              </div>
              <div class="img-personaje-frontal">
                  <img id="imagen-personaje" class="personaje-historico-item" src="${carta.imagen}" draggable="false">
              </div>
              <div id="face-frontal" class="face frontal ${carta.rareza}">
                  <div class="fondo-frontal">
                      <h1 class="etiqueta-fondo" id="etiqueta-fondo-frontal">${carta.categoria[0].nombre}</h1>
                      <img id="fondo-frontal" src="${carta.fondoFrontal}" draggable="false">      
                  </div>
              </div>
              <div class="descripcion-personaje-trasera">
                  <div class="carta-personalidad" id="personalidad-personaje">
                      <span class="${carta.personalidad[0]?.clase || ""}">${carta.personalidad[0]?.nombre || ""}</span>
                      <span class="${carta.personalidad[1]?.clase || ""}">${carta.personalidad[1]?.nombre || ""}</span>
                      <span class="${carta.personalidad[2]?.clase || ""}">${carta.personalidad[2]?.nombre || ""}</span>
                  </div>
                  <div class="descripcion-personaje-texto ${carta.colorCarta}" id="descripcion-personaje-texto">
                      <p id="descripcion-personaje">${carta.descripcion}</p>
                  </div>
                  <div class="descripcion-personaje-caracteristicas" id="iconos-personaje">
                      <span class="lugar-personaje ${carta.colorCarta}" data-tippy-content="${carta.lugar ? carta.lugar : "Sin información"}"><img src="/svg/mundo.svg"><img src="${carta.bandera}" id="img-lugar-personaje"></span>
                      <span class="reconocimiento-personaje ${carta.colorCarta}" data-reconocimiento='${JSON.stringify(carta.reconocimiento || [])}'><img src="/svg/ribbon.svg"></span>
                      <span class="tiempo-personaje ${carta.colorCarta}" data-tippy-content="${carta.tiempo ? carta.tiempo : "Sin información"}"><img draggable="false" src="/svg/tiempo.svg"></span>
                  </div>
              </div>
              <img id="imagen-personaje-trasera" class="personaje-historico-item-trasera" src="${carta.imagen}" draggable="false">
              <div id="face-trasera" class="face trasera ${carta.rareza}">
                  <div class="img-personaje-trasera">
                      <h1 class="etiqueta-fondo" id="etiqueta-fondo-trasera">${carta.titulo}</h1>
                      <img id="fondo-trasera" src="${carta.fondoTrasera}">
                  </div>
              </div>
          </div>
          `
          : ""
      }
    </div>
  `;
}

function renderizarColeccionPaises(paisesUsuario) {
  const contenedor = document.getElementById("coleccionPaises");
  contenedor.innerHTML = `<p>Países obtenidos: ${paisesUsuario.length}</p>`;
  // Ajusta esto cuando definas el catálogo de países, igual que hicimos con cartas.json
}

function activarTiltEnNuevasCartas() {
  const nuevasCartas = document.querySelectorAll(
    "#coleccionCartas [data-tilt]",
  );
  VanillaTilt.init(nuevasCartas);
}

function activarTippyEnNuevasCartas() {
  tippy("#carta-expandida-contenedor [data-tippy-content]", {
    allowHTML: true,
    interactive: true,
    theme: "punto-basico",
    placement: "top",
  });

  document
    .querySelectorAll(
      "#carta-expandida-contenedor .item .reconocimiento-personaje",
    )
    .forEach((el) => {
      const reconocimientos = el.dataset.reconocimiento
        ? JSON.parse(decodeURIComponent(el.dataset.reconocimiento))
        : [];

      const contenido = reconocimientos.length
        ? `
        <ul style="margin:0;padding-left:20px;">
          ${reconocimientos.map((r) => `<li>${r}</li>`).join("")}
        </ul>
      `
        : "Sin información";

      tippy(el, {
        content: contenido,
        allowHTML: true,
        interactive: true,
        theme: "punto-basico",
        placement: "top",
      });
    });
}

function activarExpandirEnNuevasCartas() {
  const cardCarousel = document.querySelectorAll("#coleccionCartas .item");

  cardCarousel.forEach((card) => {
    if (card.dataset.expandirListo === "true") return;
    card.dataset.expandirListo = "true";

    card.addEventListener("click", () => expandirCarta(card));
    card.addEventListener("click", sonidoSeleccion);
  });
}

function expandirCarta(cardOriginal) {
  const overlay = document.getElementById("overlay-carta-expandida");
  const contenedor = document.getElementById("carta-expandida-contenedor");

  // 1. FIRST: posición actual de la carta en pantalla
  const rectInicial = cardOriginal.getBoundingClientRect();

  // 2. Clonamos la carta para no mover la original del grid
  const clon = cardOriginal.cloneNode(true);
  clon.classList.add("carta-clon-expandida");

  contenedor.innerHTML = "";
  contenedor.appendChild(clon);

  overlay.classList.remove("oculto");

  // --- El CONTENEDOR controla posición y tamaño (top/left/width/height) ---
  contenedor.style.position = "fixed";
  contenedor.style.top = `${rectInicial.top}px`;
  contenedor.style.left = `${rectInicial.left}px`;
  contenedor.style.width = `${rectInicial.width}px`;
  contenedor.style.height = `${rectInicial.height}px`;
  contenedor.style.margin = "0";
  contenedor.style.zIndex = "1001";
  contenedor.style.transition =
    "top 0.4s cubic-bezier(0.22, 1, 0.36, 1), " +
    "left 0.4s cubic-bezier(0.22, 1, 0.36, 1), " +
    "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), " +
    "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)";

  // --- El CLON solo ocupa el 100% del contenedor, sin transition propia ---
  // (así el tilt puede escribir su propia transition sin afectar nada más)
  clon.style.width = "100%";
  clon.style.height = "100%";
  clon.style.position = "relative";
  clon.style.margin = "0";

  // Forzamos reflow para que el navegador registre la posición inicial
  // antes de aplicar la posición final (si no, no anima)
  contenedor.offsetHeight;

  requestAnimationFrame(() => {
    overlay.classList.add("activo");

    // 3. LAST + PLAY: animamos el contenedor hacia el centro, más grande
    //
    // En pantallas chicas (móvil) usamos un porcentaje mayor del ancho,
    // porque un 40% de 375px es casi el mismo tamaño que ya tenía la carta.
    // En pantallas grandes (desktop) con un 40% ya se nota bien el crecimiento.
    const esMovil = window.innerWidth < 640;
    const porcentajeAncho = esMovil ? 0.85 : 0.4;
    const topeMaximo = esMovil ? window.innerWidth * 0.85 : 400;

    const anchoFinal = Math.min(
      window.innerWidth * porcentajeAncho,
      topeMaximo,
    );
    const altoFinal = anchoFinal * (rectInicial.height / rectInicial.width);

    contenedor.style.top = `${(window.innerHeight - altoFinal) / 2}px`;
    contenedor.style.left = `${(window.innerWidth - anchoFinal) / 2}px`;
    contenedor.style.width = `${anchoFinal}px`;
    contenedor.style.height = `${altoFinal}px`;
  });

  activarTippyEnNuevasCartas();

  // --- Voltear la carta: doble click (desktop) o swipe horizontal (móvil) ---
  let startX = 0;

  clon.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    flipCardGenerico(clon);
  });

  clon.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  clon.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (Math.abs(diffX) > 50) {
      flipCardGenerico(clon);
    }
  });

  // Click simple en el clon: no debe cerrar el overlay
  clon.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Cerrar al hacer click en el fondo oscuro del overlay
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      cerrarCartaExpandida(contenedor, clon, rectInicial);
    }
  };

  // --- Inicializar Vanilla-Tilt en el CLON, cuando termine de moverse ---
  contenedor.addEventListener(
    "transitionend",
    function alTerminarEntrada(e) {
      contenedor.removeEventListener("transitionend", alTerminarEntrada);
      VanillaTilt.init(clon);
    },
    { once: true },
  );
}

function cerrarCartaExpandida(contenedor, clon, rectInicial) {
  const overlay = document.getElementById("overlay-carta-expandida");

  sonidoSeleccion();

  // Destruir tilt antes de cerrar (vive en el clon, no en el contenedor,
  // así que esto no afecta la transition del contenedor)
  if (clon.vanillaTilt) {
    clon.vanillaTilt.destroy();
  }

  // Animamos el CONTENEDOR de vuelta a la posición y tamaño original.
  // Su "transition" nunca fue tocada por el tilt, así que esto SÍ anima.
  contenedor.style.top = `${rectInicial.top}px`;
  contenedor.style.left = `${rectInicial.left}px`;
  contenedor.style.width = `${rectInicial.width}px`;
  contenedor.style.height = `${rectInicial.height}px`;

  overlay.classList.remove("activo");

  setTimeout(() => {
    overlay.classList.add("oculto");
    contenedor.innerHTML = "";
  }, 400); // debe coincidir con la duración del transition
}

// ============================================================
// Flip genérico, reutilizable tanto en el grid como en el clon
// ============================================================
function flipCardGenerico(card) {
  const sonidoCarta = new Audio("/audio/carta.mp3");
  sonidoCarta.volume = 0.3;
  sonidoCarta.play();

  card.classList.toggle("flipped");
  card
    .querySelector(".descripcion-personaje-trasera")
    ?.classList.toggle("flipped");
  card.querySelector(".etiqueta")?.classList.toggle("flipped");
  card
    .querySelector(".contenedor-caracteristicas")
    ?.classList.toggle("flipped");
  card.querySelector(".contenedor-especialidad")?.classList.toggle("flipped");
  card.querySelector(".img-personaje-frontal")?.classList.toggle("flipped");
  card
    .querySelector(".personaje-historico-item-trasera")
    ?.classList.toggle("flipped");
}

function sonidoSeleccion() {
  let sonido = new Audio("/audio/seleccion2.mp3");
  sonido.volume = 0.3;
  sonido.preload = "auto";
  sonido.play();
}

function activarBuscadorCartas() {
  const input = document.getElementById("buscadorCartas");
  if (!input) return;

  input.addEventListener("input", () => {
    const termino = input.value.trim().toLowerCase();

    const catalogoFiltrado = Object.fromEntries(
      Object.entries(catalogoCartasActual).filter(([slug, carta]) =>
        carta.titulo.toLowerCase().includes(termino),
      ),
    );

    renderizarColeccionCartas(
      slugsObtenidosActual.map((slug) => ({ carta_slug: slug })), // mismo formato que espera la función
      catalogoFiltrado,
    );
  });
}
