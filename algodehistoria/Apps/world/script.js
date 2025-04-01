const mapContainer = document.getElementById('map-container');
const worldMap = document.getElementById('world-map');

let isPanning = false;
let startX, startY;
let scale = 1;
let translateX = 0, translateY = 0;
const basePanSpeed = 1.5; // Velocidad base de desplazamiento
const zoomPanFactor = 0.5; // Factor para ajustar el desplazamiento al hacer zoom

// Manejar el zoom con la rueda del ratón
mapContainer.addEventListener('wheel', function(event) {
    event.preventDefault();

    const scaleAmount = 0.25;
    const wheelDirection = event.deltaY > 0 ? -1 : 1; // Hacia arriba o hacia abajo
    scale += scaleAmount * wheelDirection;
    scale = Math.min(Math.max(1, scale), 5); // Límite de zoom

    // Ajustar la transformación para hacer zoom en el centro
    worldMap.style.transformOrigin = "center center";
    worldMap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

// Manejar el clic para desplazar el mapa
mapContainer.addEventListener('mousedown', function(event) {
    isPanning = true;
    startX = event.clientX;
    startY = event.clientY;
    worldMap.style.cursor = 'grabbing';
});

mapContainer.addEventListener('mousemove', function(event) {
    if (!isPanning) return;

    // Ajustar el desplazamiento con una velocidad proporcional al zoom
    const deltaX = (event.clientX - startX) * basePanSpeed * zoomPanFactor; // Proporcional al zoom
    const deltaY = (event.clientY - startY) * basePanSpeed * zoomPanFactor; // Proporcional al zoom

    translateX += deltaX;
    translateY += deltaY;

    startX = event.clientX;
    startY = event.clientY;

    // Aplicar la transformación de desplazamiento y zoom
    worldMap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

mapContainer.addEventListener('mouseup', function() {
    isPanning = false;
    worldMap.style.cursor = 'grab';
});

mapContainer.addEventListener('mouseleave', function() {
    isPanning = false;
    worldMap.style.cursor = 'grab';
});









