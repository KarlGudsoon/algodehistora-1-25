document.addEventListener("DOMContentLoaded", function () {
  const cardCarousel = document.querySelectorAll('.item');

  cardCarousel.forEach(card => {
    const etiquetaItem = card.querySelector('.etiqueta');
    const personajeItem = card.querySelector('.personaje-item');
    const personajeHistoricoItem = card.querySelector('.personaje-historico-item');
    const personajeHistoricoItemTrasera = card.querySelector('.personaje-historico-item-trasera')
    const descripcionItem = card.querySelector('.descripcion-personaje-trasera')
    
    let startX;

    // Función para voltear la tarjeta
    const flipCard = () => {
      card.classList.toggle('flipped');

      if (descripcionItem) {
        descripcionItem.classList.toggle('flipped');
      }

      if (etiquetaItem) {
        etiquetaItem.classList.toggle('flipped');
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

var personajes = document.querySelectorAll(".personaje");

personajes.forEach((personaje) => {
    personaje.addEventListener("click", function () {
        var idPersonaje = this.id;
        var card = document.querySelector("#personaje-" + idPersonaje); 
        var cerrar = card.querySelector(".concepto-cerrar");
        var cardItem = card.querySelector(".item");

        if (cardItem) {
          cardItem.classList.toggle("active");
      }

        if (card) {
            card.classList.toggle("active");
        }

        if (card.classList.contains("active")) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        cerrar.addEventListener("click", function () {      
          card.classList.remove("active");
          cardItem.classList.remove("active");
          document.body.classList.remove("no-scroll");
        });
    });
});


var concepto = document.querySelectorAll(".concepto");

function manejarClic() {
    var idConcepto = this.id;
    var concepto = document.getElementById("glosario-" + idConcepto);
    
    concepto.classList.toggle("active")
}


concepto.forEach(function(concepto) {
    concepto.addEventListener("click", manejarClic);
});



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
  const carousel = document.querySelector(".inner");
  let isDragging = false;
  let startX, startScrollLeft;

  // Función para iniciar el arrastre
  const dragStart = (e) => {
    isDragging = true;
    // Obtener la posición inicial del toque o clic
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  // Función para arrastrar
  const dragging = (e) => {
    if (!isDragging) return;
    // Calcular el desplazamiento horizontal
    const x = e.pageX || e.touches[0].pageX;
    carousel.scrollLeft = startScrollLeft - (x - startX);
  };

  // Función para detener el arrastre
  const dragStop = () => {
    isDragging = false;
  };

  // Eventos de ratón (para desktop)
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  // Eventos táctiles (para móviles)
  carousel.addEventListener("touchstart", dragStart);
  carousel.addEventListener("touchmove", (e) => {
    // Prevenir el comportamiento por defecto del touchmove
    e.preventDefault();
    dragging(e);
  });
  document.addEventListener("touchend", dragStop);
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
    var containerCard = document.querySelectorAll(".contenedor-personaje")

    
    if (concepto) {
        concepto.classList.remove("active");
    }

    if (containerCard) {
      containerCard.classList.remove("active");
    }

    document.body.classList.remove("no-scroll");
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

var containers = document.querySelectorAll('.exit-animation');

containers.forEach(function(container) {
  container.addEventListener('click', function() {
    // Cambiar el estado de la animación a "running"
    container.style.animationPlayState = 'running';

    // Escuchar el evento transitionend para eliminar el elemento una vez que termine la transición
    container.addEventListener('animationend', function() {
      container.remove();
    });
  });
});

// VIEW TRANSITION //

var botones = document.querySelectorAll(".viewtransition");

botones.forEach(function(boton) {
  boton.addEventListener('click', function(event) {
    // Previene el comportamiento predeterminado de seguir el enlace inmediatamente
    event.preventDefault();

    // Agrega la clase para la animación al body actual
    document.body.classList.add('clip-transition');

    // Obtiene la URL de destino del atributo href del botón
    var href = boton.getAttribute('href');

    // Espera a que la animación termine antes de redirigir
    document.body.addEventListener('animationend', function() {
      // Redirige a la URL de destino
      window.location.href = href;
    }, { once: true });

    // Elimina la clase 'clip-transition' después de 2.5 segundos
    setTimeout(function() {
      document.body.classList.remove('clip-transition');
    }, 2500); // 2500 milisegundos = 2.5 segundos
  });
});







