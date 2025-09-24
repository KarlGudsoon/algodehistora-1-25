// Cuestionario del artículo

let correctas = [1, 2, 1, 3, 2];
let opcion_elegida = [];
let cantidad_correctas = 0;

function respuesta(num_pregunta, seleccionada) {
    opcion_elegida[num_pregunta] = seleccionada.value;

    let id = "p" + num_pregunta;
    let labels = document.getElementById(id).childNodes;

    // Restablecer el color de fondo de todas las opciones
    labels[3].classList.remove("seleccionada");
    labels[5].classList.remove("seleccionada");
    labels[7].classList.remove("seleccionada");
    labels[9].classList.remove("seleccionada");

    // Establecer el color de fondo de la opción seleccionada
    seleccionada.parentNode.classList.add("seleccionada");

    // Llamar a la función corregir para actualizar la cantidad de respuestas correctas
    corregir();
}

const tablaNotas = [
    { puntaje: 0, nota: 2 },
    { puntaje: 1, nota: 2.7 },
    { puntaje: 2, nota: 3.3 },
    { puntaje: 3, nota: 4 },
    { puntaje: 4, nota: 5.5 },
    { puntaje: 5, nota: 7 }
];

function obtenerNota(puntaje) {
    // Encontrar los puntos adyacentes
    for (let i = 0; i < tablaNotas.length - 1; i++) {
        const p1 = tablaNotas[i];
        const p2 = tablaNotas[i + 1];

        if (puntaje >= p1.puntaje && puntaje <= p2.puntaje) {
            // Interpolación lineal
            const t = (puntaje - p1.puntaje) / (p2.puntaje - p1.puntaje);
            const nota = p1.nota + t * (p2.nota - p1.nota);
            return nota.toFixed(1);  // Formatear a un decimal adicional
        }
    }

    // Si el puntaje está fuera del rango de la tabla
    return null;
}

function corregir() {
    cantidad_correctas = 0;
    for (let i = 0; i < correctas.length; i++) {
        if (correctas[i] == opcion_elegida[i]) {
            cantidad_correctas++;
        }
    }

    // Obtener la nota correspondiente al puntaje de respuestas correctas
    const nota = obtenerNota(cantidad_correctas);

    // Mostrar la nota en el elemento de resultado
    document.getElementById("resultado").value = nota;
}

let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Mostrar la primera pregunta
questions[currentQuestion].classList.add('active');
updateQuestionNumber();
currentQuestionNumber()

// Función para mostrar la pregunta actual
function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.remove('active');
        if (i === index) {
            question.classList.add('active');
        }
    });
    updateQuestionNumber();
}

// Evento para el botón "Siguiente"
nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        currentQuestionNumber()
    }
});

// Evento para el botón "Anterior"
prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        currentQuestionNumber()
    }
});

function currentQuestionNumber() {
    const spans = document.querySelectorAll('.markerQuestion span');
    spans.forEach(span => span.classList.remove('activa'));

    const actual = document.getElementById(`c-p${currentQuestion}`);
    if (actual) {
        actual.classList.add('activa');
    }
}

// Función para actualizar el número de la pregunta actual
function updateQuestionNumber() {
    document.getElementById("currentQuestion").innerHTML = `${currentQuestion + 1}`;
}

questions.forEach((question) => {
    const inputs = question.querySelectorAll('input[type="radio"]');
    const questionId = question.id;

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            const span = document.getElementById(`c-${questionId}`);
            if (span) {
                span.classList.add('hecha');
            }
            checkAllQuestionsAnswered();
        });
    });
});

submitButton = document.querySelector("#finalizar-cuestionario-final")

// Función para verificar si todas las preguntas han sido respondidas
function checkAllQuestionsAnswered() {
    let allAnswered = true;
    questions.forEach((question) => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        let answered = Array.from(inputs).some(input => input.checked);
        if (!answered) {
            allAnswered = false;
        }
    });

    if (allAnswered) {
        submitButton.style.pointerEvents = 'auto';
        submitButton.style.filter = 'brightness(100%)'; // opcional para hacer que el botón se vea habilitado
    } else {
        submitButton.style.pointerEvents = 'none';
        submitButton.style.filter = 'brightness(80%)'; // opcional para hacer que el botón se vea deshabilitado
    }
}

questions.forEach((question) => {
    const questionId = question.id;
    const span = document.getElementById(`c-${questionId}`);
    if (span) {
        span.addEventListener('click', () => {
            // Cambiar a la pregunta correspondiente
            const questionIndex = Array.from(questions).indexOf(question);
            currentQuestion = questionIndex;
            showQuestion(currentQuestion);
            currentQuestionNumber()
        });
    }
});

function mostrarResumenFinal() {
    const contenedorResumen = document.getElementById('resumen-respuestas');
    const contenedorResultado = document.querySelector(".resultado-cuestionario-final");
    const contenedorNav = document.querySelector(".cuestionario-descripcion");
    contenedorResumen.innerHTML = '';
    contenedorResumen.style.display = 'block';
    contenedorResultado.style.justifyContent = "flex-start";
  
    questions.forEach((question, index) => {
      const textoPregunta = question.querySelector('h2')?.textContent || `Pregunta ${index + 1}`;
      const opciones = question.querySelectorAll('input[type="radio"]');
      let textoRespuestaCorrecta = '';
  
      opciones.forEach((opcion, i) => {
        if (parseInt(opcion.value) === correctas[index]) {
          textoRespuestaCorrecta = opcion.parentNode.textContent.trim();
        }
      });
  
      const bloque = document.createElement('div');
      bloque.classList.add('resumen-item');
      bloque.innerHTML = `
        <p><strong>${index + 1}. ${textoPregunta}</strong></p>
        <p>✅ Respuesta correcta: <span style="color:green;">${textoRespuestaCorrecta}</span></p>
        <hr>
      `;
  
      contenedorResumen.appendChild(bloque);
    });
}

document.getElementById("finalizar-articulo").addEventListener("click", () => {
    const cuestionario = document.querySelector(".cuestionario-final");

    cuestionario.classList.remove("active");
    document.body.classList.remove("no-scroll");

    confetti({
        particleCount: 200,
        spread: 600,
        origin: { x: 0.5, y: 0 },
      });
});

document.getElementById("reintentar-cuestionario").addEventListener("click", () => {
    // Reiniciar respuestas seleccionadas
    opcion_elegida = [];
    cantidad_correctas = 0;
    document.getElementById("resultado").value = "";

    // Desmarcar todos los radios y estilos
    questions.forEach((question, index) => {
        const radios = question.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });

        // Quitar clases visuales
        const labels = question.querySelectorAll("label");
        labels.forEach(label => label.classList.remove("seleccionada"));
    });

    // Volver a la primera pregunta
    currentQuestion = 0;
    showQuestion(currentQuestion);
    currentQuestionNumber();

    // Ocultar resultado y resumen
    document.querySelector(".resultado-cuestionario-final").classList.remove("active");
    document.getElementById('resumen-respuestas').style.display = 'none';

    // Reactivar el cuestionario
    document.querySelector(".container-preguntas").style.display = "block";

    // Desactivar botón finalizar hasta que se respondan todas
    checkAllQuestionsAnswered();

    const spans = document.querySelectorAll('.markerQuestion span');
    spans.forEach(span => span.classList.remove('hecha'));
});

  

// MEDIDOR DE APROBACIÓN

function generarMedidor(promedio) {
const radio = 60;
const circunferencia = 2 * Math.PI * radio;
const porcentaje = Math.min(Math.max(promedio, 0), 7); // Asegurar que esté entre 0 y 7
const offset = circunferencia * (1 - porcentaje / 7);

const porcentajeNota = ((porcentaje / 7) * 100).toFixed(0);

// Elegir color según el promedio
let color;
if (promedio >= 5) {
    color = "#0da761";
} else if (promedio >= 4) {
    color = "#f2a400"; // Amarillo
} else {
    color = "#eb3b3b"; // Rojo
}

return `
    <svg width="280" height="250" viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" style="font-family: sans-serif;">
    <circle cx="90" cy="90" r="${radio}" stroke="#ddd" stroke-width="12" fill="none"/>
    <circle cx="90" cy="90" r="${radio}" stroke="${color}" stroke-width="12" fill="none"
        stroke-dasharray="${circunferencia}" 
        stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 90 90)" />
    <text x="90" y="100" text-anchor="middle" font-family="Roboto" font-size="32" fill="#2e2e2e">${porcentajeNota}%</text>
    <text x="90" y="190" text-anchor="middle" font-family= "Roboto" font-size="16" fill="#2e2e2e" font-weight="bold" letter-spacing="2">
        ${promedio === 7 ? "PERFECTO" : promedio >= 4 ? "APROBADO" : "NO APROBADO"}
    </text>
    <text x="90" y="210" text-anchor="middle" font-size="12" fill="#2e2e2e" letter-spacing="2">PORCENTAJE DE APROBACIÓN</text>
    </svg>`;
}

function calcularYMostrarPromedio() {
const promedioInput = document.getElementById("resultado");
const promedio = parseFloat(promedioInput.value);

if (isNaN(promedio)) return; 

// Guardar en localStorage
localStorage.setItem("resultadoFinal", promedio);

const grafico = generarMedidor(promedio);
document.getElementById('grafico-cuestionario').innerHTML = grafico;
}

calcularYMostrarPromedio();

document.getElementById("finalizar-cuestionario-final").addEventListener("click", calcularYMostrarPromedio);

const resultadoGuardado = localStorage.getItem("resultadoFinal");
console.log("Resultado recuperado:", resultadoGuardado);

function Aprobado() {
    const WidgetCuestionario = document.querySelector('.widget-cuestionario');
    const WidgetProgresoPagina = document.querySelector(".widget-progreso-pagina")
    
    WidgetCuestionario.querySelector("img").src = "/icons/check-white.svg";
    WidgetProgresoPagina.setAttribute("data-tippy-content", "Artículo completado")

    mostrarResumenFinal();

    const reiniciarCuestionario = document.getElementById("reintentar-cuestionario")
    reiniciarCuestionario.classList.remove("active");

    
}

function verificarAprobacion() {
    const resultadoGuardado = parseFloat(localStorage.getItem("resultadoFinal")); 

    if (resultadoGuardado >= 4) {
        document.getElementById('grafico-cuestionario').innerHTML = generarMedidor(resultadoGuardado);

        const preguntas = document.querySelector(".container-preguntas");
        const resultado = document.querySelector(".resultado-cuestionario-final");
        const checkCuestionario = document.querySelector(".progreso-cuestionario-final .progreso-completado");
        const ArticuloCompletadoTitulo = document.querySelector(".texto-inicio-pagina")

        ArticuloCompletadoTitulo.classList.add("completado");

        if (preguntas) preguntas.style.display = "none";
        if (resultado) resultado.classList.add("active");

        document.querySelector(".progress-ring-bg").style.fill = "#408464";

        checkCuestionario.style.display = "block";

        Aprobado();

    } else {
        const reiniciarCuestionario = document.getElementById("reintentar-cuestionario")
        reiniciarCuestionario.classList.add("active"); 
    }
}

verificarAprobacion();




var botonGeo = document.getElementById("lengueta-geo");
var botonPueblos = document.getElementById("lengueta-pueblos");
var titulo = document.getElementById("titulo-explicacion1");
var texto = document.getElementById("texto-explicacion1");
var img = document.getElementById("img-explicacion1");

botonGeo.addEventListener("click", function () {
    titulo.innerHTML = "GEOMORFOLOGÍA DE CHILE";
    texto.innerHTML = "El territorio de Chile se formó hace millones de años debido a procesos geológicos como el choque de placas tectónicas, que formaron la cordillera de los Andes, que junto a la corriente de Humboldt, mantiene el Desierto de Atacama.";
    img.src = "/img/moderna/descubrimiento-chile/00909c64-2d8e-464b-bcb6-e1013e2b5e7d (2).webp"

    const containerId = this.getAttribute('data-container');
    const container = document.getElementById(containerId);

    document.getElementById('pueblos-originarios').classList.remove('active');
    
    container.classList.add('active');
    this.classList.add('active');
    botonPueblos.classList.remove('active');
});

botonPueblos.addEventListener("click", function () {
    titulo.innerHTML = "PUEBLOS ORIGINARIOS";
    texto.innerHTML = "Antes de la llegada de los españoles y la dominación Inca, en el territorio actual de Chile habitaron diversos pueblos originarios. Como los límites actuales no existían en el siglo XVI, los pueblos tenían su territorio más allá de la frontera actual entre países.";
    img.src = "/img/moderna/descubrimiento-chile/selknam-ropa-cazar-removebg-preview.png"

    const containerId = this.getAttribute('data-container');
    const container = document.getElementById(containerId);

    document.getElementById('geomorfologia').classList.remove('active');
    
    container.classList.add('active');
    this.classList.add('active');
    botonGeo.classList.remove('active');
});


document.querySelectorAll('.carta-pueblo').forEach(div => {
    div.addEventListener('mouseenter', function() {
        let mapaId = 'mapa_' + this.id;
        let mapa = document.getElementById(mapaId);
        if (mapa) {
            mapa.style.fill = "yellow";
            mapa.querySelectorAll('*').forEach(el => {
                el.style.fill = "yellow";
            });
        }
    });

    div.addEventListener('mouseleave', function() {
        let mapaId = 'mapa_' + this.id;
        let mapa = document.getElementById(mapaId);
        if (mapa) {
            mapa.style.fill = "";
            mapa.querySelectorAll('*').forEach(el => {
                el.style.fill = "";
            });
        }
    });
});



document.querySelectorAll('.mapa_pueblo').forEach(el => {
    el.addEventListener('mouseenter', function() {
        let cartaId = this.getAttribute('data-carta'); 
        let carta = document.getElementById(cartaId);

        if (carta) {
            carta.style.transform = "scale(1.1)";
        }
    });

    el.addEventListener('mouseleave', function() {
        let cartaId = this.getAttribute('data-carta');
        let carta = document.getElementById(cartaId);

        if (carta) {
            carta.style.transform = "";
        }
    });
});

document.getElementById("abrir-mapa").addEventListener("click", function() {
    var mapa = document.getElementById("mapa-descubrimiento-america");
    var activador = document.querySelector(".capa-activador-mapa");

    if (activador.classList.contains("activo")) {
        activador.classList.remove("activo");
    }
    else {
        activador.classList.add("activo");
    }

    mapa.classList.toggle("activo");
    document.body.classList.toggle("no-scroll"); // Agregar o quitar la clase "no-scroll" al body
});

document.querySelector(".capa-activador-mapa").addEventListener("click", function() {
    var mapa = document.getElementById("mapa-descubrimiento-america");

    if (this.classList.contains("activo")) {
        this.classList.remove("activo");
    } else {
        this.classList.add("activo");
    }
        

    mapa.classList.add("activo");
    document.body.classList.add("no-scroll"); // Agregar o quitar la clase "no-scroll" al body
});

document.getElementById("india-america").addEventListener("mouseenter", function() {
    const spanTexto = this.querySelector("span");

    this.style.background = "#147bb7";
    this.style.color = "white";
    this.style.borderColor = "rgb(246, 210, 214, 0.75)";
    spanTexto.innerHTML = "América";
});

document.getElementById("india-america").addEventListener("mouseleave", function() {
    const spanTexto = this.querySelector("span");

    this.style.background = ""; 
    this.style.color = "";     
    this.style.borderColor = "";
    spanTexto.innerHTML = '"Indias"';
});


// EXTRA DE PARLAMENTO DE QUILÍN

document.getElementById("boton-parlamento").addEventListener("click", function() {
    const capsula2 = document.querySelector(".contenedor-parlamento .capsula-2") 
      capsula2.classList.add("active");
  });

let cerrarCapsula = document.querySelector(".cerrar-capsula");

cerrarCapsula.addEventListener("click", function() {
  this.parentElement.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

// EXTRA REPRODUCIR SONIDO

function toggleAudio() {
let triggers = document.querySelectorAll(".trigger-sonido");

triggers.forEach(btn => {
    btn.addEventListener("click", () => {
    let srcSonido = btn.getAttribute("data-sonido");
    let sonido = new Audio(srcSonido);
    sonido.volume = 0.2;
    sonido.play();
    });
});
}

toggleAudio();

  