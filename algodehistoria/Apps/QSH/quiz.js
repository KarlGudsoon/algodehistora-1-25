let preguntasQuiz = [];
let currentQuestionIndex = 0;
let respuestasUsuario = {};

// Cargar preguntas desde un JSON (simulado aquí)
fetch('preguntas.json')
  .then(response => response.json())
  .then(data => {
    preguntasQuiz = data.preguntas;
    iniciarQuiz();
  })
  .catch(error => console.error('Error al cargar las preguntas:', error));

// Función para iniciar el quiz
function iniciarQuiz() {
    preguntasQuiz = mezclarArray(preguntasQuiz); 
    mostrarPregunta(); 
}

// Función para mezclar el array de preguntas
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

// Función para mostrar la pregunta actual
// Función para mostrar la pregunta actual
function mostrarPregunta() {
    const preguntaActual = preguntasQuiz[currentQuestionIndex];
    const preguntaTexto = document.querySelector('#pregunta');
    const opcionesContenedor = document.querySelector('#opciones');
    
    preguntaTexto.textContent = preguntaActual.pregunta;

    opcionesContenedor.innerHTML = '';
    
    preguntaActual.opciones.forEach((opcion, index) => {
        const opcionElemento = document.createElement('div');
        opcionElemento.classList.add('opcion');
        opcionElemento.innerHTML = `
            <input type="radio" id="opcion${index}" name="respuesta" value="${opcion}">
            <label for="opcion${index}">${opcion}</label>
        `;
        opcionesContenedor.appendChild(opcionElemento);
    });

    // Añadir evento de click a cada input para cambiar el color del label
    const inputs = opcionesContenedor.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('click', function() {
            // Quitar la clase 'seleccionada' de todos los labels
            opcionesContenedor.querySelectorAll('label').forEach(label => {
                label.classList.remove('seleccionada');
            });
            
            // Añadir la clase 'seleccionada' al label asociado al input seleccionado
            const label = input.nextElementSibling;
            label.classList.add('seleccionada');
        });
    });
}
// Función para guardar la respuesta seleccionada por el usuario
function guardarRespuesta(pregunta, respuesta) {
    respuestasUsuario[pregunta] = respuesta;
}

// Función para corregir las respuestas
function corregirRespuestas() {
    const preguntaActual = preguntasQuiz[currentQuestionIndex];
    const opciones = document.querySelectorAll('.opcion input');

    opciones.forEach(opcion => {
        const label = opcion.nextElementSibling;
        
        // Remover la clase 'seleccionada' de todos los labels
        label.classList.remove('seleccionada');
        label.classList.remove('correcta', 'incorrecta'); // Limpiar estados previos

        // Asignar clase correcta o incorrecta según la respuesta
        if (opcion.value === preguntaActual.respuestaCorrecta) {
            label.classList.add('correcta');  // Marca la respuesta correcta en verde
        } else if (opcion.checked) {
            label.classList.add('incorrecta');  // Marca la respuesta incorrecta en rojo
        }
    });
}

// Función para eliminar dos alternativas incorrectas
function eliminarDosIncorrectas() {
    const preguntaActual = preguntasQuiz[currentQuestionIndex];
    const opciones = Array.from(document.querySelectorAll('.opcion input'));
    
    const incorrectas = opciones.filter(opcion => opcion.value !== preguntaActual.respuestaCorrecta);

    // Elimina dos opciones incorrectas
    let eliminadas = 0;
    incorrectas.forEach(opcion => {
        if (eliminadas < 2) {
            const opcionDiv = opcion.parentElement;
            opcionDiv.style.display = 'none';
            eliminadas++;
        }
    });
}

// Función para reiniciar la corrección
function reiniciarCorreccion() {
    const labels = document.querySelectorAll('#opciones label');
    labels.forEach(label => {
        label.classList.remove('correcta', 'incorrecta');
    });
    mostrarPregunta(); // Refrescar la pregunta actual
}

// Función para mostrar un modal con un contador de 20 segundos


function mostrarContadorEnBoton(boton) {
    let tiempo = 20; // 20 segundos de inicio
    const textoOriginal = boton.textContent; // Guardar el texto original del botón
    boton.textContent = tiempo; // Mostrar el tiempo en el botón

    const intervalo = setInterval(() => {
        tiempo--;
        boton.textContent = tiempo; // Actualizar el texto en el botón con el tiempo restante

        if (tiempo <= 0) {
            clearInterval(intervalo); // Detener el intervalo
            boton.textContent = textoOriginal; // Restaurar el texto original del botón
        }
    }, 1000); // Cada 1 segundo
}

// Función para mostrar una pregunta aleatoria
function mostrarPreguntaAleatoria() {
    currentQuestionIndex = Math.floor(Math.random() * preguntasQuiz.length);
    mostrarPregunta();
}

// Función para avanzar a la siguiente pregunta
function siguientePregunta() {
    currentQuestionIndex++;
    if (currentQuestionIndex < preguntasQuiz.length) {
        mostrarPregunta();
        reiniciarCorreccion();
    } else {
        alert('¡Has terminado el quiz!');
    }
}
