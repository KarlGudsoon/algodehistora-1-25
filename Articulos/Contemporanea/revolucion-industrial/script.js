var seccionAntecedentes = document.querySelector(".seccion-antecedentes");
var abrirAntecedentes = document.querySelector("#abrir-antecedentes");

// Asignar el evento click
abrirAntecedentes.addEventListener("click", function() {
    // Verificar la altura actual y alternar
    if (seccionAntecedentes.style.height === "35vw") {
        seccionAntecedentes.style.height = "10vw"; // Volver a la altura inicial
    } else {
        seccionAntecedentes.style.height = "35vw"; // Cambiar a la altura expandida
    }
});


var elementos = [document.querySelector("#agricultura"), 
                 document.querySelector("#demografia"), 
                 document.querySelector("#mentalidad")];

// Función para manejar el clic y alternar opacidad
function toggleOpacity(event) {
    // Obtener el ID del elemento clicado
    var idElemento = event.target.id;

    // Construir el ID del elemento relacionado
    var carta = document.querySelector(`#carta-${idElemento}`);

    // Alternar la opacidad entre 0 y 1
    if (carta.style.opacity === "0") {
        carta.style.opacity = "1";
    } else {
        carta.style.opacity = "0";
    }
}

function toggleOpacityFondo(event) {
    // Obtener el ID del elemento clicado
    var idElemento = event.target.id;

    // Construir el ID del elemento relacionado
    var fondo = document.querySelector(`#fondo-${idElemento}`);

    // Alternar la opacidad entre 0 y 1
    if (fondo.style.opacity === "1") {
        fondo.style.opacity = "0.5";
    } else {
        fondo.style.opacity = "1";
    }
}

function toggleTranslate(event) {
    // Obtener el ID del elemento clicado
    var idElemento = event.target.id;

    // Obtener el elemento HTML relacionado
    var elemento = document.querySelector(`#${idElemento}`);

    // Alternar la propiedad transform
    if (elemento.style.transform === "translateY(0%)") {
        elemento.style.transform = "translateY(5%)";
    } else {
        elemento.style.transform = "translateY(0%)";
    }
}



// Asignar evento click a todos los elementos
elementos.forEach(function(elemento) {
    elemento.addEventListener("click", toggleOpacity);
});

elementos.forEach(function(elemento) {
    elemento.addEventListener("click",  toggleOpacityFondo);
});

elementos.forEach(function(elemento) {
    elemento.addEventListener("click",  toggleTranslate);
});

/* VENTANA SCRIPT */

const botonesAbrir = document.querySelectorAll(".abrir-ventana"); // Selecciona todos los botones con la clase "abrir-ventana"
const body = document.body;

// Evento para abrir la ventana correspondiente
botonesAbrir.forEach(boton => {
    boton.addEventListener("click", () => {
        // Leer el ID del botón y construir el ID de la ventana
        const idVentana = `ventana-${boton.id}`;
        const ventana = document.getElementById(idVentana);

        // Abrir la ventana si existe
        if (ventana) {
            ventana.classList.add("activa");
            body.classList.add("no-scroll");
        } else {
            console.warn(`No se encontró una ventana con el id ${idVentana}`);
        }
    });
});

// Evento delegado para cerrar ventanas
document.addEventListener("click", (event) => {
    if (event.target.matches(".cerrar-ventana")) {
        const ventana = event.target.closest(".contenedor-ventana"); // Encuentra la ventana más cercana al botón
        if (ventana) {
            ventana.classList.remove("activa");
            body.classList.remove("no-scroll");
        }
    }
});

const wrapper = document.querySelector('.contenedor-wrapper-revolucion');

const progreso = document.querySelector('.contenedor-explicacion-progreso');
const revolucion = document.querySelector('.contenedor-explicacion-revolucion');

const btnIrRevolucion = document.getElementById('btn-ir-revolucion');
const btnIrProgreso = document.getElementById('btn-ir-progreso');
const fondoRevolucion = document.getElementById('fondo-revolucion');
const fondoProgreso = document.getElementById('fondo-progreso');
const descripcionRevolucion = document.querySelectorAll('.descripcion-revolucion');
const descripcionProgreso = document.querySelectorAll('.descripcion-progreso');
const contenedorDescripcionRevolucion = document.querySelector('.contenedor-descripcion-revolucion');
const contenedorDescripcionProgreso = document.querySelector('.contenedor-descripcion-progreso');


const getSectionOffset = (element) => element.offsetLeft;

btnIrRevolucion.addEventListener('click', () => {
  wrapper.scrollTo({
    left: getSectionOffset(revolucion),
    behavior: 'smooth',
  });
  fondoRevolucion.style.opacity = "1";
  fondoProgreso.style.opacity = "0";

  contenedorDescripcionProgreso.style.opacity = "0";
  contenedorDescripcionProgreso.style.visibility = "hidden";

  contenedorDescripcionRevolucion.style.opacity = "1";
  contenedorDescripcionRevolucion.style.visibility = "visible";

  instrucciones.style.display = "flex";
});

btnIrProgreso.addEventListener('click', () => {
  wrapper.scrollTo({
    left: getSectionOffset(progreso),
    behavior: 'smooth',
  });
  fondoProgreso.style.opacity = "1";
  fondoRevolucion.style.opacity = "0";

  descripcionRevolucion.forEach((desc) => {
    desc.style.opacity = "0";
    desc.style.visibility = "hidden";
  });

  contenedorDescripcionProgreso.style.opacity = "1";
  contenedorDescripcionProgreso.style.visibility = "visible";

  contenedorDescripcionRevolucion.style.opacity = "0";
  contenedorDescripcionRevolucion.style.visibility = "hidden";
});



// Alternar el ancho de contraProgreso
const contraProgreso = document.querySelector('.contradicciones-progreso');
const contraBtn = document.getElementById('contradicciones-btn');

contraBtn.addEventListener('click', () => {
  if (contraProgreso.style.width === '12vw') {
    contraProgreso.style.width = '0';
  } else {
    contraProgreso.style.width = '12vw';
  }
});


var seccionRevolucion = document.querySelector(".revolucion-industrial");
var abrirRevolucion = document.querySelector("#expandir-explicacion");

// Asignar el evento click
abrirRevolucion.addEventListener("click", function() {
    // Verificar la altura actual y alternar
    if (seccionRevolucion.style.height === "80vw") {
        seccionRevolucion.style.height = "40vw"; // Volver a la altura inicial
    } else {
        seccionRevolucion.style.height = "80vw"; // Cambiar a la altura expandida
    }
});

const cards = document.querySelectorAll('.card-2'); // Seleccionar todas las cartas
const flipBtn = document.getElementById('contradicciones-btn'); // Seleccionar el botón

// Alternar la clase "flipped" al hacer clic en el botón
flipBtn.addEventListener('click', () => {
  cards.forEach(card => {
    card.classList.toggle('flipped'); // Alternar "flipped" en cada carta
  });
});

const botonInvisible = document.querySelectorAll(".boton-invisible");
const instrucciones = document.getElementById("instrucciones-descripcion-revolucion")

botonInvisible.forEach(boton => {
    boton.addEventListener("click", () => {
        const idVentana = `d-${boton.id}`;
        const ventana = document.getElementById(idVentana);

        if (ventana) {
            if (ventana.style.opacity === "1") {
                ventana.style.opacity = "0";
                ventana.style.transform = "translateY(50%)";
                ventana.style.visibility = "hidden";
            } else {
                ventana.style.opacity = "1";
                ventana.style.transform = "translateY(0%)";
                ventana.style.visibility = "visible";
            }
        }

        if (instrucciones) {
            instrucciones.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel-container");
    let isDragging = false;
    let startX, startScrollLeft;
  
    const dragStart = (e) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
  
    const dragStop = () => {
      isDragging = false;
    };
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  });

  document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector("#carousel-2");
    let isDragging = false;
    let startX, startScrollLeft;
  
    const dragStart = (e) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
  
    const dragStop = () => {
      isDragging = false;
    };
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  });

// Primer Carrusel
const carousel = document.getElementById('carousel');
const botonCarousel = document.getElementById('boton-carousel');
const botonImagen = document.getElementById('boton-imagen');
const items = document.querySelectorAll('.item'); // Ítems del primer carrusel
let autoScrollInterval;
let isScrolling = true;
let scrollSpeed = 2;
let isPausedByHover = false;
let isPausedByClick = false;

function autoScroll() {
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

    if (carousel.scrollLeft >= maxScroll) {
        smoothReset();
    } else {
        carousel.scrollLeft += scrollSpeed;
    }
}

function smoothReset() {
    let start = carousel.scrollLeft;
    let end = 0;
    let duration = 800;
    let startTime = null;

    function animateScroll(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            carousel.scrollLeft = start + (end - start) * progress;
            requestAnimationFrame(animateScroll);
        } else {
            carousel.scrollLeft = end;
        }
    }

    requestAnimationFrame(animateScroll);
}

function startAutoScroll() {
    if (!autoScrollInterval) {
        autoScrollInterval = setInterval(autoScroll, 20);
        isScrolling = true;
        botonImagen.src = "/svg/line-md--pause.svg";
    }
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
    isScrolling = false;
    botonImagen.src = "/svg/play.svg";
}

function updateButtonState() {
    if (isScrolling) {
        botonImagen.src = "/svg/line-md--pause.svg";
    } else {
        botonImagen.src = "/svg/play.svg";
    }
}

botonCarousel.addEventListener("click", () => {
    if (isPausedByClick || isPausedByHover) {
        isPausedByClick = false;
        isPausedByHover = false;
        startAutoScroll();
    } else {
        isScrolling ? stopAutoScroll() : startAutoScroll();
    }
    updateButtonState();
});

items.forEach(item => {
   /* item.addEventListener("mouseenter", () => {
        if (isScrolling) {
            isPausedByHover = true;
            stopAutoScroll();
            updateButtonState();
        }
    }); */

    item.addEventListener("click", () => {
        if (isScrolling) {
            isPausedByClick = true;
            stopAutoScroll();
            updateButtonState();
        }
    });
});

carousel.addEventListener('mousedown', stopAutoScroll);

startAutoScroll();
updateButtonState();

// Segundo Carrusel
const carousel2 = document.getElementById('carousel-2');
const botonCarousel2 = document.getElementById('boton-carousel-2');
const botonImagen2 = document.getElementById('boton-imagen-2');
const items2 = document.querySelectorAll('.item-2'); // Ítems del segundo carrusel
let autoScrollInterval2;
let isScrolling2 = true;
let scrollSpeed2 = 2;
let isPausedByHover2 = false;
let isPausedByClick2 = false;

function autoScroll2() {
    const maxScroll = carousel2.scrollWidth - carousel2.offsetWidth;

    if (carousel2.scrollLeft >= maxScroll) {
        smoothReset2();
    } else {
        carousel2.scrollLeft += scrollSpeed2;
    }
}

function smoothReset2() {
    let start = carousel2.scrollLeft;
    let end = 0;
    let duration = 800;
    let startTime = null;

    function animateScroll(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            carousel2.scrollLeft = start + (end - start) * progress;
            requestAnimationFrame(animateScroll);
        } else {
            carousel2.scrollLeft = end;
        }
    }

    requestAnimationFrame(animateScroll);
}

function startAutoScroll2() {
    if (!autoScrollInterval2) {
        autoScrollInterval2 = setInterval(autoScroll2, 20);
        isScrolling2 = true;
        botonImagen2.src = "/svg/line-md--pause.svg";
    }
}

function stopAutoScroll2() {
    clearInterval(autoScrollInterval2);
    autoScrollInterval2 = null;
    isScrolling2 = false;
    botonImagen2.src = "/svg/play.svg";
}

function updateButtonState2() {
    if (isScrolling2) {
        botonImagen2.src = "/svg/line-md--pause.svg";
    } else {
        botonImagen2.src = "/svg/play.svg";
    }
}

botonCarousel2.addEventListener("click", () => {
    if (isPausedByClick2 || isPausedByHover2) {
        isPausedByClick2 = false;
        isPausedByHover2 = false;
        startAutoScroll2();
    } else {
        isScrolling2 ? stopAutoScroll2() : startAutoScroll2();
    }
    updateButtonState2();
});

items2.forEach(item => {
    

    item.addEventListener("click", () => {
        if (isScrolling2) {
            isPausedByClick2 = true;
            stopAutoScroll2();
            updateButtonState2();
        }
    });
});

carousel2.addEventListener('mousedown', stopAutoScroll2);

setTimeout(() => { startAutoScroll2();}, 2000);
updateButtonState2();


const cardCarousel = document.querySelectorAll('.item');

cardCarousel.forEach(card => {
  const etiquetaItem = card.querySelector('.etiqueta');
  const personajeItem = card.querySelector('.personaje-item');

  card.addEventListener('dblclick', () => {
    card.classList.toggle('flipped');

    if (etiquetaItem) {
      etiquetaItem.classList.toggle('flipped');
    }

    if (personajeItem) {
        personajeItem.classList.toggle('flipped');
      }
  });
});

const cardCarousel2 = document.querySelectorAll('.item-2');

cardCarousel2.forEach(card => {
  const etiquetaItem = card.querySelector('.etiqueta');
  const personajeItem = card.querySelector('.personaje-item');

  card.addEventListener('dblclick', () => {
    card.classList.toggle('flipped');

    if (etiquetaItem) {
      etiquetaItem.classList.toggle('flipped');
    }

    if (personajeItem) {
        personajeItem.classList.toggle('flipped');
      }
  });
});