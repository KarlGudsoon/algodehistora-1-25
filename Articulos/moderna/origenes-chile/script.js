var botonGeo = document.getElementById("lengueta-geo");
var botonPueblos = document.getElementById("lengueta-pueblos");
var titulo = document.getElementById("titulo-explicacion1");
var texto = document.getElementById("texto-explicacion1");
var img = document.getElementById("img-explicacion1");

botonGeo.addEventListener("click", function () {
    titulo.innerHTML = "GEOMORFOLOGÍA DE CHILE";
    texto.innerHTML = "El territorio de Chile se formó hace millones de años debido a procesos geológicos como el choque de placas tectónicas, que formaron la cordillera de los Andes, que junto a la corriente de Humboldt, mantiene el Desierto de Atacama.";
    img.src = "/img/moderna/descubrimiento-chile/00909c64-2d8e-464b-bcb6-e1013e2b5e7d (2).webp"
});

botonPueblos.addEventListener("click", function () {
    titulo.innerHTML = "PUEBLOS ORIGINARIOS";
    texto.innerHTML = "Antes de la llegada de los españoles y la dominación Inca, en el territorio actual de Chile habitaron diversos pueblos originarios. Como los límites actuales no existían en el siglo XVI, los pueblos tenían su territorio más allá de la frontera actual entre países.";
    img.src = "/img/moderna/descubrimiento-chile/selknam-ropa-cazar-removebg-preview.png"
});


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

