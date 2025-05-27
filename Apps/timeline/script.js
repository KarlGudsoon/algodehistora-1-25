document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".inner");

  carousels.forEach((carousel) => {
    let isDragging = false;
    let startX, startScrollLeft;
    let initialTouchX, initialTouchY;

    // Función para iniciar el arrastre
    const dragStart = (e) => {
      if (e.type === "touchstart") {
        initialTouchX = e.touches[0].clientX;
        initialTouchY = e.touches[0].clientY;
      }
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = carousel.scrollLeft;
      carousel.style.cursor = "grabbing";
      carousel.style.userSelect = "none";
    };

    // Función para arrastrar (con detección de dirección)
    const dragging = (e) => {
      if (!isDragging) return;

      // Solo en touch: verificar si el movimiento es horizontal
      if (e.type === "touchmove") {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = Math.abs(touchX - initialTouchX);
        const deltaY = Math.abs(touchY - initialTouchY);

        // Si el movimiento es más vertical, cancelar el drag
        if (deltaY > deltaX) {
          isDragging = false;
          return;
        }
      }

      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      carousel.scrollLeft = startScrollLeft - (x - startX) * 1;
    };

    // Función para detener el arrastre
    const dragStop = () => {
      isDragging = false;
      carousel.style.cursor = "grab";
      carousel.style.removeProperty("user-select");
    };

    // Eventos de ratón (desktop)
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    // Eventos táctiles (móvil)
    carousel.addEventListener("touchstart", dragStart, { passive: false });
    carousel.addEventListener("touchmove", dragging, { passive: false });
    document.addEventListener("touchend", dragStop);
  });
});

/// LINEA DE TIEMPO UNIVERSAL

const lineaTiempoAC = document.getElementById('linea-tiempo-universal-ac');
const lineaTiempoDC = document.getElementById('linea-tiempo-universal-dc');
const contenedorAC = lineaTiempoAC.querySelector('.años');
const contenedorDC = lineaTiempoDC.querySelector('.años');

for (let año = 5000; año >= 100; año -= 100) {
 
  const span = document.createElement('span');
  
  span.textContent = "-" + año;
  span.id = "-" + año;
  span.setAttribute('data-fecha', año);
  
  contenedorAC.appendChild(span);
}

for (let año = 0; año <= 2020; año += 10) {
 
  const span = document.createElement('span');
  
  span.textContent = año;
  span.id = año;
  span.setAttribute('data-fecha', año);
  
  contenedorDC.appendChild(span);
}

const contenedoresSiglosDC = lineaTiempoDC.querySelectorAll('.contenedor-siglo');
const contenedoresSiglosAC = lineaTiempoAC.querySelectorAll('.contenedor-siglo');

// Función para convertir a números romanos
function convertirARomano(num) {
  const romanos = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
  ];

  let resultado = "";
  for (const [letra, valor] of romanos) {
    while (num >= valor) {
      resultado += letra;
      num -= valor;
    }
  }
  return resultado;
}

for (let año = 5000; año >= 1000; año -= 1000) {
  let numeroSiglo = Math.floor(año / 1000);
  let romano = convertirARomano(numeroSiglo);

  // Crear el contenedor del siglo
  const siglo = document.createElement('div');
  siglo.classList.add("siglo");
  siglo.setAttribute('data-siglo', romano);

  // Crear sub-secciones
  const top = document.createElement('div');
  const mid = document.createElement('div');
  const bottom = document.createElement('div');

  top.classList.add("seccion-top");
  mid.classList.add("seccion-mid");
  bottom.classList.add("seccion-bottom");

  // Insertar sub-secciones en el siglo
  siglo.appendChild(top);
  siglo.appendChild(mid);
  siglo.appendChild(bottom);

  // Clonar e insertar el siglo en todos los contenedores
  contenedoresSiglosAC.forEach(contenedor => {
    contenedor.appendChild(siglo.cloneNode(true));
  });
}

for (let año = 0; año <= 1990; año += 100) {
  let numeroSiglo = Math.floor(año / 100) + 1;
  let romano = convertirARomano(numeroSiglo);

  // Crear el contenedor del siglo
  const siglo = document.createElement('div');
  siglo.classList.add("siglo");
  siglo.setAttribute('data-siglo', romano);

  // Crear sub-secciones
  const top = document.createElement('div');
  const mid = document.createElement('div');
  const bottom = document.createElement('div');

  top.classList.add("seccion-top");
  mid.classList.add("seccion-mid");
  bottom.classList.add("seccion-bottom");

  // Insertar sub-secciones en el siglo
  siglo.appendChild(top);
  siglo.appendChild(mid);
  siglo.appendChild(bottom);

  // Clonar e insertar el siglo en todos los contenedores
  contenedoresSiglosDC.forEach(contenedor => {
    contenedor.appendChild(siglo.cloneNode(true));
  });
}


// BOTONES PARA REDIRIGIR A UN AÑO ESPECIFICO

document.querySelectorAll('.boton-linea-tiempo').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita el scroll de la página al href="#..."

    const targetId = this.getAttribute('href').substring(1); // Quita el '#' del href
    const targetElement = document.getElementById(targetId);
    const carrusel = document.querySelector('.inner-linea-tiempo-universal');

    if (targetElement && carrusel) {
      // Solo desplazamiento horizontal dentro del carrusel
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',   // No cambia scroll vertical
        inline: 'center'     // Alinea el elemento al borde izquierdo del carrusel
      });

      // Resaltar año activo
      document.querySelectorAll('.año').forEach(a => a.classList.remove('active'));
      targetElement.classList.add('active');
    }
  });
});

// SCROLL CONTROLLER 

const carrusel = document.querySelector('.inner-linea-tiempo-universal');
const scrollSlider = document.querySelector('.scroll-slider');

// 1. Actualizar slider cuando se mueve el carrusel
carrusel.addEventListener('scroll', () => {
  const scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
  const scrollPosition = carrusel.scrollLeft;
  
  // Calcular porcentaje (0-100)
  const percentage = (scrollPosition / scrollWidth) * 100;
  
  // Actualizar valor del slider
  scrollSlider.value = percentage;
});

// 2. Mover carrusel cuando se arrastra el slider
scrollSlider.addEventListener('input', () => {
  const scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
  const scrollTo = (scrollSlider.value / 100) * scrollWidth;
  
  // Desplazamiento suave (compatible con todos navegadores)
  carrusel.scrollTo({
    left: scrollTo,
    behavior: 'auto' // Cambia a 'smooth' para efecto suave
  });
});

// 3. Calcular el max del slider cuando cambia el tamaño
function updateSliderMax() {
  const scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
  scrollSlider.max = scrollWidth > 0 ? 100 : 0;
}

// Inicializar y actualizar en resize
updateSliderMax();
window.addEventListener('resize', updateSliderMax);


/// SCROLL BUSCADOR

const yearInput = document.getElementById('year-input');
const adjustedYearDisplay = document.getElementById('adjusted-year');

function adjustToDecade(year) {
  return Math.floor(year / 10) * 10;
}

function formatDecadeText(year) {
  const adjusted = adjustToDecade(year);
  return adjusted < 0 ? `Década: ${Math.abs(adjusted)} a.C.` : `Década: ${adjusted}s`;
}

function scrollToAdjustedYear(year) {
  const adjustedYear = adjustToDecade(year);
  const targetElement = document.getElementById(`${adjustedYear}`);

  if (targetElement) {
    adjustedYearDisplay.textContent = `Mostrando ${formatDecadeText(year)}`;

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    document.querySelectorAll('.año').forEach(a => a.classList.remove('active'));
    targetElement.classList.add('active');
  }
}

function validateAndFormatInput(value) {
  value = value.replace(/[^0-9-]/g, '');

  if ((value.match(/-/g) || []).length > 1) {
    value = '-' + value.replace(/-/g, '');
  }
  if (value.includes('-') && value.indexOf('-') !== 0) {
    value = value.replace(/-/g, '');
  }

  if (value.length > 5) {
    value = value.slice(0, 5);
  }

  return value;
}

function updateYearInputAndScroll(newYear) {
  yearInput.value = newYear;
  adjustedYearDisplay.textContent = formatDecadeText(newYear);
  scrollToAdjustedYear(newYear);
}

yearInput.addEventListener('input', () => {
  let value = yearInput.value;
  value = validateAndFormatInput(value);
  yearInput.value = value;

  if (value.length >= 1 && value !== '-') {
    const numValue = parseInt(value) || 0;
    adjustedYearDisplay.textContent = formatDecadeText(numValue);
    if (!isNaN(numValue)) scrollToAdjustedYear(numValue);
  } else {
    adjustedYearDisplay.textContent = '';
  }
});

// Botones
document.getElementById('prev-year').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear - 1);
});

document.getElementById('next-year').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear + 1);
});

document.getElementById('prev-decade').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear - 10);
});

document.getElementById('next-decade').addEventListener('click', () => {
  const currentYear = parseInt(yearInput.value) || 0;
  updateYearInputAndScroll(currentYear + 10);
});


/// CREADOR DE HECHOS HISTORICOS

fetch('/Apps/timeline/hitos.json')
  .then(response => response.json())
  .then(data => {
    crearHechosHistoricos(data);
  })
  .catch(error => {
    console.error('Error al cargar los hechos históricos:', error);
  });

function crearHechosHistoricos(datos) {
  datos.forEach(item => {
    const span = document.createElement('span');
    const link = document.createElement('a');
    
    link.href = item.url || '#';
    link.target = '_blank';
    link.textContent = "Ver más";
    
    
    span.classList.add('hecho-historico');
    
    span.style.left = `${item.año}`;

    span.textContent = item.nombre;
    span.setAttribute('data-fecha', item.fecha);

    span.appendChild(link);

    const Era = document.getElementById(`${item.era}`);

    const contenedorSiglo = Era.querySelector(`.${item.contenedor}`);
    if (!contenedorSiglo) return;

    // Busca el siglo adecuado
    const siglo = contenedorSiglo.querySelector(`.siglo[data-siglo="${item.siglo}"]`);
    if (!siglo) return;

    // Busca la sección dentro del siglo
    const seccion = siglo.querySelector(`.seccion-${item.posicion}`);
    if (!seccion) return;

    seccion.appendChild(span);
  });
}

/// PERÍODOS HISTÓRICOS EN LINEA DE TIEMPO

fetch('/Apps/timeline/periodos.json')
  .then(res => res.json())
  .then(periodos => {
    periodos.forEach(crearPasoPeriodo);
  })
  .catch(err => console.error("Error cargando periodos:", err));

function crearPasoPeriodo({ era, tipo, ancho, color, inicio, siglo, periodo, imagen, posicion }) {
  const Era = document.getElementById(era);
  const contenedorSiglo = Era.querySelector(`.siglo[data-siglo="${siglo}"]`);
  if (!contenedorSiglo) return console.warn(`No se encontró el siglo: ${siglo}`);

  const pasoPeriodo = document.createElement('div');
  const textoPeriodo = document.createElement('span');

  textoPeriodo.textContent = periodo;

  pasoPeriodo.classList.add(tipo);
  pasoPeriodo.style.setProperty('--background-image-periodo', `url('${imagen}')`);
  pasoPeriodo.style.left = posicion;
  pasoPeriodo.style.width = ancho;
  pasoPeriodo.style.setProperty('--coloretapa', `${color}`)
  pasoPeriodo.setAttribute('data-inicio', inicio);

  pasoPeriodo.setAttribute('data-periodo', periodo);
  pasoPeriodo.appendChild(textoPeriodo);
  contenedorSiglo.appendChild(pasoPeriodo);
}



