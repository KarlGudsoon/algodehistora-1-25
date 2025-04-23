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

function setTransform() {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
}

var todosLosHechos = document.querySelectorAll(".container-hechos-texto div");

// Eventos de mouse
zoom.onmousedown = function (e) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;

    todosLosHechos.forEach(function(elemento) {
        elemento.style.pointerEvents = "none";
    }
    );
};

zoom.onmouseup = function () {
    panning = false;

    todosLosHechos.forEach(function(elemento) {
        elemento.style.pointerEvents = "";
    }
    );
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

document.getElementById("resetZoom").addEventListener("click", function resetZoom() {
  scale = 1;
  pointX = 0;
  pointY = 0;
  setTransform();

  zoom.querySelector("svg").style = "";
});

document.getElementById("hecho-1").addEventListener("click", function() {
    var objetivoCirculo = document.getElementById("objetivo_circulo");
    var objetivoTexto = document.getElementById("objetivo_asia");
    var hechoSiguiente = document.getElementById("hecho-2");
    var idHecho = this.id;
    const idHechoTexto = `${idHecho}-texto`;
    const elementoHechoTexto = document.getElementById(idHechoTexto);
    var todosLosHechos = document.querySelectorAll(".hecho-texto");
    var startTravel = document.getElementById("start-travel");

    startTravel.classList.remove("activo");
    this.style.animation = "none";

    todosLosHechos.forEach(function(elemento) {
        elemento.classList.remove("notify");
    });

    if (elementoHechoTexto) {
        elementoHechoTexto.classList.add("activo");
        elementoHechoTexto.classList.add("notify");
        elementoHechoTexto.style.animationPlayState = "running";
    } else {
        return;
    }

    scale = 1;
    pointX = -400;
    pointY = -50;
    setTransform();

    zoom.style.transition = "transform 0.5s ease-in-out";

    setTimeout(() => {
        zoom.style.transition = "none";
    }, 500);

    objetivoCirculo.classList.add("activo");
    objetivoTexto.classList.add("activo");

    hechoSiguiente.classList.add("activo");
});

document.getElementById("hecho-2").addEventListener("click", function() {
    var viajePortugal = document.getElementById("VIAJEPORTUGAL");
    var hechoSiguiente = document.getElementById("hecho-3");
    var idHecho = this.id;
    const idHechoTexto = `${idHecho}-texto`;
    const elementoHechoTexto = document.getElementById(idHechoTexto);
    var todosLosHechos = document.querySelectorAll(".hecho-texto");

    todosLosHechos.forEach(function(elemento) {
        elemento.classList.remove("notify");
    });

    if (elementoHechoTexto) {
        elementoHechoTexto.classList.add("activo");
        elementoHechoTexto.classList.add("notify");
        elementoHechoTexto.style.animationPlayState = "running";
    } else {
        return;
    }

    scale = 1;
    pointX = 0;
    pointY = -150;
    setTransform();

    zoom.style.transition = "transform 0.5s ease-in-out";

    setTimeout(() => {
        zoom.style.transition = "none";
    }, 500);

    viajePortugal.classList.add("activo");

    hechoSiguiente.classList.add("activo");
});

document.getElementById("hecho-3").addEventListener("click", function() {
    var viajeTerrestre = document.getElementById("via_terrestre");
    var mapa = document.getElementById("world-map");
    var hechoSiguiente = document.getElementById("hecho-4");
    var idHecho = this.id;
    const idHechoTexto = `${idHecho}-texto`;
    const elementoHechoTexto = document.getElementById(idHechoTexto);
    var todosLosHechos = document.querySelectorAll(".hecho-texto");

    todosLosHechos.forEach(function(elemento) {
        elemento.classList.remove("notify");
    });

    if (elementoHechoTexto) {
        elementoHechoTexto.classList.add("activo");
        elementoHechoTexto.classList.add("notify");
        elementoHechoTexto.style.animationPlayState = "running";
    } else {
        return;
    }

    scale = 1;
    pointX = 0;
    pointY = 50;
    setTransform();

    zoom.style.transition = "transform 0.5s ease-in-out";

    mapa.style.scale = "5";
    zoom.style.pointerEvents = "none";

    setTimeout(() => {
        mapa.style.scale = "";
        zoom.style.pointerEvents = "auto";
        zoom.style.transition = "none";
    }, 1500);

    viajeTerrestre.classList.add("activo");
    
    hechoSiguiente.classList.add("activo");
});




document.getElementById("hecho-4").addEventListener("click", function() {
    var viaje = document.getElementById("viajesexploracionespaña");
    var telon = document.getElementById("telon_america");
    var mapa = document.getElementById("world-map");
    var idHecho = this.id;
    const idHechoTexto = `${idHecho}-texto`;
    const elementoHechoTexto = document.getElementById(idHechoTexto);
    var todosLosHechos = document.querySelectorAll(".hecho-texto");

    todosLosHechos.forEach(function(elemento) {
        elemento.classList.remove("notify");
    });

    if (elementoHechoTexto) {
        elementoHechoTexto.classList.add("activo");
        elementoHechoTexto.classList.add("notify");
        elementoHechoTexto.style.animationPlayState = "running";
    } else {
        return;
    }

    scale = 1;
    pointX = 250;
    pointY = -150;
    setTransform();

    zoom.style.transition = "transform 0.5s ease-in-out";
    
    mapa.style.scale = "4";
    zoom.style.pointerEvents = "none";

    setTimeout(() => {
        mapa.style.scale = "";
        zoom.style.pointerEvents = "auto";
        zoom.style.transition = "none";
    }, 1500);

    viaje.classList.add("activo");
    telon.classList.remove("activo");
});

document.getElementById("zoom").addEventListener("click", function() {
    var todosLosHechos = document.querySelectorAll(".container-hechos-texto div");
    todosLosHechos.forEach(function(elemento) {
        elemento.classList.remove("notify");


    });
});

document.querySelectorAll(".img-view").forEach(function(elemento) {
    elemento.addEventListener("click", function() {
        var containerImgViewer = document.querySelector(".container-img-viewer");
        var imgViewer = document.getElementById("img-viewer");
        var srcImg = this.src;

        containerImgViewer.classList.add("activo");
        imgViewer.src = srcImg;
       
    });
})

document.querySelector(".container-img-viewer").addEventListener("click", function() {
    this.classList.remove("activo");
});


document.querySelectorAll(".close-icon").forEach(closeIcon => {
    closeIcon.addEventListener("click", function() {
        this.parentElement.classList.remove("activo");
    });
});

    
// Código comentado para animación de los hechos

/* 
document.querySelectorAll(".container-hechos span").forEach(function(elemento) {
    elemento.addEventListener("mouseenter", function() {
        var idHecho = this.id;
        const idHechoTexto = `${idHecho}-texto`;
        const elementoHechoTexto = document.getElementById(idHechoTexto);

        if (elementoHechoTexto) {
            elementoHechoTexto.style.transform = "scale(1.05)";
            elementoHechoTexto.style.transition = "transform 0.2s ease";
        } else {
            return;
        }
    });

    elemento.addEventListener("mouseleave", function() {
        var idHecho = this.id;
        const idHechoTexto = `${idHecho}-texto`;
        const elementoHechoTexto = document.getElementById(idHechoTexto);

        if (elementoHechoTexto) {
            elementoHechoTexto.style.transform = "scale(1)";
        } else {
            return;
        }
    });
    }
);
*/