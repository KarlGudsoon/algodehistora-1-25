const toggleButtons = document.querySelectorAll('.lengueta-vertical'); 

toggleButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const containerId = this.getAttribute('data-container');
        const container = document.getElementById(containerId); 

        if (this.classList.contains('active') && container.classList.contains('active')) {
            
        } else {
        
            deactivateAll();

            activate(container, this);
        }
    });
});

function activate(container, button) {
    container.classList.add('active');
    button.classList.add('active');
}

// Función para desactivar un contenedor y su botón
function deactivate(container, button) {
    container.classList.remove('active');
    button.classList.remove('active');
}

// Función para desactivar todos los contenedores y botones
function deactivateAll() {
    toggleButtons.forEach((btn) => btn.classList.remove('active'));

    const allContainers = document.querySelectorAll('.geo-pueblos');
    allContainers.forEach((container) => {
        container.classList.remove('active');
    });
}

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
            carta.style.transition = "transform 0.2s ease";
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

