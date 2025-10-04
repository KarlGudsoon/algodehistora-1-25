document.addEventListener("DOMContentLoaded", function () {
  const cardCarousel = document.querySelectorAll('.item');

  cardCarousel.forEach(card => {
    const etiquetaItem = card.querySelector('.etiqueta');
    const personajeItem = card.querySelector('.personaje-item');
    const personajeHistoricoItem = card.querySelector('.img-personaje-frontal');
    const personajeHistoricoItemTrasera = card.querySelector('.personaje-historico-item-trasera')
    const descripcionItem = card.querySelector('.descripcion-personaje-trasera')
    const caracteristicaFrontal = card.querySelector('.contenedor-caracteristicas');
    const especialidad = card.querySelector('.contenedor-especialidad');
    
    let startX;
    // Función para voltear la tarjeta
    const flipCard = () => {
      
      var sonidoCarta = new Audio("/audio/carta.mp3");
      sonidoCarta.volume = 0.3;
      sonidoCarta.preload = "auto";
      sonidoCarta.play();

      card.classList.toggle('flipped');

      if (descripcionItem) {
        descripcionItem.classList.toggle('flipped');
      }

      if (etiquetaItem) {
        etiquetaItem.classList.toggle('flipped');
      }

      if (caracteristicaFrontal) {
        caracteristicaFrontal.classList.toggle('flipped');
      }

      if (especialidad) {
        especialidad.classList.toggle('flipped');
      }

      if (personajeItem) {
        personajeItem.classList.toggle('flipped');
      }

      if (personajeHistoricoItem) {
        personajeHistoricoItem.classList.toggle('flipped');
      }

      if (personajeHistoricoItemTrasera) {
        personajeHistoricoItemTrasera.classList.toggle('flipped');
      }
    };

    // Evento de doble clic (para desktop)
    card.addEventListener('dblclick', flipCard);

    // Eventos para dispositivos móviles
    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    card.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      // Si el deslizamiento es suficientemente largo y en horizontal
      if (Math.abs(diffX) > 50) {
        flipCard();
      }
    });
  });
});

const contenedorPersonajes = document.querySelector('.contenedor-personaje');
const cartasPersonajes = document.querySelector('.item');

contenedorPersonajes.addEventListener('click', function(event) {
  if (!cartasPersonajes.contains(event.target) & !sobreCarta.contains(event.target)) {
    cerrarCarta();
  }
});



document.querySelectorAll(".personaje").forEach((personaje, index) => {
  personaje.addEventListener("click", () => {
    var sonidoSobre = new Audio("/audio/arrastrar.mp3");
    sonidoSobre.volume = 0.5;
    sonidoSobre.preload = "auto";
    sonidoSobre.play();
    


    const sobreCarta = document.querySelector(".sobre-carta");

    sobreCarta.classList.add('active');

    let canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;

    // Get all containers with the class
    let containers = document.querySelectorAll(".contenedor-personaje");
    let container = containers[index]; // Now this will work since querySelectorAll returns NodeList

    if (!container) return;

    container.appendChild(canvas);

    let confetti_button = confetti.create(canvas, { resize: true });

    confetti_button({
      particleCount: 50,
      spread: 50,
      origin: { y: 1 }
    });

    setTimeout(() => {
      container.removeChild(canvas);
    }, 3000);
  });
});





document.addEventListener("DOMContentLoaded", () => {
  // Cargar JSON de personajes
  fetch("/Apps/cartas/cartas.json")
    .then(response => response.json())
    .then(data => {
      precargarImagenes(data);
      inicializarEventos(data);
    })
    .catch(error => console.error("Error al cargar el JSON:", error));
});

function precargarImagenes(personajes) {
  Object.values(personajes).forEach(personaje => {
    precargarImagen(personaje.imagen);
    precargarImagen(personaje.fondoFrontal);
    precargarImagen(personaje.fondoTrasera);
  });
}

function precargarImagen(url) {
  const img = new Image();
  img.src = url;
}

function inicializarEventos(personajes) {
  document.querySelectorAll(".personaje").forEach(elemento => {
    elemento.addEventListener("click", () => {
      const idPersonaje = elemento.id; 
      
      if (personajes[idPersonaje]) {
        actualizarCarta(personajes[idPersonaje], idPersonaje);
        document.getElementById("contenedor-personaje").classList.add("active");
        document.getElementById("personaje-historico").classList.add("active");
        document.body.classList.add("no-scroll");
      } else {
        console.error("Personaje no encontrado en JSON:", idPersonaje);
      }
    });
  });
}

// Inicializar tooltips al cargar el DOM
const valoracionTippy = tippy('#puntaje-carta-personaje', { content: "Puntaje de la carta", trigger: "click", allowHTML: true, interactive: true, theme: 'basico', placement: 'top', appendTo: document.body, zIndex: 99999999999 });

let tipoEspecialidad = document.querySelector(".especialidad-nombre");

const descripcionesEspecialidad = {
  'Agricultor': 'Experto en cultivo y manejo de tierras. Al utilizarla obtienes una carta extra de tu mazo.',
  'Intrépido': 'Intrépido: Valiente y audaz, siempre dispuesto a enfrentar desafíos y explorar lo desconocido con determinación y coraje.',
  'Pensador': 'Pensador: Intelectual y reflexivo, capaz de analizar problemas complejos y proponer soluciones innovadoras.'
};

let especialidadTippy = tippy('.especialidad-personaje', {allowHTML: true, interactive: true, theme: 'punto-basico', placement: 'top', appendTo: document.body, zIndex: 99999999999 });



const descripcionesCaracteristicas = {
  'Agricultor': 'Experto en cultivo y manejo de tierras. Al utilizarla obtienes una carta extra de tu mazo.',
  'Navegante': 'Hábil en la navegación y exploración marítima, capaz de descubrir nuevas rutas y territorios.',
  'Visionario': 'Posee una perspectiva única y adelantada a su tiempo, capaz de anticipar tendencias y cambios futuros.',
  'Guerrero': 'Valiente y hábil en el combate, defensor de su pueblo y sus ideales.',
  'Líder': 'Carismático y capaz de inspirar y guiar a otros hacia un objetivo común.',
  'Artista': 'Creativo y expresivo, capaz de plasmar emociones e ideas a través de diversas formas de arte.',
  'Científico': 'Dedicado a la investigación y el descubrimiento, busca entender el mundo a través del método científico.',
  'Filósofo': 'Pensador profundo que reflexiona sobre la existencia, el conocimiento y la ética.',
  'Explorador': 'Aventurero y curioso, siempre en busca de nuevas tierras y experiencias.',
};

const spans = document.querySelectorAll(".carta-personalidad span");

// Creamos los tooltips y los guardamos en un array para poder actualizar su contenido
const tippies = Array.from(spans).map(span => 
  tippy(span, { 
    allowHTML: true, 
    interactive: true, 
    theme: 'basico', 
    placement: 'top', 
    appendTo: document.body, 
    zIndex: 99999999999
  })
);


const lugarTippy = tippy('.lugar-personaje', { allowHTML: true, interactive: true, theme: 'basico', placement: 'top', appendTo: document.body, zIndex: 99999999999 });
const reconocimientoTippy = tippy('.reconocimiento-personaje', { allowHTML: true, interactive: true, theme: 'basico', placement: 'top', appendTo: document.body, zIndex: 99999999999 });
const tiempoTippy = tippy('.tiempo-personaje', { allowHTML: true, interactive: true, theme: 'basico', placement: 'top', appendTo: document.body, zIndex: 99999999999 });


function actualizarCarta(personaje, idPersonaje) {
  const rarezas = ["basico", "bronce", "comun", "raro", "epico", "legendario"];
  const colorCarta = ["punto-dorado", "punto-plata", "punto-bronce"]
  
  document.getElementById("titulo-sobre").textContent = personaje.categoria[0].nombre;
  document.getElementById("sobre-carta").style.backgroundImage = personaje.imgSobre;

  document.getElementById("face-frontal").classList.remove(...rarezas);
  document.getElementById("face-trasera").classList.remove(...rarezas);


  document.getElementById("face-frontal").classList.add(personaje.rareza);
  document.getElementById("face-trasera").classList.add(personaje.rareza);

  document.getElementById("etiqueta-fondo-frontal").textContent = personaje.categoria[0].nombre;

  document.getElementById("etiqueta-fondo-trasera").textContent = personaje.titulo;


  document.getElementById("nombre-personaje").textContent = personaje.titulo;

  const categoriaElemento = document.getElementById("categoria-personaje");
  categoriaElemento.textContent = personaje.categoria[0].nombre;
  categoriaElemento.style.background = personaje.color;

  document.getElementById("descripcion-personaje-texto").classList.remove(...colorCarta);
  document.getElementById("descripcion-personaje").textContent = personaje.descripcion;
  document.getElementById("descripcion-personaje-texto").classList.add(personaje.colorCarta);

  // Asignar imágenes ya precargadas
  document.getElementById("imagen-personaje").src = personaje.imagen;
  document.querySelector(".img-personaje-frontal").id = personaje.imgClass;

  document.getElementById("imagen-personaje-trasera").src = personaje.imagen;

  document.getElementById("fondo-frontal").src = personaje.fondoFrontal;
  document.getElementById("fondo-trasera").src = personaje.fondoTrasera;

  document.getElementById("puntaje-carta-personaje").textContent = personaje.puntaje;

  if (personaje.puntaje < 8 ) {
    document.getElementById("puntaje-carta-personaje").style.borderColor = "#e2e0dd";
  } else {
    document.getElementById("puntaje-carta-personaje").style.borderColor = "#efb810";
  }

  const caracteristicasSpans = document.querySelectorAll(".caracteristicas-personaje-frontal");
  personaje.personalidad.forEach((caracteristica, index) => {
    if (caracteristicasSpans[index]) {
      // Actualizar imagen
      const img = caracteristicasSpans[index].querySelector("img");
      if (img && caracteristica.img) {
        img.src = caracteristica.img;
        img.alt = caracteristica.nombre;
      }
      
      // Actualizar texto
      const p = caracteristicasSpans[index].querySelector("p.caracteristica-frontal");
      if (p) {
        p.textContent = caracteristica.nombre;
      }
      
      // Actualizar clases
      caracteristicasSpans[index].className = "caracteristicas-personaje-frontal";
    }
  });

  const spans = document.querySelectorAll(".carta-personalidad span");

// Recorremos spans y el array de personalidad al mismo tiempo
  spans.forEach((span, index) => {
    const caracteristica = personaje.personalidad[index];

    if (caracteristica) {
      span.textContent = caracteristica.nombre;
      span.className = ""; // limpiar clases previas
      span.classList.add(caracteristica.clase);
    } else {
      // Si no hay más características en el array, opcionalmente limpiar el span
      span.textContent = "";
      span.className = "";
    }
  });

  const esp = personaje.especialidad.toLowerCase();
  const especialidad = document.querySelector(".especialidad-nombre")
  const especialidadImg = document.querySelector(".especialidad-personaje img")

  if (esp === 'agricultor') {
    especialidad.textContent = personaje.especialidad;
    especialidadImg.src = "/icons/trigo.svg"; 
  } else if (esp === 'intrepido' || esp === 'intrépido') {
    especialidad.textContent = personaje.especialidad;
    especialidadImg.src = "/icons/game-icons--angry-eyes.svg"; 
  } else if (esp === 'pensador') {
    especialidad.textContent = personaje.especialidad;
    especialidadImg.src = "/icons/cerebro.svg";
  } else {
    especialidad.style.backgroundColor = "";
  }

  // especialidad
  let especialidadTexto = tipoEspecialidad.textContent.trim();
  let descripcionEspecialidad = descripcionesEspecialidad[especialidadTexto] || "Sin descripción disponible.";

  especialidadTippy[0].setContent(descripcionEspecialidad);

  // características
  
  spans.forEach((span, index) => {
    const caracteristicaClase = personaje.personalidad[index];

    let texto = span.textContent.trim();
    let descripcion = descripcionesCaracteristicas[texto] || "Sin descripción disponible.";
    tippies[index].setContent(descripcion);
    tippies[index].setProps({theme: caracteristicaClase.clase || 'basico'});
    console.log(caracteristicaClase);
  });

  // lugar
  lugarTippy[0].setContent(personaje.lugar || "Sin información");
  lugarTippy[0].setProps({ theme: personaje.rareza });

  // reconocimiento
  const listaReconocimiento = personaje.reconocimiento && personaje.reconocimiento.length > 0
    ? `
      <ul style="margin:0; padding:0 20px; list-style:disc;">
        ${personaje.reconocimiento.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `
    : `<p style="margin:0; padding:0;">Sin información</p>`;

  reconocimientoTippy[0].setContent(listaReconocimiento);
  reconocimientoTippy[0].setProps({ theme: personaje.rareza });

  // tiempo
  tiempoTippy[0].setContent(personaje.tiempo || "Sin información");
  tiempoTippy[0].setProps({ theme: personaje.rareza });

  const banderaCarta = document.getElementById("img-lugar-personaje");
    if(personaje.bandera) {
      banderaCarta.src = personaje.bandera;
      banderaCarta.style.display = "block"
    } else {
      banderaCarta.style.display = "none"
    }

  document.querySelector(".lugar-personaje").classList.remove(...colorCarta);
  document.querySelector(".reconocimiento-personaje").classList.remove(...colorCarta);
  document.querySelector(".tiempo-personaje").classList.remove(...colorCarta);

  document.querySelector(".lugar-personaje").classList.add(personaje.colorCarta);
  document.querySelector(".reconocimiento-personaje").classList.add(personaje.colorCarta);
  document.querySelector(".tiempo-personaje").classList.add(personaje.colorCarta);
}









var hitosCerrar = document.querySelectorAll(".widget-hitos-cerrar");
var hitos = document.querySelectorAll(".container-widget-hitos");


var hitosCerrar = document.querySelectorAll(".widget-hitos-cerrar");
var hitos = document.querySelectorAll(".container-widget-hitos");

function manejaCierre(event) {

    var contenedor = event.target.closest(".container-widget-hitos");

    var estaArriba = contenedor.style.transform === "translateY(-240px)";

    contenedor.style.transform = estaArriba ? "" : "translateY(-240px)";
}

hitosCerrar.forEach(function(cerrar) {
    cerrar.addEventListener("click", manejaCierre);
});

// Seleccionar los elementos del widget del mapa y del mapa interactivo
var widgetMapa = document.querySelectorAll(".widget-mapa");
var mapaInteractivo = document.querySelectorAll(".mapa-interactivo");

// Iterar sobre cada elemento del widget del mapa
widgetMapa.forEach(function(widget) {
    // Agregar un event listener para el evento click a cada widget
    widget.addEventListener("click", function() {
        // Verificar si el mapa interactivo está escalado actualmente
        var escalado = this.dataset.escalado === "true";
        
        // Alternar entre la escala normal y la escala aumentada del mapa interactivo
        mapaInteractivo.forEach(function(mapa) {
            if (escalado) {
                mapa.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
            } else {
                mapa.style.clipPath = "polygon(100% 0, 0 0, 0 100%, 100% 100%)";
            }
        });

        // Actualizar el atributo data-escalado del widget mapa
        this.dataset.escalado = escalado ? "false" : "true";
    });
});

var widgetTimeline = document.querySelectorAll(".widget-timeline");
var timelineInteractivo = document.querySelectorAll(".timeline-interactivo");

// Iterar sobre cada elemento del widget del mapa
widgetTimeline.forEach(function(widgetTime) {
    // Agregar un event listener para el evento click a cada widget
    widgetTime.addEventListener("click", function() {
        // Verificar si el mapa interactivo está escalado actualmente
        var escalado = this.dataset.escalado === "true";
        
        // Alternar entre la escala normal y la escala aumentada del mapa interactivo
        timelineInteractivo.forEach(function(timeline) {
            if (escalado) {
                timeline.style.clipPath = "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)";
                timeline.style.opacity = "0";
            } else {
                timeline.style.clipPath = "polygon(0 100%, 100% 100%, 100% 0, 0 0)";
                timeline.style.opacity = "1";
            }
        });

        // Actualizar el atributo data-escalado del widget mapa
        this.dataset.escalado = escalado ? "false" : "true";
    });
});

/*HITOS DRAGGABLE*/

document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".inner");

  carousels.forEach((carousel) => {
    let isDragging = false;
    let startX, startScrollLeft;
    let initialTouchX, initialTouchY;

    // Función para iniciar el arrastre
    const dragStart = (e) => {
      if (e.type === "touchstart") {
        initialTouchX = e.touches[0].clientX;
        initialTouchY = e.touches[0].clientY;
      }
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = carousel.scrollLeft;
      carousel.style.cursor = "grabbing";
      carousel.style.userSelect = "none";
    };

    // Función para arrastrar (con detección de dirección)
    const dragging = (e) => {
      if (!isDragging) return;

      // Solo en touch: verificar si el movimiento es horizontal
      if (e.type === "touchmove") {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = Math.abs(touchX - initialTouchX);
        const deltaY = Math.abs(touchY - initialTouchY);

        // Si el movimiento es más vertical, cancelar el drag
        if (deltaY > deltaX) {
          isDragging = false;
          return;
        }
      }

      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      carousel.scrollLeft = startScrollLeft - (x - startX) * 1;
    };

    // Función para detener el arrastre
    const dragStop = () => {
      isDragging = false;
      carousel.style.cursor = "grab";
      carousel.style.removeProperty("user-select");
    };

    // Eventos de ratón (desktop)
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    // Eventos táctiles (móvil)
    carousel.addEventListener("touchstart", dragStart, { passive: false });
    carousel.addEventListener("touchmove", dragging, { passive: false });
    document.addEventListener("touchend", dragStop);
  });
});

/* Marcado */

var marcadoConcepto = document.querySelectorAll(".marcado");

function manejarMouse(event) {
    var idMarcado = this.id;
    var marcado = document.getElementById("marcado-" + idMarcado);

    if (marcado) {
        var rect = this.getBoundingClientRect();
        var marcadoRect = marcado.getBoundingClientRect();
        
        // Calculamos la posición horizontal del marcadoConcepto
        var centerX = rect.left + rect.width / 2;

        // Calculamos la posición horizontal del marcado (centrado debajo del marcadoConcepto)
        var marcadoX = centerX - marcadoRect.width / 2;

        // Si el evento es mouseenter, posicionamos el marcado y aplicamos el clip-path
        if (event.type === "mouseenter") {
            marcado.style.top = rect.bottom + "px";
            marcado.style.left = marcadoX + "px";
            marcado.style.clipPath = "circle(100% at 50% 0)";
            marcado.style.background = "#cd1c38";
            marcado.style.color = "white";
            marcado.style.transition = "";
        }
        // Si el evento es mouseleave, restauramos la posición y eliminamos el clip-path
        else if (event.type === "mouseleave") {
            // Restaurar la posición original
            marcado.style.clipPath = "circle(0% at 50% 0)"; 
            marcado.style.background = "";
            marcado.style.color = "";
            marcado.style.transition = ".5s ease";
        }
    }
} 

marcadoConcepto.forEach(function(marcadoConcepto) {
    marcadoConcepto.addEventListener("mouseenter", manejarMouse);
    marcadoConcepto.addEventListener("mouseleave", manejarMouse);
});

/* WIDGET CARD PAIS */

var paises = document.querySelectorAll(".pais");
var conceptoCerrar = document.querySelectorAll(".concepto-cerrar");

paises.forEach((pais) => {
    pais.addEventListener("click", function () {
        var idPais = this.id; // Obtener el ID del país clickeado
        var card = document.querySelector("#card-" + idPais);
      

        if (card) {
            card.classList.toggle("active"); // Agregar clase 'active' al card
        }

       
    });
});

function manejarCierre(event) {
    var concepto = event.target.parentElement;
    var contenedorPadre = concepto.parentElement;

    if (concepto) {
        concepto.classList.remove("active");  
    }

    if (contenedorPadre) {
        contenedorPadre.classList.remove("active");
    }

    document.body.classList.remove("no-scroll");

}

conceptoCerrar.forEach(function(cerrar) {
    cerrar.addEventListener("click", manejarCierre);
});

var containers = document.querySelectorAll('.widget-personaje-flip');

containers.forEach(function(container) {
  container.addEventListener('click', function() {
    var carta = container.querySelector('.carta');
    carta.classList.toggle('flipped');
    
    // Obtener el elemento .personaje-historico dentro del contenedor
    var personaje = container.querySelector('.personaje-historico');
    var titulo = container.querySelector(".container-titulo-personaje");
   
    if (personaje.style.transform === "rotateY(180deg)") {
      personaje.style.transform = "";
      personaje.style.opacity = "";
      personaje.style.pointerEvents = "";
      titulo.style.transform = "";
      titulo.style.opacity = "";
      titulo.style.pointerEvents = "";
    } else {
      personaje.style.transform = "rotateY(180deg)";
      personaje.style.opacity = "0";
      personaje.style.pointerEvents = "none";
      titulo.style.transform = "rotateY(180deg)";
      titulo.style.opacity = "0";
      titulo.style.pointerEvents = "none";
    }
  });
});

// ABRIR SOBRE (2) / EXIT ANIMATION //

var sobreCarta = document.querySelector('.sobre-carta');
  
sobreCarta.addEventListener('click', function() {
  var sonidoSobre = new Audio("/audio/arrastrar.mp3");
  var sonidoMostrarCarta = new Audio("/audio/reluciente.mp3");
  var sonidoAbrir = new Audio("/audio/romperpapel.mp3");
  const msgAbrirCarta = document.getElementById("msg-abrirsobre")

  sonidoAbrir.volume = 0.3;
  sonidoMostrarCarta.volume = 0.3;
  sonidoMostrarCarta.preload = "auto";
  sonidoSobre.volume = 0.5;
  sonidoSobre.preload = "auto";

  sonidoSobre.play();

  sonidoAbrir.play();

  setTimeout(() => {
    sonidoMostrarCarta.play();
  }, 200);

  sobreCarta.classList.remove('active');
  msgAbrirCarta.classList.remove('active');

  const card = document.querySelector('.item');

  card.classList.add('animate__tada');
});

  
// ABRIR SOBRE (2) / EXIT ANIMATION //

function expandirCarta() {
  var Card = document.querySelector(".item")
  Card.classList.toggle('expanded');
}

function cerrarCarta() {
  var containerCard = document.getElementById("contenedor-personaje");
  var Card = document.querySelector(".item")
  var sobreCarta = document.querySelector('.sobre-carta');
  const msgAbrirCarta = document.getElementById("msg-abrirsobre")

  Card.classList.remove('flipped');
  Card.querySelectorAll('.flipped').forEach(el => el.classList.remove('flipped'));
  Card.classList.remove('active');
  Card.classList.remove('animate__tada');
  Card.classList.remove('expanded');
  containerCard.classList.remove("active");
  sobreCarta.classList.remove('active');
  msgAbrirCarta.classList.remove('active');
  document.body.classList.remove("no-scroll");
}

document.getElementById("carta-cerrar").addEventListener("click", function() {
  var sonidoSobre = new Audio("/audio/arrastrar.mp3");
  sonidoSobre.volume = 0.5;
  sonidoSobre.preload = "auto";
  sonidoSobre.play();

  cerrarCarta()
});

document.getElementById("carta-expandir").addEventListener("click", function() {
  expandirCarta()
});

/*

// ZOOM INTERACTIVO 🖱️

var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("zoom");

// Límites de escala
const MIN_SCALE = 1;
const MAX_SCALE = 6;

// Estado adicional para rastrear si se está realizando un gesto de pellizco
let isPinching = false;

// Función para ajustar la escala dentro de los límites
function clampScale(value) {
    return Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
}

// Función para aplicar la transformación
function setTransform() {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// Eventos de mouse
zoom.onmousedown = function (e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
};

zoom.onmouseup = function () {
    panning = false;
};

zoom.onmousemove = function (e) {
    e.preventDefault();
    if (!panning) return;
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
};

zoom.onwheel = function (e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

    scale *= delta > 0 ? 1.2 : 1 / 1.2;
    scale = clampScale(scale);

    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    setTransform();
};

// Eventos táctiles
zoom.addEventListener("touchstart", function (e) {
    if (e.touches.length === 1) {
        // Un solo dedo para panning
        e.preventDefault();
        start = { x: e.touches[0].clientX - pointX, y: e.touches[0].clientY - pointY };
        panning = true;
        isPinching = false; // No es un gesto de pellizco
    } else if (e.touches.length === 2) {
        // Dos dedos para zoom
        e.preventDefault();
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];

        // Centro del gesto de pellizco
        start.centerX = (touch1.clientX + touch2.clientX) / 2;
        start.centerY = (touch1.clientY + touch2.clientY) / 2;
        
        // Distancia inicial entre los dedos
        start.touchDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        start.touchScale = scale;
        isPinching = true; // Es un gesto de pellizco
    }
});

zoom.addEventListener("touchmove", function (e) {
    if (e.touches.length === 1 && panning && !isPinching) {
        // Un solo dedo para panning y no estamos en un gesto de pellizco
        e.preventDefault();
        pointX = e.touches[0].clientX - start.x;
        pointY = e.touches[0].clientY - start.y;
        setTransform();
    } else if (e.touches.length === 2 && isPinching) {
        // Dos dedos para zoom
        e.preventDefault();
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];

        // Nuevo centro del pellizco
        let newCenterX = (touch1.clientX + touch2.clientX) / 2;
        let newCenterY = (touch1.clientY + touch2.clientY) / 2;

        // Nueva distancia entre los dedos
        let newDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        let newScale = start.touchScale * (newDist / start.touchDist);
        newScale = clampScale(newScale);

        // Ajustar `pointX` y `pointY` para que el zoom ocurra desde el centro del pellizco
        let scaleRatio = newScale / scale;
        pointX = newCenterX - (newCenterX - pointX) * scaleRatio;
        pointY = newCenterY - (newCenterY - pointY) * scaleRatio;

        scale = newScale;
        setTransform();
    }
});

zoom.addEventListener("touchend", function (e) {
    if (e.touches.length === 0) {
        // Cuando ambos dedos se han soltado, reiniciar el estado
        panning = false;
        isPinching = false;
        setTransform();
    } else if (e.touches.length === 1 && isPinching) {
        // Si queda un dedo después de un gesto de pellizco, evitar el desplazamiento
        panning = false;
        isPinching = false;
    }
});
*/

/// VISOR DE IMAGENES 🎞️

document.querySelectorAll(".img-view").forEach(function(elemento) {
  elemento.addEventListener("click", function() {
      var containerImgViewer = document.querySelector(".container-img-viewer");
      var imgViewer = document.getElementById("img-viewer");
      var srcImg = this.src;
      var altImg = this.alt;
      var altImgViewer = document.getElementById("alt-img-viewer");

      containerImgViewer.classList.add("activo");
      imgViewer.src = srcImg;
      altImgViewer.style.display = altImg ? "block" : "none";
      altImgViewer.textContent = altImg || "";

      document.querySelector(".container-img-viewer").addEventListener("click", function(e) {
        if (e.target === this) { // Cierra solo si se hace clic fuera de la imagen
            this.classList.remove("activo");
            document.body.classList.remove("no-scroll");
        }
    });

      if (containerImgViewer.classList.contains("activo")) {
          document.body.classList.add("no-scroll");
      } else {
          document.body.classList.remove("no-scroll");
      }
  });
})

document.querySelectorAll(".close-icon").forEach(closeIcon => {
  closeIcon.addEventListener("click", function() {
      this.parentElement.classList.remove("activo");
      document.body.classList.remove("no-scroll");
  });
});

/// VISOR DE IMAGENES 🎞️

particlesJS.load('particles-js', 'particles.json', function() {
  console.log('¡Partículas cargadas!');
});

/*

/// LINEA DE TIEMPO UNIVERSAL

const lineaTiempoAC = document.getElementById('linea-tiempo-universal-ac');
const lineaTiempoDC = document.getElementById('linea-tiempo-universal-dc');
const contenedorAC = lineaTiempoAC.querySelector('.años');
const contenedorDC = lineaTiempoDC.querySelector('.años');

for (let año = 5000; año >= 100; año -= 100) {
 
  const span = document.createElement('span');
  
  span.textContent = "-" + año;
  span.id = "-" + año;
  span.setAttribute('data-fecha', año);
  
  contenedorAC.appendChild(span);
}

for (let año = 0; año <= 2020; año += 10) {
 
  const span = document.createElement('span');
  
  span.textContent = año;
  span.id = año;
  span.setAttribute('data-fecha', año);
  
  contenedorDC.appendChild(span);
}

const contenedoresSiglosDC = lineaTiempoDC.querySelectorAll('.contenedor-siglo');
const contenedoresSiglosAC = lineaTiempoAC.querySelectorAll('.contenedor-siglo');

// Función para convertir a números romanos
function convertirARomano(num) {
  const romanos = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
  ];

  let resultado = "";
  for (const [letra, valor] of romanos) {
    while (num >= valor) {
      resultado += letra;
      num -= valor;
    }
  }
  return resultado;
}

for (let año = 5000; año >= 1000; año -= 1000) {
  let numeroSiglo = Math.floor(año / 1000);
  let romano = convertirARomano(numeroSiglo);

  // Crear el contenedor del siglo
  const siglo = document.createElement('div');
  siglo.classList.add("siglo");
  siglo.setAttribute('data-siglo', romano);

  // Crear sub-secciones
  const top = document.createElement('div');
  const mid = document.createElement('div');
  const bottom = document.createElement('div');

  top.classList.add("seccion-top");
  mid.classList.add("seccion-mid");
  bottom.classList.add("seccion-bottom");

  // Insertar sub-secciones en el siglo
  siglo.appendChild(top);
  siglo.appendChild(mid);
  siglo.appendChild(bottom);

  // Clonar e insertar el siglo en todos los contenedores
  contenedoresSiglosAC.forEach(contenedor => {
    contenedor.appendChild(siglo.cloneNode(true));
  });
}

for (let año = 0; año <= 1990; año += 100) {
  let numeroSiglo = Math.floor(año / 100) + 1;
  let romano = convertirARomano(numeroSiglo);

  // Crear el contenedor del siglo
  const siglo = document.createElement('div');
  siglo.classList.add("siglo");
  siglo.setAttribute('data-siglo', romano);

  // Crear sub-secciones
  const top = document.createElement('div');
  const mid = document.createElement('div');
  const bottom = document.createElement('div');

  top.classList.add("seccion-top");
  mid.classList.add("seccion-mid");
  bottom.classList.add("seccion-bottom");

  // Insertar sub-secciones en el siglo
  siglo.appendChild(top);
  siglo.appendChild(mid);
  siglo.appendChild(bottom);

  // Clonar e insertar el siglo en todos los contenedores
  contenedoresSiglosDC.forEach(contenedor => {
    contenedor.appendChild(siglo.cloneNode(true));
  });
}


// BOTONES PARA REDIRIGIR A UN AÑO ESPECIFICO

document.querySelectorAll('.boton-linea-tiempo').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita el scroll de la página al href="#..."

    const targetId = this.getAttribute('href').substring(1); // Quita el '#' del href
    const targetElement = document.getElementById(targetId);
    const carrusel = document.querySelector('.inner-linea-tiempo-universal');

    if (targetElement && carrusel) {
      // Solo desplazamiento horizontal dentro del carrusel
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',   // No cambia scroll vertical
        inline: 'center'     // Alinea el elemento al borde izquierdo del carrusel
      });

      // Resaltar año activo
      document.querySelectorAll('.año').forEach(a => a.classList.remove('active'));
      targetElement.classList.add('active');
    }
  });
});

// SCROLL CONTROLLER 

const carrusel = document.querySelector('.inner-linea-tiempo-universal');
const scrollSlider = document.querySelector('.scroll-slider');

// 1. Actualizar slider cuando se mueve el carrusel
carrusel.addEventListener('scroll', () => {
  const scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
  const scrollPosition = carrusel.scrollLeft;
  
  // Calcular porcentaje (0-100)
  const percentage = (scrollPosition / scrollWidth) * 100;
  
  // Actualizar valor del slider
  scrollSlider.value = percentage;
});

// 2. Mover carrusel cuando se arrastra el slider
scrollSlider.addEventListener('input', () => {
  const scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
  const scrollTo = (scrollSlider.value / 100) * scrollWidth;
  
  // Desplazamiento suave (compatible con todos navegadores)
  carrusel.scrollTo({
    left: scrollTo,
    behavior: 'auto' // Cambia a 'smooth' para efecto suave
  });
});

// 3. Calcular el max del slider cuando cambia el tamaño
function updateSliderMax() {
  const scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
  scrollSlider.max = scrollWidth > 0 ? 100 : 0;
}

// Inicializar y actualizar en resize
updateSliderMax();
window.addEventListener('resize', updateSliderMax);


/// SCROLL BUSCADOR

const yearInput = document.getElementById('year-input');
const adjustedYearDisplay = document.getElementById('adjusted-year');

function adjustToDecade(year) {
  return Math.floor(year / 10) * 10;
}

function formatDecadeText(year) {
  const adjusted = adjustToDecade(year);
  return adjusted < 0 ? `Década: ${Math.abs(adjusted)} a.C.` : `Década: ${adjusted}s`;
}

function scrollToAdjustedYear(year) {
  const adjustedYear = adjustToDecade(year);
  const targetElement = document.getElementById(`${adjustedYear}`);

  if (targetElement) {
    adjustedYearDisplay.textContent = `Mostrando ${formatDecadeText(year)}`;

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    document.querySelectorAll('.año').forEach(a => a.classList.remove('active'));
    targetElement.classList.add('active');
  }
}

function validateAndFormatInput(value) {
  value = value.replace(/[^0-9-]/g, '');

  if ((value.match(/-/g) || []).length > 1) {
    value = '-' + value.replace(/-/g, '');
  }
  if (value.includes('-') && value.indexOf('-') !== 0) {
    value = value.replace(/-/g, '');
  }

  if (value.length > 5) {
    value = value.slice(0, 5);
  }

  return value;
}

function updateYearInputAndScroll(newYear) {
  yearInput.value = newYear;
  adjustedYearDisplay.textContent = formatDecadeText(newYear);
  scrollToAdjustedYear(newYear);
}

yearInput.addEventListener('input', () => {
  let value = yearInput.value;
  value = validateAndFormatInput(value);
  yearInput.value = value;

  if (value.length >= 1 && value !== '-') {
    const numValue = parseInt(value) || 0;
    adjustedYearDisplay.textContent = formatDecadeText(numValue);
    if (!isNaN(numValue)) scrollToAdjustedYear(numValue);
  } else {
    adjustedYearDisplay.textContent = '';
  }
});

// Botones
document.getElementById('prev-year').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear - 1);
});

document.getElementById('next-year').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear + 1);
});

document.getElementById('prev-decade').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear - 10);
});

document.getElementById('next-decade').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear + 10);
});


/// CREADOR DE HECHOS HISTORICOS

fetch('/Apps/timeline/hitos.json')
  .then(response => response.json())
  .then(data => {
    crearHechosHistoricos(data);
  })
  .catch(error => {
    console.error('Error al cargar los hechos históricos:', error);
  });

function crearHechosHistoricos(datos) {
  datos.forEach(item => {
    const span = document.createElement('span');
    const link = document.createElement('a');
    
    link.href = item.url || '#';
    link.textContent = "Ver más";
    
    
    span.classList.add('hecho-historico');
    
    span.style.left = `${item.año}`;

    span.textContent = item.nombre;
    span.setAttribute('data-fecha', item.fecha);

    span.appendChild(link);

    const Era = document.getElementById(`${item.era}`);

    const contenedorSiglo = Era.querySelector(`.${item.contenedor}`);
    if (!contenedorSiglo) return;

    // Busca el siglo adecuado
    const siglo = contenedorSiglo.querySelector(`.siglo[data-siglo="${item.siglo}"]`);
    if (!siglo) return;

    // Busca la sección dentro del siglo
    const seccion = siglo.querySelector(`.seccion-${item.posicion}`);
    if (!seccion) return;

    seccion.appendChild(span);
  });
}

/// PERÍODOS HISTÓRICOS EN LINEA DE TIEMPO

fetch('/Apps/timeline/periodos.json')
  .then(res => res.json())
  .then(periodos => {
    periodos.forEach(crearPasoPeriodo);
  })
  .catch(err => console.error("Error cargando periodos:", err));

function crearPasoPeriodo({ era, tipo, ancho, color, inicio, siglo, periodo, imagen, posicion }) {
  const Era = document.getElementById(era);
  const contenedorSiglo = Era.querySelector(`.siglo[data-siglo="${siglo}"]`);
  if (!contenedorSiglo) return console.warn(`No se encontró el siglo: ${siglo}`);

  const pasoPeriodo = document.createElement('div');
  const textoPeriodo = document.createElement('span');

  textoPeriodo.textContent = periodo;

  pasoPeriodo.classList.add(tipo);
  pasoPeriodo.style.setProperty('--background-image-periodo', `url('${imagen}')`);
  pasoPeriodo.style.left = posicion;
  pasoPeriodo.style.width = ancho;
  pasoPeriodo.style.setProperty('--coloretapa', `${color}`)
  pasoPeriodo.setAttribute('data-inicio', inicio);

  pasoPeriodo.setAttribute('data-periodo', periodo);
  pasoPeriodo.appendChild(textoPeriodo);
  contenedorSiglo.appendChild(pasoPeriodo);
}
*/

/// TOOLTIP CON TIPPY.JS

document.querySelectorAll('[data-tippy-content]').forEach(el => {
  const followCursorAttr = el.getAttribute('data-follow-cursor');
  const themeAttr = el.getAttribute('data-theme');

  let followCursor = false;
  if (followCursorAttr === 'true') {
    followCursor = true;
  } else if (followCursorAttr === 'horizontal' || followCursorAttr === 'vertical' || followCursorAttr === 'initial') {
    followCursor = followCursorAttr;
  }

  tippy(el, {
    content: el.getAttribute('data-tippy-content'),
    followCursor: followCursor,
    theme: themeAttr || 'default',
  });
});

/// TOOLTIP CON TIPPY.JS

// WIDGET UP 

const widgetUp = document.querySelector('.widget-up');

widgetUp.addEventListener('click', function() {
  const scrollToTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollToTop > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// CUESTIONARIO FINAL DEL ARTICULO 

let cerrarCuestionario = document.querySelector(".cerrar-contenedor");

cerrarCuestionario.addEventListener("click", function() {
  this.parentElement.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

let enviarCuestionario = document.getElementById("finalizar-cuestionario-final");

enviarCuestionario.addEventListener("click", function () {
  const preguntas = document.querySelector(".container-preguntas");
  const resultado = document.querySelector(".resultado-cuestionario-final")

  preguntas.style.display = "none";
  resultado.classList.add("active");

  verificarAprobacion();
});

// CAPSULA DESCRIPTIVA GRANDE

let containerCapsula = document.querySelector('.container-capsula-descriptiva-grande');

document.querySelectorAll('.capsula').forEach(TriggerCapsula => {
  TriggerCapsula.addEventListener('click', function() {
    document.body.classList.add('no-scroll');
    containerCapsula.classList.add('active');

    let capsula = this.getAttribute('data-capsula');
    let capsulaDescriptiva = document.getElementById(`${capsula}`);
    let imgCapsula = capsulaDescriptiva.querySelector('.descripcion-grande-2 img');
    let descripcionCapsula1 = capsulaDescriptiva.querySelector('.descripcion-grande-1');
    descripcionCapsula1.classList.add('active');
    imgCapsula.classList.add('active');

    capsulaDescriptiva.querySelectorAll('.descripcion-grande-3 .contenedor-img').forEach(img => {
      img.classList.add('active');
    });
    
    capsulaDescriptiva.classList.add('active');
  });
});

containerCapsula.addEventListener('click', function(e) {
  if (e.target === this) { // Cierra solo si se hace clic fuera de la cápsula
    this.classList.remove('active');
    document.body.classList.remove('no-scroll');

    let capsulaActiva = this.querySelector('.capsula-descriptiva-grande.active');
    if (capsulaActiva) {
      capsulaActiva.classList.remove('active');
      capsulaActiva.querySelector('.descripcion-grande-2 img').classList.remove('active');
      capsulaActiva.querySelector('.descripcion-grande-1').classList.remove('active');

      capsulaActiva.querySelectorAll('.descripcion-grande-3 .contenedor-img').forEach(img => {
        img.classList.remove('active');
      });
    }
  }
});

// Selecciona todos los botones de cerrar dentro de capsulaGrande
document.querySelectorAll('.cerrar-capsula').forEach(botonCerrar => {
  botonCerrar.addEventListener('click', function() {
    containerCapsula.classList.remove('active');
    document.body.classList.remove('no-scroll');
    let capsulaGrandeActiva = this.parentElement;

    capsulaGrandeActiva.querySelector('.descripcion-grande-1').classList.remove('active');
    capsulaGrandeActiva.querySelector('.descripcion-grande-2 img').classList.remove('active');
    capsulaGrandeActiva.querySelectorAll('.descripcion-grande-3 .contenedor-img').forEach(img => {
      img.classList.remove('active');
    });

    containerCapsula.querySelectorAll('.capsula-descriptiva-grande.active').forEach(capsulaActiva => {
      capsulaActiva.classList.remove('active');
    });
  });
});



// CAPSULA DE PAÍS

document.addEventListener("DOMContentLoaded", () => {
  // Cargar JSON de paises
  fetch("/Apps/cartas/paises.json")
    .then(response => response.json())
    .then(data => {
      cargarPaises(data);
      precargarImagenesPais(data);
    })
    .catch(error => console.error("Error al cargar el JSON:", error));
});

function precargarImagenesPais(paises) {
  Object.values(paises).forEach(pais => {
    precargarImagen(pais.bandera);
    precargarImagen(pais.logro1[1]);
    precargarImagen(pais.logro2[1]);
    precargarImagen(pais.logro3[1]);
    precargarImagen(pais.fondo);
    precargarImagen(pais.personaje);
  });
}

function cargarPaises(paises) {
  document.querySelectorAll(".paises").forEach(elemento => {
    elemento.addEventListener("click", () => {
      const idPais = elemento.getAttribute("data-pais"); 
      
      if (paises[idPais]) {
        actualizarPais(paises[idPais], idPais);
        document.querySelector(".contenedor-capsula-pais").classList.add("active");
        document.querySelector(".capsula-pais").classList.add("active");
        sonidoSeleccion();
      
      } else {
        console.error("Pais no encontrado en JSON:", idPais);
      }
    });
  });
}

function actualizarPais(pais, idPais) {
  document.querySelector(".capsula-pais").style.backgroundColor = pais.colorFondo || "rgba(105, 105, 105, 0.562)";
  document.getElementById("capsula-pais-nombre").textContent = pais.nombre;
  document.getElementById("capsula-pais-descripcion").textContent = pais.descripcion;

  let etiqueta = document.getElementById("capsula-pais-etiqueta");
  etiqueta.className = ""; 
  etiqueta.textContent = pais.etiqueta[0];
  etiqueta.classList.add(pais.etiqueta[1]);

  document.getElementById("capsula-pais-fecha-inicio").textContent = pais.tiempo[0];
  document.getElementById("capsula-pais-fecha-termino").textContent = pais.tiempo[1];

  let bandera= document.getElementById("capsula-pais-bandera");
  bandera.src = pais.bandera;
  bandera.alt = `Bandera de ${pais.nombre}`;

  document.getElementById("capsula-pais-fondo").src = pais.fondo;
  document.getElementById("capsula-pais-personaje").src = pais.personaje;

  document.querySelectorAll(".logros-pais li").forEach(li => li.style.backgroundColor = pais.colorFondo || "rgba(105, 105, 105, 0.562)");
  document.querySelector("#logros-pais-1").setAttribute("data-logro-pais-exp", pais.logro1[0]);
  document.querySelector("#logros-pais-2").setAttribute("data-logro-pais-exp", pais.logro2[0]);
  document.querySelector("#logros-pais-3").setAttribute("data-logro-pais-exp", pais.logro3[0]);
  document.querySelector("#logros-pais-1 img").src = pais.logro1[1];
  document.querySelector("#logros-pais-2 img").src = pais.logro2[1];
  document.querySelector("#logros-pais-3 img").src = pais.logro3[1];
}

// Hover logros pais

document.querySelectorAll(".logros-pais li").forEach(li => {
  li.addEventListener("mouseenter", () => {
    let logro = li.getAttribute("data-logro-pais");
    let logroExp = li.getAttribute("data-logro-pais-exp");
    let imgLogro = document.querySelector(`.capsula-pais-img img[data-logro-pais="${logro}"]`);
    let imgFondo = document.getElementById("capsula-pais-fondo");
    let logrosExp = document.getElementById("capsula-pais-logros-exp");
    logrosExp.textContent = logroExp;
    logrosExp.style.opacity = "1";

    if (imgLogro) {
      imgLogro.classList.add("active");
      imgFondo.style.opacity = "0";
    }
  });

  li.addEventListener("mouseleave", () => {
    let logro = li.getAttribute("data-logro-pais");
    let imgLogro = document.querySelector(`.capsula-pais-img img[data-logro-pais="${logro}"]`);
    let imgFondo = document.getElementById("capsula-pais-fondo");
    let logrosExp = document.getElementById("capsula-pais-logros-exp");
    logrosExp.style.opacity = "0";

    if (imgLogro) {
      imgLogro.classList.remove("active");
      imgFondo.style.opacity = "1";
    }
  });
});

// Cerrar capsula pais
document.getElementById("capsula-pais-cerrar").addEventListener("click", () => {
  document.querySelector(".contenedor-capsula-pais").classList.remove("active");
  document.querySelector(".capsula-pais").classList.remove("active");
  sonidoSeleccion();
});

document.querySelector(".contenedor-capsula-pais").addEventListener("click", function(e) {
  if (e.target === this) { // Cierra solo si se hace clic fuera de la cápsula
    this.classList.remove("active");
    document.querySelector(".capsula-pais").classList.remove("active");
    sonidoSeleccion();
  }
});

// Carta paises

document.querySelector('.item-pais').addEventListener('dblclick', function() {
  this.classList.toggle('flipped');
  this.querySelector(".frontal").classList.toggle('flipped');
  this.querySelector(".trasera").classList.toggle('flipped');
  this.querySelector(".etiqueta").classList.toggle('flipped');
  this.querySelector(".personaje-historico-item").classList.toggle('flipped');
});



// NIEVE 

function copoNieve() {
  let contenedorNieve = document.querySelector('.nieve');
  const copo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  copo.setAttribute("class", "copo");
  copo.setAttribute("viewBox", "0 0 24 24");

  copo.style.left = Math.random() * contenedorNieve.offsetWidth + "px";
  copo.style.animationDuration = (10 + Math.random() * 10) + "s";
  copo.style.animationDelay = Math.random() * 10 + "s";
  copo.style.translate = `translateZ(${Math.random() * 100}px)`;

  copo.innerHTML = `
  <circle cx="2" cy="2" r="2" fill="white"/>
`;
  contenedorNieve.appendChild(copo);

  copo.addEventListener("animationend", function() {
    copo.remove();
    copoNieve();
  }
  );

}

for (let i = 0; i < 75; i++) {
  copoNieve();
}

function caerHojas() {
  let contenedorHojas = document.querySelector('.hojas');
  const hoja = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  hoja.setAttribute("class", "hoja");
  hoja.setAttribute("viewBox", "0 0 24 24");

  hoja.style.left = Math.random() * contenedorHojas.offsetWidth + "px";
  hoja.style.animationDuration = (10 + Math.random() * 10) + "s";
  hoja.style.animationDelay = Math.random() * 10 + "s";
  hoja.style.translate = `translateZ(${Math.random() * 100}px)`;

  hoja.innerHTML = `
	<path fill="#66a329" d="M1.4 1.7c.217.289.65.84 1.725 1.274c1.093.44 2.885.774 5.834.528c2.02-.168 3.431.51 4.326 1.556C14.161 6.082 14.5 7.41 14.5 8.5q0 .344-.027.734C13.387 8.252 11.877 7.76 10.39 7.5c-2.016-.288-4.188-.445-5.59-2.045c-.142-.162-.402-.102-.379.112c.108.985 1.104 1.82 1.844 2.308c2.37 1.566 5.772-.118 7.6 3.071c.505.8 1.374 2.7 1.75 4.292c.07.298-.066.611-.354.715a.7.7 0 0 1-.161.042a1 1 0 0 1-1.08-.794c-.13-.97-.396-1.913-.868-2.77C12.173 13.386 10.565 14 8 14c-1.854 0-3.32-.544-4.45-1.435c-1.124-.887-1.889-2.095-2.39-3.383c-1-2.562-1-5.536-.65-7.28L.73.806z" />
`;
  contenedorHojas.appendChild(hoja);

  hoja.addEventListener("animationend", function() {
    hoja.remove();
    caerHojas();
  }
  );

}

for (let i = 0; i < 15; i++) {
  caerHojas();
}

// EFECTO TIPO MAQUINA DE ESCRIBIR

function typeWriter(element, text, delay = 50) {
  let index = 0;
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }
  type();
}

// SONIDO DE SELECCIÓN

function sonidoSeleccion() {
  let sonido = new Audio("/audio/seleccion2.mp3");
  sonido.volume = 0.3;
  sonido.preload = "auto";
  sonido.play();
}

// PESTAÑEO DE PERSONAJE

document.querySelectorAll(".blink").forEach(blink => {
  const srcOriginal = blink.src;
  const srcBlink = blink.getAttribute("data-blink")
  let numero = Math.floor(Math.random() * 2001)

  setTimeout(() => {
    setInterval(() => {
    setTimeout(() => {
      blink.src = srcBlink;
    }, 500)
    setTimeout(() => {
      blink.src = srcOriginal;
    }, 600)
    setTimeout(() => {
      blink.src = srcBlink;
    }, 700)
    setTimeout(() => {
      blink.src = srcOriginal;
    }, 800)
  }, 2500)
  }, numero)

  console.log(numero)

  
  
})