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
const MAX_SCALE = 6; // Escala máxima

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
    if (e.touches.length === 1) {
        // Un solo dedo para panning
        e.preventDefault();
        start = { x: e.touches[0].clientX - pointX, y: e.touches[0].clientY - pointY };
        panning = true;
    } else if (e.touches.length === 2) {
        // Dos dedos para zoom
        e.preventDefault();
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];
        var dist = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        start.touchDist = dist;
        start.touchScale = scale;

        // Calcular el punto central entre los dos dedos
        start.touchCenter = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
        };
    }
});

zoom.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1 && panning) {
        // Un solo dedo para panning
        e.preventDefault();
        pointX = (e.touches[0].clientX - start.x);
        pointY = (e.touches[0].clientY - start.y);
        setTransform();
    } else if (e.touches.length === 2) {
        // Dos dedos para zoom
        e.preventDefault();
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];
        var dist = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );

        // Calcular el nuevo punto central entre los dos dedos
        var newTouchCenter = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
        };

        // Calcular la nueva escala
        var newScale = start.touchScale * (dist / start.touchDist);
        scale = clampScale(newScale); // Aplicar límites de escala

        // Ajustar el punto de origen del zoom
        pointX = newTouchCenter.x - (start.touchCenter.x - pointX) * (scale / start.touchScale);
        pointY = newTouchCenter.y - (start.touchCenter.y - pointY) * (scale / start.touchScale);

        setTransform();
    }
});

zoom.addEventListener('touchend', function (e) {
    if (e.touches.length === 0) {
        panning = false;
    }
});


