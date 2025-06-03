


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

// CARGAR CARTAS DE ARTICULOS DESDE JSON

fetch('index.json')
  .then(res => res.json())
  .then(articulos => {
    articulos.forEach(crearArticulos);
    VanillaTilt.init(document.querySelectorAll(".card-contenido"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.1
    });
  })
  .catch(err => console.error("Error cargando periodos:", err));

function crearArticulos({ periodo, url, titulo, fondo, personaje, fecha }) {
  const container = document.getElementById(periodo);
  if (!container) return; // Evita errores si el ID no existe

  const Articulo = document.createElement('a');
  const InnerArticulo = document.createElement('div');
  InnerArticulo.classList.add('card-contenido', 'active');
  InnerArticulo.setAttribute('data-tilt', '');

  const PersonajeImagen = document.createElement('img');
  PersonajeImagen.classList.add('personaje-img');

  const ContenidoImagen = document.createElement('div');
  ContenidoImagen.classList.add('card-contenido-img');
  const imgContenidoImagen = document.createElement('img');

  const ContenidoEtiqueta = document.createElement('div');
  ContenidoEtiqueta.classList.add('card-contenido-etiqueta');
  const ContenidoTitulo = document.createElement('h1');
  const ArticuloFecha = document.createElement('span');

  // Asignar contenido si existe
  if (titulo) ContenidoTitulo.textContent = titulo;
  if (fecha) ArticuloFecha.textContent = fecha;
  if (url) Articulo.href = url;

  if (fondo) {
    imgContenidoImagen.src = fondo;
  } else {
    imgContenidoImagen.style.display = "none";
  }

  if (personaje) {
    PersonajeImagen.src = personaje;
  } else {
    PersonajeImagen.style.display = "none";
  }

  // Construcción del DOM
  container.appendChild(Articulo);
  Articulo.appendChild(InnerArticulo);
  InnerArticulo.appendChild(PersonajeImagen);
  InnerArticulo.appendChild(ContenidoImagen);
  ContenidoImagen.appendChild(imgContenidoImagen);
  InnerArticulo.appendChild(ContenidoEtiqueta);
  ContenidoEtiqueta.appendChild(ContenidoTitulo);
  ContenidoEtiqueta.appendChild(ArticuloFecha);
}

const containerPrincipal = document.getElementById("cardContainer1");
containerPrincipal.classList.add("active");

const cards = containerPrincipal.querySelectorAll('.card-contenido');
cards.forEach(card => card.classList.add("active"));
