async function inicializarColeccion() {
  try {
    const datos = await obtenerColeccionDashboard();
    const catalogoCartas = await fetch("/data/cartas.json").then((r) =>
      r.json(),
    );

    renderizarEspaciosCartas();

    renderizarColeccionCartas(datos.cartas, catalogoCartas);
    renderizarColeccionPaises(datos.paises);
  } catch (error) {
    console.error("Error al cargar la colección:", error);
  }
}

function renderizarEspaciosCartas() {}

function renderizarColeccionCartas(cartasUsuario, catalogo) {
  const contenedor = document.getElementById("coleccionCartas");
  const slugsObtenidos = cartasUsuario.map((c) => c.carta_slug);

  contenedor.innerHTML = Object.entries(catalogo)
    .map(([slug, carta]) => {
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
                    <span class="caracteristicas-personaje-frontal"><img src="${carta.personalidad[0]?.img || ""}"><p class="caracteristica-frontal" id="caracteristica-1">${carta.personalidad[0]?.nombre || ""}</p></span>
                    <span class="caracteristicas-personaje-frontal"><img src="${carta.personalidad[1]?.img || ""}"><p class="caracteristica-frontal" id="caracteristica-2">${carta.personalidad[1]?.nombre || ""}</p></span>
                    <span class="caracteristicas-personaje-frontal"><img src="${carta.personalidad[2]?.img || ""}"><p class="caracteristica-frontal" id="caracteristica-3">${carta.personalidad[2]?.nombre || ""}</p></span>
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
                        <span class="lugar-personaje ${carta.colorCarta}" data-tippy-content="${carta.lugar ? carta.lugar : "Sin información"}"><img src="/svg/mundo.svg"><img src="" id="img-lugar-personaje"></span>
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
    })
    .join("");

  activarTiltEnNuevasCartas();
  activarFlipEnNuevasCartas();
  activarTippyEnNuevasCartas();
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
  tippy("#coleccionCartas [data-tippy-content]");

  document
    .querySelectorAll("#coleccionCartas .reconocimiento-personaje")
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
        theme: "light",
        interactive: true,
      });
    });
}

function activarFlipEnNuevasCartas() {
  const cardCarousel = document.querySelectorAll("#coleccionCartas .item");

  cardCarousel.forEach((card) => {
    // Evita duplicar el listener si esta función se llama más de una vez
    if (card.dataset.flipListo === "true") return;
    card.dataset.flipListo = "true";

    const etiquetaItem = card.querySelector(".etiqueta");
    const personajeItem = card.querySelector(".personaje-item");
    const personajeHistoricoItem = card.querySelector(".img-personaje-frontal");
    const personajeHistoricoItemTrasera = card.querySelector(
      ".personaje-historico-item-trasera",
    );
    const descripcionItem = card.querySelector(
      ".descripcion-personaje-trasera",
    );
    const caracteristicaFrontal = card.querySelector(
      ".contenedor-caracteristicas",
    );
    const especialidad = card.querySelector(".contenedor-especialidad");

    let startX;

    const flipCard = () => {
      const sonidoCarta = new Audio("/audio/carta.mp3");
      sonidoCarta.volume = 0.3;
      sonidoCarta.preload = "auto";
      sonidoCarta.play();

      card.classList.toggle("flipped");
      if (descripcionItem) descripcionItem.classList.toggle("flipped");
      if (etiquetaItem) etiquetaItem.classList.toggle("flipped");
      if (caracteristicaFrontal)
        caracteristicaFrontal.classList.toggle("flipped");
      if (especialidad) especialidad.classList.toggle("flipped");
      if (personajeItem) personajeItem.classList.toggle("flipped");
      if (personajeHistoricoItem)
        personajeHistoricoItem.classList.toggle("flipped");
      if (personajeHistoricoItemTrasera)
        personajeHistoricoItemTrasera.classList.toggle("flipped");
    };

    // Click simple (desktop)
    card.addEventListener("dblclick", flipCard);

    // Swipe para móviles (se mantiene igual)
    card.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    card.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      if (Math.abs(diffX) > 50) {
        flipCard();
      }
    });
  });
}
