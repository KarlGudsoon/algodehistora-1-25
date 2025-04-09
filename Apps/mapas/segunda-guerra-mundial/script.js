var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("zoom");

// Límites de escala
const MIN_SCALE = 1;
const MAX_SCALE = 6;

// Estado adicional para rastrear si se está realizando un gesto de pellizco
let isPinching = false;

// Función para ajustar la escala dentro de los límites
function clampScale(value) {
    return Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
}

// Función para aplicar la transformación
function setTransform() {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

// Eventos de mouse
zoom.onmousedown = function (e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
};

zoom.onmouseup = function () {
    panning = false;
};

zoom.onmousemove = function (e) {
    e.preventDefault();
    if (!panning) return;
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
};

zoom.onwheel = function (e) {
    e.preventDefault();
    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

    scale *= delta > 0 ? 1.2 : 1 / 1.2;
    scale = clampScale(scale);

    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    setTransform();
};

// Eventos táctiles
zoom.addEventListener("touchstart", function (e) {
    if (e.touches.length === 1) {
        // Un solo dedo para panning
        e.preventDefault();
        start = { x: e.touches[0].clientX - pointX, y: e.touches[0].clientY - pointY };
        panning = true;
        isPinching = false; // No es un gesto de pellizco
    } else if (e.touches.length === 2) {
        // Dos dedos para zoom
        e.preventDefault();
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];

        // Centro del gesto de pellizco
        start.centerX = (touch1.clientX + touch2.clientX) / 2;
        start.centerY = (touch1.clientY + touch2.clientY) / 2;
        
        // Distancia inicial entre los dedos
        start.touchDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        start.touchScale = scale;
        isPinching = true; // Es un gesto de pellizco
    }
});

zoom.addEventListener("touchmove", function (e) {
    if (e.touches.length === 1 && panning && !isPinching) {
        // Un solo dedo para panning y no estamos en un gesto de pellizco
        e.preventDefault();
        pointX = e.touches[0].clientX - start.x;
        pointY = e.touches[0].clientY - start.y;
        setTransform();
    } else if (e.touches.length === 2 && isPinching) {
        // Dos dedos para zoom
        e.preventDefault();
        let touch1 = e.touches[0];
        let touch2 = e.touches[1];

        // Nuevo centro del pellizco
        let newCenterX = (touch1.clientX + touch2.clientX) / 2;
        let newCenterY = (touch1.clientY + touch2.clientY) / 2;

        // Nueva distancia entre los dedos
        let newDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        let newScale = start.touchScale * (newDist / start.touchDist);
        newScale = clampScale(newScale);

        // Ajustar `pointX` y `pointY` para que el zoom ocurra desde el centro del pellizco
        let scaleRatio = newScale / scale;
        pointX = newCenterX - (newCenterX - pointX) * scaleRatio;
        pointY = newCenterY - (newCenterY - pointY) * scaleRatio;

        scale = newScale;
        setTransform();
    }
});

zoom.addEventListener("touchend", function (e) {
    if (e.touches.length === 0) {
        // Cuando ambos dedos se han soltado, reiniciar el estado
        panning = false;
        isPinching = false;
        setTransform();
    } else if (e.touches.length === 1 && isPinching) {
        // Si queda un dedo después de un gesto de pellizco, evitar el desplazamiento
        panning = false;
        isPinching = false;
    }
});

document.getElementById("resetZoom").addEventListener("click", function() {
  scale = 1;
  pointX = 0;
  pointY = 0;
  setTransform();
});

let tripleEjeActivo = false;
let pactoActivo = false;

function reiniciarcolor() {
  var mapa = document.getElementById("world-map");
  var elementoMapa = mapa.querySelectorAll(".cls-1");

  elementoMapa.forEach(function(elemento) {
    elemento.style.fill = "";
  });
}

/*
document.getElementById("TripleEje").addEventListener("click", function () {
  if (tripleEjeActivo) {
    reiniciarcolor();
    tripleEjeActivo = false;
  } else {
    reiniciarcolor();

    // Seleccionamos todos los elementos por clase común
    var Alemania = document.querySelectorAll(".alemania");
    var Italia = document.querySelectorAll(".italia");
    var Japon = document.querySelectorAll(".japon");


    // Aplicamos color a cada conjunto
    [...Alemania, ...Italia, ...Japon].forEach(function (grupo) {
      var paths = grupo.querySelectorAll(".cls-1");
      paths.forEach(function (elemento) {
        elemento.style.fill = "#e92a41";
      });
    });

    tripleEjeActivo = true;
    pactoActivo = false; // Desactivamos el otro bloque si estaba activo
  }
});

document.getElementById("Pacto").addEventListener("click", function() {
  if (pactoActivo) {
    reiniciarcolor();
    pactoActivo = false;
  } else {
    reiniciarcolor();

    var Alemania = document.querySelectorAll(".Pacto");
    var Urss = document.querySelectorAll(".Pacto");

    [...Alemania, ...Urss].forEach(function (grupo) {
      var paths = grupo.querySelectorAll(".cls-1");
      paths.forEach(function (elemento) {
        elemento.style.fill = "#a82737";
      });
    });
      

    pactoActivo = true;
    tripleEjeActivo = false; // desactivamos el otro bloque si estaba activo
  }
});
*/

const añosDisponibles = [1937, 1939, 1940];
const input = document.getElementById("input-año");
const btnAvanzar = document.getElementById("avanzar");
const btnRetroceder = document.getElementById("retroceder");

function actualizarVista(añoActual) {
  añosDisponibles.forEach(function(año) {
    const bloque = document.getElementById(`_${año}`);
    if (año <= añoActual) {
      bloque.classList.add("activo");
    } else {
      bloque.classList.remove("activo");
    }
  });
}

input.addEventListener("input", function() {
  let año = parseInt(input.value);
  if (añosDisponibles.includes(año)) {
    actualizarVista(año);
    actualizarVista1939();
    pintarTripleEje();
    pintarTripleEje();
    pintarAliados();
  }
});

// Avanzar al siguiente año
btnAvanzar.addEventListener("click", function() {
  let añoActual = parseInt(input.value);
  let index = añosDisponibles.indexOf(añoActual);
  if (index < añosDisponibles.length - 1) {
    input.value = añosDisponibles[index + 1];
    actualizarVista(añosDisponibles[index + 1]);
    actualizarVista1939();
    pintarTripleEje();
    pintarTripleEje();
    pintarAliados();
  }
});

// Retroceder al año anterior
btnRetroceder.addEventListener("click", function() {
  let añoActual = parseInt(input.value);
  let index = añosDisponibles.indexOf(añoActual);
  if (index > 0) {
    input.value = añosDisponibles[index - 1];
    actualizarVista(añosDisponibles[index - 1]);
    actualizarVista1939();
    pintarTripleEje();
    pintarTripleEje();
    pintarAliados();
  }
});

function actualizarVista1939() {
  const Francia1939 = document.getElementById("FRANCIA1937");
  const UK1939 = document.getElementById("REINOUNIDO1937");

  if (input.value == 1939 || input.value == 1940) {
    Francia1939.classList.add("aliado");
    UK1939.classList.add("aliado");
  } else {
    Francia1939.classList.remove("aliado");
    UK1939.classList.remove("aliado");
    Francia1939.querySelectorAll(".cls-1").forEach(function(elemento) {
      elemento.style.fill = "";
    }
    );
    UK1939.querySelectorAll(".cls-1").forEach(function(elemento) {
      elemento.style.fill = "";
    });
  }
}

function actualizarVista1940() {
  const Francia1939 = document.getElementById("FRANCIA1937");
  const UK1939 = document.getElementById("REINOUNIDO1937");

  if (input.value == 1940) {
    Francia1939.classList.add("aliado");
    UK1939.classList.add("aliado");
  } else {
    Francia1939.classList.remove("aliado");
    UK1939.classList.remove("aliado");
    Francia1939.querySelectorAll(".cls-1").forEach(function(elemento) {
      elemento.style.fill = "";
    }
    );
    UK1939.querySelectorAll(".cls-1").forEach(function(elemento) {
      elemento.style.fill = "";
    });
  }
}

actualizarVista(1937);

const checkboxTripleEje = document.getElementById("triple-eje");

function pintarTripleEje() {
  var paisesEje = document.querySelectorAll(".triple-eje");

  paisesEje.forEach(function(paisEje) {
    var subpaises = paisEje.querySelectorAll(".cls-1");

    subpaises.forEach(function(pais) {
      pais.style.fill = checkboxTripleEje.checked ? "#e92a41" : "";
    });
  });
}

checkboxTripleEje.addEventListener("change", pintarTripleEje);

pintarTripleEje();

const checkboxPacto = document.getElementById("pacto");

function pintarPacto() {
  var paisesPacto = document.querySelectorAll(".Pacto");

  paisesPacto.forEach(function(paisPacto) {
    var subpaises = paisPacto.querySelectorAll(".cls-1");

    subpaises.forEach(function(pais) {
      pais.style.fill = checkboxPacto.checked ? "#a82737" : "";
    });
  });
}

checkboxPacto.addEventListener("change", pintarPacto);

pintarPacto();

checkboxTripleEje.addEventListener("change", pintarTripleEje);

pintarTripleEje();

const checkboxAliados = document.getElementById("aliados");

function pintarAliados() {
  var paisesAliados = document.querySelectorAll(".aliado");

  paisesAliados.forEach(function(paisAliado) {
    var subpaises = paisAliado.querySelectorAll(".cls-1");

    subpaises.forEach(function(pais) {
      pais.style.fill = checkboxAliados.checked ? "#175ac0" : "";
    });
  });
}

checkboxAliados.addEventListener("change", pintarAliados);

pintarAliados();