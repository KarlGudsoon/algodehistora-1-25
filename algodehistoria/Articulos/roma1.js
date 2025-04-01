var Colinas3D = document.querySelector("#colinas3d");
var Roma3D = document.querySelector("#Roma3D");
var sietecolinas2 = document.querySelector("#sietecolinas2");
var sietecolinas3 = document.querySelector("#sietecolinas3");
var Activo = false;

// Función para mostrar colinas3d y ocultar Roma3D
function mostrarColinas3D() {
  Colinas3D.style.display = "block";
  Roma3D.style.display = "none";
}

// Función para mostrar Roma3D y ocultar colinas3d
function mostrarRoma3D() {
  Colinas3D.style.display = "none";
  Roma3D.style.display = "block";
}

// Agregar event listener para sietecolinas2
sietecolinas2.addEventListener("click", function() {
  mostrarColinas3D();
});

// Agregar event listener para sietecolinas3
sietecolinas3.addEventListener("click", function() {
  mostrarRoma3D();
});


