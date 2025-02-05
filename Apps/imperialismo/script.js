// Función para ocultar todos los imperios
function ocultarTodosLosImperios() {
  const imperios = document.querySelectorAll("#imperio-britanico, #imperio-frances, #imperio-neerlandes, #imperio-aleman");
  imperios.forEach(imperio => {
    imperio.style.display = "none";
  });
}

// Mostrar el Imperio Británico y ocultar los demás
document.getElementById("i-1").addEventListener("click", function() {
  ocultarTodosLosImperios();  // Ocultamos todos los imperios
  document.getElementById("imperio-britanico").style.display = "block";  // Mostramos el imperio británico
});

// Mostrar el Imperio Francés y ocultar los demás
document.getElementById("i-2").addEventListener("click", function() {
  ocultarTodosLosImperios();  // Ocultamos todos los imperios
  document.getElementById("imperio-frances").style.display = "block";  // Mostramos el imperio francés
});

// Mostrar el Imperio Neerlandés y ocultar los demás
document.getElementById("i-3").addEventListener("click", function() {
  ocultarTodosLosImperios();  // Ocultamos todos los imperios
  document.getElementById("imperio-neerlandes").style.display = "block";  // Mostramos el imperio neerlandés
});

// Mostrar el Imperio Alemán y ocultar los demás
document.getElementById("i-4").addEventListener("click", function() {
  ocultarTodosLosImperios();  // Ocultamos todos los imperios
  document.getElementById("imperio-aleman").style.display = "block";  // Mostramos el imperio alemán
});

document.getElementById("i-all").addEventListener("click", function() {
  // Seleccionamos todos los imperios
  const imperios = document.querySelectorAll("#imperio-britanico, #imperio-frances, #imperio-neerlandes, #imperio-aleman");
  
  // Mostramos todos los imperios
  imperios.forEach(imperio => {
    imperio.style.display = "block";
  });
});


document.getElementById("resetZoom").addEventListener("click", function() {
  scale = 1;
  pointX = 0;
  pointY = 0;
  setTransform();
});


var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("zoom");

// Límites de escala
const MIN_SCALE = 1; // Escala mínima
const MAX_SCALE = 6;   // Escala máxima

// Función para ajustar la escala dentro de los límites
function clampScale(value) {
    return Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
}

// Función para aplicar la transformación
function setTransform() {
    zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

// Eventos de mouse
zoom.onmousedown = function (e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
}

zoom.onmouseup = function (e) {
    panning = false;
}

zoom.onmousemove = function (e) {
    e.preventDefault();
    if (!panning) {
        return;
    }
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    setTransform();
}

zoom.onwheel = function (e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
    scale = clampScale(scale); // Aplicar límites de escala
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    setTransform();
}

// Eventos táctiles
zoom.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) { // Solo un dedo
        e.preventDefault();
        start = { x: e.touches[0].clientX - pointX, y: e.touches[0].clientY - pointY };
        panning = true;
    } else if (e.touches.length === 2) { // Dos dedos (zoom)
        e.preventDefault();
        initialDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
    }
});

zoom.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1 && panning) { // Solo un dedo y panning activo
        e.preventDefault();
        pointX = (e.touches[0].clientX - start.x);
        pointY = (e.touches[0].clientY - start.y);
        setTransform();
    } else if (e.touches.length === 2 && initialDistance !== null) { // Dos dedos y zoom
        e.preventDefault();
        var currentDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );

        // Reducir la velocidad del zoom
        var zoomFactor = 1 + (currentDistance - initialDistance) / 1000; // Ajusta el divisor para controlar la velocidad
        var newScale = scale * zoomFactor;
        scale = clampScale(newScale); // Aplicar límites de escala

        // Ajustar el punto de transformación para que el zoom se centre entre los dos dedos
        var midpointX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        var midpointY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

        pointX = midpointX - (midpointX - pointX) * (scale / (scale / zoomFactor));
        pointY = midpointY - (midpointY - pointY) * (scale / (scale / zoomFactor));

        setTransform();
    }
});

zoom.addEventListener('touchend', function (e) {
    if (e.touches.length < 1) { // Levantar todos los dedos
        panning = false;
    }
    if (e.touches.length < 2) { // Menos de dos dedos
        initialDistance = null;
    }
});
      

