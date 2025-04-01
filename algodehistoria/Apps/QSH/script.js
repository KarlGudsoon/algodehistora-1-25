const questions = document.querySelectorAll('.question');
    const anteriorBtn = document.getElementById('anterior');
    const siguienteBtn = document.getElementById('siguiente');
    const corregirBtn = document.getElementById('corregir');
    const eliminarIncorrectaBtn = document.getElementById('eliminarIncorrecta');
    const mostrarModalBtn = document.getElementById('mostrarModal');
    const pasarPreguntaBtn = document.getElementById('pasarPregunta');
    const modal = document.getElementById('modal');
    const contadorElem = document.getElementById('contador');
    let currentQuestion = 0;
    let timer;

    // Mostrar la pregunta actual
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });

        anteriorBtn.disabled = index === 0;
        siguienteBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
    }

    siguienteBtn.addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    anteriorBtn.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    corregirBtn.addEventListener('click', function() {
        questions.forEach(function(question) {
            const correctAnswerIndex = question.getAttribute('data-correct');
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            const options = question.querySelectorAll('.option');

            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
            });

            if (selectedOption) {
                const selectedIndex = selectedOption.value;
                if (selectedIndex === correctAnswerIndex) {
                    options[selectedIndex].classList.add('correct');
                } else {
                    options[selectedIndex].classList.add('incorrect');
                    options[correctAnswerIndex].classList.add('correct');
                }
            }
        });
    });

    // Botón para eliminar una opción incorrecta
    eliminarIncorrectaBtn.addEventListener('click', function() {
    const currentQuestionElem = questions[currentQuestion];
    const correctAnswerIndex = currentQuestionElem.getAttribute('data-correct');
    const options = currentQuestionElem.querySelectorAll('.option');
    
    // Elimina solo la primera incorrecta encontrada
    let incorrectaEliminada = false;
    
    options.forEach((option, index) => {
        if (!incorrectaEliminada && index != correctAnswerIndex && !option.classList.contains('eliminated')) {
            option.style.display = 'none'; // Ocultar la opción
            option.classList.add('eliminated');
            incorrectaEliminada = true; // Marcar que ya eliminamos una incorrecta
        }
    });
});

    // Botón para mostrar el modal con un contador de 30 segundos
    mostrarModalBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        let counter = 30;
        contadorElem.textContent = counter;

        timer = setInterval(function() {
            counter--;
            contadorElem.textContent = counter;

            if (counter <= 0) {
                clearInterval(timer);
                modal.style.display = 'none'; // Cerrar el modal cuando llegue a 0
            }
        }, 1000);
    });

    // Botón para pasar automáticamente a la siguiente pregunta
    pasarPreguntaBtn.addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    // Cerrar el modal cuando se hace clic en cualquier parte de la pantalla
    modal.addEventListener('click', function() {
        clearInterval(timer); // Detener el contador si se cierra antes
        modal.style.display = 'none';
    });

    const resetButton = document.querySelector('#reset');

// Función para reiniciar todo
resetButton.addEventListener('click', function() {
    // Reiniciar todas las preguntas
    questions.forEach((question) => {
        const options = question.querySelectorAll('.option');
        
        // Mostrar todas las opciones (quitar el 'display: none')
        options.forEach((option) => {
            option.style.display = ''; // Vuelve a su estado original
            option.classList.remove('eliminated', 'correct', 'incorrect'); // Quitar clases añadidas
        });

        // Desmarcar las opciones seleccionadas
        const inputs = question.querySelectorAll('input[type="radio"]');
        inputs.forEach((input) => {
            input.checked = false;
        });
    });

    // Reiniciar el contador del modal si se está usando
    clearTimeout(timer); // Si tienes un contador
    timerElement.textContent = "30"; // Reiniciar el texto del contador a 30 segundos

    // Resetear a la primera pregunta
    currentQuestion = 0;
    updateQuestion();
});

    showQuestion(currentQuestion);