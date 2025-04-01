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
    });
});
