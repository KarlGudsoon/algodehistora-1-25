const toggleButtons = document.querySelectorAll('.toggleButton'); // Todos los botones

toggleButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const containerId = this.getAttribute('data-container'); // Leer el ID del contenedor asociado
        const container = document.getElementById(containerId); // Encontrar el contenedor

        // Si este botón y contenedor ya están activos, desactivarlos
        if (this.classList.contains('active') && container.classList.contains('active')) {
            deactivate(container, this);
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

    const allContainers = document.querySelectorAll('.contenedor-articulos');
    allContainers.forEach((container) => {
        container.classList.remove('active');

        const cards = container.querySelectorAll('.card-contenido');
        cards.forEach((card) => card.classList.remove('active'));
    });
}
