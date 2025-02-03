


const toggleButtons = document.querySelectorAll('.toggleButton'); // Todos los botones

toggleButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const containerId = this.getAttribute('data-container'); // Leer el ID del contenedor asociado
        const container = document.getElementById(containerId); // Encontrar el contenedor

        // Si este botón y contenedor ya están activos, desactivarlos
        if (this.classList.contains('active') && container.classList.contains('active')) {
            
        } else {
            // Desactivar todo antes de activar el nuevo
            deactivateAll();

            // Activar el botón y contenedor
            activate(container, this);
        }
    });
});

// Función para activar un contenedor y su botón
function activate(container, button) {
    container.classList.add('active');
    button.classList.add('active');

    // Animar las tarjetas escalonadamente
    const cards = container.querySelectorAll('.card-contenido');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('active');
        }, index * 100);
    });
}

// Función para desactivar un contenedor y su botón
function deactivate(container, button) {
    container.classList.remove('active');
    button.classList.remove('active');

    const cards = container.querySelectorAll('.card-contenido');
    cards.forEach((card) => {
        card.classList.remove('active');
    });
}

// Función para desactivar todos los contenedores y botones
function deactivateAll() {
    toggleButtons.forEach((btn) => btn.classList.remove('active'));

    const allContainers = document.querySelectorAll('.contenedor-cartas');
    allContainers.forEach((container) => {
        container.classList.remove('active');

        const cards = container.querySelectorAll('.card-contenido');
        cards.forEach((card) => card.classList.remove('active'));
    });
}

const carousel = document.getElementById("carousel");
        const indicatorsContainer = document.getElementById("indicators");
        const images = document.querySelectorAll(".carousel div");
        let index = 0;
        let interval;

        function createIndicators() {
            images.forEach((img, i) => {
                let indicator = document.createElement("img");
                indicator.src = img.querySelector("img").src;
                indicator.classList.add("indicator");
                indicator.dataset.index = i;
                indicator.addEventListener("click", () => {
                    index = i;
                    updateCarousel();
                    resetInterval();
                });
                indicatorsContainer.appendChild(indicator);
            });
            updateIndicators();
        }

        function updateCarousel() {
            carousel.style.transform = `translateX(-${index * 100}%)`;
            updateIndicators();
        }

        function updateIndicators() {
            document.querySelectorAll(".indicator").forEach((ind, i) => {
                ind.classList.toggle("active", i === index);
            });
        }

        function autoSlide() {
            interval = setInterval(() => {
                index = (index + 1) % images.length;
                updateCarousel();
            }, 10000);
        }

        function resetInterval() {
            clearInterval(interval);
            autoSlide();
        }

        createIndicators();
        autoSlide();