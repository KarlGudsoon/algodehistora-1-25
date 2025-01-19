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
      function setTransform() {
        zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
      }
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
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;
        setTransform();
      }


      
      

