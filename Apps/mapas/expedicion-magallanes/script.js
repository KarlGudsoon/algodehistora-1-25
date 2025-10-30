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


function hecho1() {
    let hecho = document.getElementById("_0");
    let hechoSiguiente = document.getElementById("hecho-2");
    hechoSiguiente.classList.add("activo");

    

    zoom.style.animation = "none";

    setTimeout(()=> {
        hecho.classList.add("active");
        scale = 1;
        pointX = 600;
        pointY = -200;
        setTransform();

        zoom.style.transition = "transform 0.5s ease-in-out";
        zoom.style.pointerEvents = "none";
    }, 100)

    setTimeout(()=> {
        zoom.style.transition = "";
        zoom.style.pointerEvents = "auto";
    }, 500)

    var startTravel = document.getElementById("start-travel");

    startTravel.classList.remove("activo");
    this.style.animation = "none";

    

    

    let hecho1 = document.getElementById("_0");
    let hecho2 = document.getElementById("_1");
    let hecho3 = document.getElementById("_2");
    let hecho4 = document.getElementById("_3");
    let hecho5 = document.getElementById("_4");
    let hecho6 = document.getElementById("_5");
    let hecho7 = document.getElementById("_6");
    let hecho8 = document.getElementById("_7");

    hecho1.style.opacity = "0";
    hecho2.style.opacity = "0";
    hecho3.style.opacity = "0";
    hecho4.style.opacity = "0";
    hecho5.style.opacity = "0";
    hecho6.style.opacity = "0";
    hecho7.style.opacity = "0";
    hecho8.style.opacity = "0";

    hecho1.classList.remove("active");
    hecho2.classList.remove("active");
    hecho3.classList.remove("active");
    hecho4.classList.remove("active");
    hecho5.classList.remove("active");
    hecho6.classList.remove("active");
    hecho7.classList.remove("active");
    hecho8.classList.remove("active");
}

function hecho2() {
    let hecho = document.getElementById("_1");
    let hecho2 = document.getElementById("_2");
    let hechoSiguiente = document.getElementById("hecho-3");
    hechoSiguiente.classList.add("activo");
   
    setTimeout(()=> {
        hecho.classList.add("active");
    }, 500)

    setTimeout(()=> {
        hecho2.classList.add("active");
    }, 2000)

    scale = 1;
    pointX = -300;
    pointY = -200;
    setTransform();

    zoom.style.transition = "transform 0.5s ease-in-out";
    zoom.style.pointerEvents = "none";

    setTimeout(()=> {
        zoom.style.transition = "";
        zoom.style.pointerEvents = "auto";
    }, 500)
}

function hecho3() {
    let hecho = document.getElementById("_3");
    let hecho2 = document.getElementById("_4");
    let hecho3 = document.getElementById("_5");
    let hechoSiguiente = document.getElementById("hecho-4");
    hechoSiguiente.classList.add("activo");
   
    setTimeout(()=> {
        hecho.classList.add("active");
    }, 500)

    setTimeout(()=> {
        hecho2.classList.add("active");
        hecho3.classList.add("active");
    }, 1500)

    if (innerWidth < 1000) {
        scale = 2;
        pointX = -450;
        pointY = -1100;
    } else {
        scale = 2;
        pointX = -1300;
        pointY = -1500;
    }

    setTransform();

    zoom.style.transition = "transform 0.5s ease-in-out";

    zoom.style.pointerEvents = "none";

    setTimeout(()=> {
        zoom.style.transition = "";
        zoom.style.pointerEvents = "auto";
    }, 500)

}

function hecho4() {
    let hecho = document.getElementById("_6");
    let hecho2 = document.getElementById("_2");
    let hechoSiguiente = document.getElementById("hecho-5");
    hechoSiguiente.classList.add("activo");
   
    setTimeout(()=> {
        hecho.classList.add("active");
    }, 500)

    scale = 1;
    pointX = 0;
    pointY = -300;
    setTransform();

    setTimeout(()=> {
        scale = 1;
        pointX = 500;
        pointY = -200;
        setTransform();
        zoom.style.transition = "transform 5s ease-in-out";
    }, 2000)

    zoom.style.transition = "transform 0.5s ease-in-out";
    zoom.style.pointerEvents = "none";

    setTimeout(()=> {
        zoom.style.transition = "";
        zoom.style.pointerEvents = "auto";
    }, 5000)
}

function hecho5() {
    let hecho = document.getElementById("_7");
   
    setTimeout(()=> {
        hecho.classList.add("active");
    }, 500)

    scale = 1;
    pointX = 500;
    pointY = -200;
    setTransform();

    setTimeout(()=> {
        scale = 1;
        pointX = 1000;
        pointY = -200;
        setTransform();
        zoom.style.transition = "transform 5s ease-in-out";
    }, 100)

    zoom.style.transition = "transform 0.5s ease-in-out";
    zoom.style.pointerEvents = "none";

    setTimeout(()=> {
        zoom.style.transition = "";
        zoom.style.pointerEvents = "auto";
    }, 1000)

}

function hecho0() {
    let mapa = document.getElementById("world-map");

    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();

    zoom.style.transition = "transform 1s ease-in-out";
    zoom.style.pointerEvents = "auto";

    mapa.style.scale = "2";
    mapa.style.transition = "transform 0.5s ease-in-out";

    setTimeout(()=> {
        mapa.style.transition = "";
        zoom.style.transition = "";
    }, 500)

}

/*
setTimeout(hecho1, 500)
setTimeout(hecho2, 6000)
setTimeout(hecho3, 10000)
setTimeout(hecho4, 18000)
setTimeout(hecho5, 25000)
setTimeout(hecho0, 32000)
*/

function completarMapa() {
    let hecho1 = document.getElementById("_0");
    let hecho2 = document.getElementById("_1");
    let hecho3 = document.getElementById("_2");
    let hecho4 = document.getElementById("_3");
    let hecho5 = document.getElementById("_4");
    let hecho6 = document.getElementById("_5");
    let hecho7 = document.getElementById("_6");
    let hecho8 = document.getElementById("_7");

    hecho1.classList.add("active");
    hecho2.classList.add("active");
    hecho3.classList.add("active");
    hecho4.classList.add("active");
    hecho5.classList.add("active");
    hecho6.classList.add("active");
    hecho7.classList.add("active");
    hecho8.classList.add("active");

    zoom.style.pointerEvents = "auto";
}

/*
function visionPanoramica() {
    scale = 1;
    pointX = 1000;
    pointY = -200;
    setTransform();
    zoom.style.transition = "transform 10s ease-in-out";
    zoom.style.pointerEvents = "auto";

    // Segundo movimiento (tras 10 segundos)
    setTimeout(() => {
        scale = 1;
        pointX = -500;
        pointY = -200;
        setTransform();
        zoom.style.transition = "transform 10s ease-in-out";
    }, 10000);
}

// Ejecuta la animación inicial
visionPanoramica();

// Guarda el ID del intervalo para poder detenerlo después
let visionInterval = setInterval(visionPanoramica, 20000);

// Llama a completar el mapa
completarMapa();

// Cuando el usuario haga clic, detenemos la animación automática
zoom.addEventListener("click", function() {
    zoom.style.transition = "";
    zoom.style.pointerEvents = "auto";
    clearInterval(visionInterval); // ✅ Detiene el movimiento automático
});

*/

document.getElementById("hecho-1").addEventListener("click", hecho1);
document.getElementById("hecho-2").addEventListener("click", hecho2);
document.getElementById("hecho-3").addEventListener("click", hecho3);
document.getElementById("hecho-4").addEventListener("click", hecho4);
document.getElementById("hecho-5").addEventListener("click", hecho5);


completarMapa();

zoom.addEventListener("click", function() {
    zoom.style.animation = "none";
});




