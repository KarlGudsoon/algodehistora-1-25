var cursos = document.querySelectorAll(".curso-recursos");

// Función para manejar el clic en cada elemento
function manejarClic() {
    var idCurso = this.id;
    var cursoDetalle = document.getElementById("curso-" + idCurso);
    if (cursoDetalle) {
        cursoDetalle.style.bottom = "0px";
        cursoDetalle.style.clipPath = "circle(120% at top)";
        cursoDetalle.style.opacity = "1";
    }
}

// Iterar sobre cada elemento y agregar un event listener para el clic
cursos.forEach(function(curso) {
    curso.addEventListener("click", manejarClic);
});

var cursosCerrar = document.querySelectorAll(".curso-recursos-cerrar");

// Obtener todos los elementos con la clase "curso-seleccionado"
var cursosSeleccionados = document.querySelectorAll(".curso-seleccionado");

// Función para cerrar el curso seleccionado
function cerrarcurso() {
    // Obtener el índice del elemento cursoCerrar actual dentro de la lista de todos los elementos cursosCerrar
    var index = Array.from(cursosCerrar).indexOf(this);

    // Ocultar el curso seleccionado correspondiente al cursoCerrar actual
    if (index !== -1 && index < cursosSeleccionados.length) {
        cursosSeleccionados[index].style.bottom = "0px";
        cursosSeleccionados[index].style.clipPath = "circle(0% at top)";
        cursosSeleccionados[index].style.opacity = "0";
    }
}

// Iterar sobre cada elemento con la clase "curso-recursos-cerrar" y agregar un event listener para el clic
cursosCerrar.forEach(function(cursoCerrar) {
    cursoCerrar.addEventListener("click", cerrarcurso);
});

