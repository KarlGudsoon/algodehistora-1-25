let correctas = [3, 4, 3, 2, 3];
let opcion_elegida = [];
let cantidad_correctas = 0;

function respuesta(num_pregunta, seleccionada) {
    opcion_elegida[num_pregunta] = seleccionada.value;

    let id = "p" + num_pregunta;
    let labels = document.getElementById(id).childNodes;

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
    }
});

// Evento para el botón "Anterior"
prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

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
                span.style.backgroundColor = 'green';
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
        submitButton.style.opacity = '1'; // opcional para hacer que el botón se vea habilitado
    } else {
        submitButton.style.pointerEvents = 'none';
        submitButton.style.opacity = '0.5'; // opcional para hacer que el botón se vea deshabilitado
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
        });
    }
});

