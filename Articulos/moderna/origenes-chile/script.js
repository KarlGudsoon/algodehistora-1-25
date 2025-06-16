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

submitButton = document.querySelector("#submit")

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