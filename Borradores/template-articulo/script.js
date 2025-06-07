document.addEventListener("DOMContentLoaded", function () {
  const cardCarousel = document.querySelectorAll('.item');

  cardCarousel.forEach(card => {
    const etiquetaItem = card.querySelector('.etiqueta');
    const personajeItem = card.querySelector('.personaje-item');
    const personajeHistoricoItem = card.querySelector('.personaje-historico-item');
    const personajeHistoricoItemTrasera = card.querySelector('.personaje-historico-item-trasera')
    const descripcionItem = card.querySelector('.descripcion-personaje-trasera')
    const caracteristicaFrontal = card.querySelector('.contenedor-caracteristicas');
    
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
  document.getElementById("imagen-personaje-trasera").src = personaje.imagen;

  document.getElementById("fondo-frontal").src = personaje.fondoFrontal;
  document.getElementById("fondo-trasera").src = personaje.fondoTrasera;

  document.getElementById("puntaje-carta-personaje").textContent = personaje.puntaje;

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
      //caracteristicasSpans[index].classList.add(caracteristica.clase);
    }
  });

  const personalidadDiv = document.getElementById("personalidad-personaje");
  personalidadDiv.innerHTML = "";
  personaje.personalidad.forEach(caracteristica => {
    const span = document.createElement("span");
    span.textContent = caracteristica.nombre;
    span.classList.add(caracteristica.clase);
    personalidadDiv.appendChild(span);
  });

  /* const contenedorIcons = document.getElementById("iconos-personaje");
  const spans = contenedorIcons.querySelectorAll("span");
  spans.forEach(span => {
    span.style.background = personaje.color;
  });
*/

  document.querySelector(".lugar-personaje").id = `lugar-${idPersonaje}`;
  document.querySelector(".reconocimiento-personaje").id = `reconocimiento-${idPersonaje}`;
  document.querySelector(".tiempo-personaje").id = `tiempo-${idPersonaje}`;

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
    var containerCard = document.getElementById("contenedor-personaje");
    var Card = document.getElementById("personaje-historico");
    const cardPersonaje = document.querySelectorAll('.item');
    
    cardPersonaje.forEach(card => {
      card.classList.remove('flipped');

      card.classList.remove('animate__tada');
  
      card.querySelectorAll('.flipped').forEach(element => {
          element.classList.remove('flipped');
      });
    });

    
    if (concepto) {
        concepto.classList.remove("active");
        
    }

    if (containerCard) {
      setTimeout(() => {
        containerCard.classList.remove("active");
      }
      , 500);
      
    }

    if (Card) {
      Card.classList.remove("active");
    }

    setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }
    , 500);

    

     
}


conceptoCerrar.forEach(function(cerrar) {
    cerrar.addEventListener("click", manejarCierre);
});


// ABRIR SOBRE 

const DECISION_THRESHOLD = 150

  let isAnimating = false
  let pullDeltaX = 0 // distance from the card being dragged

  function startDrag(event) {
    if (isAnimating) return

    // get the first article element
    const actualCard = event.target.closest('.sobre')
    if (!actualCard) return

    // get initial position of mouse or finger
    const startX = event.pageX ?? event.touches[0].pageX

    // listen the mouse and touch movements
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })

    function onMove(event) {
      // current position of mouse or finger
      const currentX = event.pageX ?? event.touches[0].pageX

      // the distance between the initial and current position
      pullDeltaX = currentX - startX

      // there is no distance traveled in X axis
      if (pullDeltaX === 0) return

      // change the flag to indicate we are animating
      isAnimating = true

      // calculate the rotation of the card using the distance
      const deg = pullDeltaX / 10
      const opa = 1 - Math.abs(pullDeltaX) / 400;

      // apply the transformation to the card
      actualCard.style.transform = `translateX(${pullDeltaX}px)`
      actualCard.style.opacity = opa;

      // change the cursor to grabbing
      actualCard.style.cursor = 'grabbing'
      
      var body = document.querySelector("body");
      body.style.userSelect = 'none'
      

      // change opacity of the choice info
      const opacity = Math.abs(pullDeltaX) / 100
      const isRight = pullDeltaX > 0

      const choiceEl = isRight
        ? document.querySelector('.widget-card-personaje')
        : document.querySelector('.widget-card-personaje')

      choiceEl.style.opacity = opacity
    }

    function onEnd(event) {
      // remove the event listeners
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)

      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onEnd)
      
      var body = document.querySelector("body");
      body.style.userSelect = 'auto'

      // saber si el usuario tomo una decisión
      const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

      if (decisionMade) {
        const goRight = pullDeltaX >= 0

        // add class according to the decision
        actualCard.classList.add(goRight ? 'go-right' : 'go-left')
        actualCard.addEventListener('transitionend', () => {
          actualCard.remove()
        })
      } else {
        actualCard.classList.add('reset')
        actualCard.classList.remove('go-right', 'go-left')

        actualCard.querySelectorAll('.choice').forEach(choice => {
          choice.style.opacity = 0
        })
      }

      // reset the variables
      actualCard.addEventListener('transitionend', () => {
        actualCard.removeAttribute('style')
        actualCard.classList.remove('reset')

        pullDeltaX = 0
        isAnimating = false
      })

      // reset the choice info opacity
      actualCard
        .querySelectorAll(".choice")
        .forEach((el) => (el.style.opacity = 0));
    }
  }

  document.addEventListener('mousedown', startDrag)
  document.addEventListener('touchstart', startDrag, { passive: true })



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

    const card = document.querySelector('.item');

    card.classList.add('animate__tada');
  });

  
// ABRIR SOBRE (2) / EXIT ANIMATION //

document.getElementById("carta-cerrar").addEventListener("click", function() {
  var sonidoSobre = new Audio("/audio/arrastrar.mp3");
    sonidoSobre.volume = 0.5;
    sonidoSobre.preload = "auto";
    sonidoSobre.play();
});

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