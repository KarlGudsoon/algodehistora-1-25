const botonteoria = document.querySelectorAll(".boton-teoria");
const botonpoblamiento = document.querySelectorAll("#poblamiento");

function manejarClic() {
    var idTeoria = this.id;
    var ventanaTeoria = document.getElementById("ventana-" + idTeoria);

    // Cerrar todas las ventanas y desactivar todos los botones
    document.querySelectorAll('.ventana-teoria').forEach(function(ventana) {
        ventana.style.transform = "scale(0)";
        ventana.style.opacity = "0";
    });

    botonteoria.forEach(function(boton) {
        boton.classList.remove("active");
    });

    botonpoblamiento.forEach(function(botonp) {
        botonp.classList.remove("active-poblamiento");
    });

    // Abrir o cerrar la ventana correspondiente al botón clickeado y activar el botón
    if (ventanaTeoria) {
        var scale = ventanaTeoria.style.transform;
        if (scale === "scale(0)" || scale === "") {
            ventanaTeoria.style.transform = "scale(1)"; 
            ventanaTeoria.style.opacity = "1"; // Abrir el concepto
            this.classList.add("active"); // Activar el botón
        } else {
            ventanaTeoria.style.transform = "scale(0)";
            ventanaTeoria.style.opacity = "0"; // Cerrar el concepto
            this.classList.remove("active"); // Desactivar el botón
        }
    }
}

botonteoria.forEach(function(boton) {
    boton.addEventListener("click", manejarClic);
});



function iniciopoblamiento() {
    
    botonteoria.forEach(function(boton) {
        boton.classList.remove("active");
    });

    this.classList.add("active-poblamiento");

    document.querySelectorAll('.ventana-teoria').forEach(function(ventana) {
        ventana.style.transform = "scale(0)";
        ventana.style.opacity = "0";
    });
}

botonpoblamiento.forEach(function(botonp) {
    botonp.addEventListener("click", iniciopoblamiento);
});

const modalPregunta = document.querySelector("#modal-pregunta");
const signoPregunta = document.querySelector(".signo-pregunta");

function toggleModalWidth() {
    // Obtener el estilo actual del modal
    const currentRight = modalPregunta.style.right;

    // Verificar si la posición es '0' y cambiarla de acuerdo a eso
    if (currentRight === "0px") {
        modalPregunta.style.right = "";
        signoPregunta.style.animationPlayState = "";
    } else {
        modalPregunta.style.right = "0px";
        signoPregunta.style.animationPlayState = "paused";
    }
}

signoPregunta.addEventListener("click", toggleModalWidth);

document.querySelector('.logo').addEventListener('click', function() {
    const navLogo = document.querySelector('.nav-logo');
    navLogo.classList.toggle('activo');
});

// VIDA COTIDIANA DEL PALEOLITICO SUPERIOR //

// Seleccionar los elementos que se pueden arrastrar
const draggables = document.querySelectorAll(".draggable");

// Seleccionar todos los mini contenedores
const miniContainers = document.querySelectorAll(".mini-container");

// Contenedor para los elementos draggable
const draggableContainer = document.getElementById("draggable-container");

// Añadir eventos de arrastrar a cada elemento draggable
draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", event.target.id);  // Guardar el id del elemento arrastrado
    });
});

// Añadir eventos de dragover y drop a cada mini contenedor
miniContainers.forEach(container => {
    // Permitir que los elementos sean soltados en el contenedor
    container.addEventListener("dragover", function(event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto
        container.classList.add("drag-over");  // Añadir estilo visual
    });

    // Quitar el estilo cuando se sale del contenedor
    container.addEventListener("dragleave", function(event) {
        container.classList.remove("drag-over");
    });

    // Manejar el evento de soltar
    container.addEventListener("drop", function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");  // Obtener el id del elemento arrastrado
        const draggedElement = document.getElementById(data);

        // Obtener el id del contenedor y del draggable
        const containerId = container.id.replace('mini-container-', '');
        const draggableId = draggedElement.id.replace('draggable-', '');

        // Validar si el draggable pertenece al contenedor correcto
        if (containerId === draggableId) {
            // Si el contenedor ya tiene un hijo, moverlo al contenedor original
            if (container.firstChild) {
                const previousElement = container.firstChild;
                draggableContainer.appendChild(previousElement); // Mover el elemento anterior de vuelta
                // Restablecer estilo inicial del mini contenedor si estaba ocupado
                container.classList.remove("correct", "incorrect");
                previousElement.draggable = true;  // Hacer que el elemento anterior sea de nuevo draggable
            }

            // Asegurarnos que el div esté en la posición correcta dentro del contenedor
            draggedElement.style.position = "relative";
            draggedElement.style.top = "0";
            draggedElement.style.left = "0";
            draggedElement.style.width = "100%";
            draggedElement.style.height = "100%";
            draggedElement.style.fontSize = "1.25vw";

            // Mover el elemento al contenedor
            container.appendChild(draggedElement);
            container.classList.add("correct");
            container.classList.remove("incorrect");

            // Desactivar el arrastre si es correcto
            draggedElement.draggable = false;
        } else {
            
        }

        container.classList.remove("drag-over");  // Quitar el estilo visual
    });
});

// Añadir eventos de dragover y drop al contenedor original (draggable-container)
draggableContainer.addEventListener("dragover", function(event) {
    event.preventDefault();  // Permitir el drop
});

draggableContainer.addEventListener("drop", function(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");  // Obtener el id del elemento arrastrado
    const draggedElement = document.getElementById(data);

    // Mover el elemento al contenedor original
    draggableContainer.appendChild(draggedElement);

    // Limpiar las posiciones del elemento
    draggedElement.style.position = "relative";
    draggedElement.style.top = "0";
    draggedElement.style.left = "0";
    draggedElement.style.boxShadow = "";
    

    // Reactivar la capacidad de arrastrar el elemento de nuevo
    draggedElement.draggable = true;

    // Encontrar el mini contenedor que tenía el elemento y eliminar estilos de correcto/incorrecto
    miniContainers.forEach(container => {
        if (container.contains(draggedElement)) {
            container.classList.remove("correct", "incorrect");
        }
    });
});

document.getElementById("glaciacion-frío").addEventListener("click", function() {
    document.getElementById("circulo-grafico").style.transform = "rotate(180deg)"; 
    document.getElementById("glaciacion-calor").style.transform = "scale(1)"; 
    document.getElementById("glaciacion-calor").style.filter = "brightness(75%)"; 
    document.getElementById("glaciacion-frío").style.transform = "scale(1.2)"; 
    document.getElementById("glaciacion-frío").style.filter = "brightness(100%)"; 
    document.getElementById("glaciacion-wurm").style.background = "#1e90ff";

    document.getElementById("tierra-fria").classList.add("aparecer-expandir");
    document.getElementById("tierra-caliente").classList.remove("aparecer-expandir");

    document.getElementById("fondo-glaciares").style.bottom = "-90%";
    document.getElementById("fondo-montaña").style.bottom = "-50%";

    document.getElementById("glaciacion-scratch").style.bottom = "-8%";
    document.getElementById("glaciacion-humano").style.bottom = "-100%";
});

document.getElementById("glaciacion-calor").addEventListener("click", function() {
    document.getElementById("circulo-grafico").style.transform = "rotate(0)"; 
    document.getElementById("glaciacion-frío").style.transform = "scale(1)"; 
    document.getElementById("glaciacion-frío").style.filter = "brightness(75%)"; 
    document.getElementById("glaciacion-calor").style.transform = "scale(1.2)";
    document.getElementById("glaciacion-calor").style.filter = "brightness(100%)"; 
    document.getElementById("glaciacion-wurm").style.background = "var(--orange)";

    document.getElementById("tierra-caliente").classList.add("aparecer-expandir");
    document.getElementById("tierra-fria").classList.remove("aparecer-expandir");

    document.getElementById("fondo-glaciares").style.bottom = "";
    document.getElementById("fondo-montaña").style.bottom = "";

    document.getElementById("glaciacion-scratch").style.bottom = "";
    document.getElementById("glaciacion-humano").style.bottom = "";
});

document.getElementById("ultima-glaciacion").addEventListener("click", function() {
    document.getElementById("circulo-grafico").style.transform = "rotate(180deg)"; 
    document.getElementById("glaciacion-calor").style.transform = "scale(1)"; 
    document.getElementById("glaciacion-calor").style.filter = "brightness(75%)"; 
    document.getElementById("glaciacion-frío").style.transform = "scale(1.2)"; 
    document.getElementById("glaciacion-frío").style.filter = "brightness(100%)"; 
    document.getElementById("glaciacion-wurm").style.background = "#1e90ff";

    document.getElementById("tierra-fria").classList.add("aparecer-expandir");
    document.getElementById("tierra-caliente").classList.remove("aparecer-expandir");

    document.getElementById("fondo-glaciares").style.bottom = "-90%";
    document.getElementById("fondo-montaña").style.bottom = "-50%";

    document.getElementById("glaciacion-scratch").style.bottom = "-8%";
    document.getElementById("glaciacion-humano").style.bottom = "-100%";
});

document.addEventListener("DOMContentLoaded", function() {
    const fondoCaverna = document.querySelector(".fondo-caverna");
    const contenedorCaverna = document.querySelector(".contenedor-caverna");
    let isDragging = false;
    let startY = 0;
    let initialTop = 0;

    // Al presionar el mouse
    fondoCaverna.addEventListener("mousedown", function(e) {
        isDragging = true;
        startY = e.clientY;
        initialTop = parseInt(window.getComputedStyle(fondoCaverna).top, 10);
        fondoCaverna.style.cursor = "grabbing"; // Cambia el cursor cuando arrastra
    });

    // Al soltar el mouse
    document.addEventListener("mouseup", function() {
        isDragging = false;
        fondoCaverna.style.cursor = "grab";
    });

    // Al mover el mouse
    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
            let deltaY = e.clientY - startY; // Diferencia de arrastre
            let newTop = initialTop + deltaY;

            // Limitar el movimiento para que no se salga del contenedor
            let minTop = contenedorCaverna.offsetHeight - fondoCaverna.offsetHeight;
            if (newTop > 0) {
                newTop = 0; // No mover hacia abajo más allá del límite superior
            }
            if (newTop < minTop) {
                newTop = minTop; // No mover hacia arriba más allá del límite inferior
            }

            fondoCaverna.style.top = newTop + "px"; // Aplicar nueva posición
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const fondosCaverna = document.querySelectorAll(".fondo-caverna"); // Selecciona todas las imágenes de fondo
    const contenedorCaverna = document.querySelector(".contenedor-caverna"); // Contenedor que envuelve los fondos
    let isDragging = false;
    let startY = 0;
    let initialTop = 0;

    fondosCaverna.forEach(function(fondoCaverna) {
        // Al presionar el mouse
        fondoCaverna.addEventListener("mousedown", function(e) {
            isDragging = true;
            startY = e.clientY;
            initialTop = parseInt(window.getComputedStyle(fondoCaverna).top, 10) || 0;
            fondoCaverna.style.cursor = "grabbing";
            document.getElementById("texto-mapa-glaciacion").style.opacity = "0";
            document.getElementById("texto-cavernas").style.opacity = "0";
        });

        // Al soltar el mouse
        document.addEventListener("mouseup", function() {
            isDragging = false;
            fondoCaverna.style.cursor = "grab";
            document.getElementById("texto-mapa-glaciacion").style.opacity = "1";
            document.getElementById("texto-cavernas").style.opacity = "1";
        });

        // Al mover el mouse
        document.addEventListener("mousemove", function(e) {
            if (isDragging) {
                let deltaY = e.clientY - startY; // Diferencia de arrastre vertical
                let newTop = initialTop + deltaY;

                // Limitar el movimiento para que no se salga del contenedor
                let minTop = contenedorCaverna.offsetHeight - fondoCaverna.offsetHeight;
                if (newTop > 0) {
                    newTop = 0; // No permitir mover hacia abajo más allá del límite superior
                }
                if (newTop < minTop) {
                    newTop = minTop; // No permitir mover hacia arriba más allá del límite inferior
                }

                fondoCaverna.style.top = newTop + "px"; // Aplicar nueva posición
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const fondosCaverna = document.querySelectorAll(".mapa-glaciacion"); // Selecciona todas las imágenes de fondo
    const contenedorCaverna = document.querySelector(".contenedor-mapa-glaciacion"); // Contenedor que envuelve los fondos
    let isDragging = false;
    let startY = 0;
    let initialTop = 0;

    fondosCaverna.forEach(function(fondoCaverna) {
        // Al presionar el mouse
        fondoCaverna.addEventListener("mousedown", function(e) {
            isDragging = true;
            startY = e.clientY;
            initialTop = parseInt(window.getComputedStyle(fondoCaverna).top, 10) || 0;
            fondoCaverna.style.cursor = "grabbing";
            document.getElementById("texto-mapa-glaciacion").style.opacity = "0";
            document.getElementById("texto-cavernas").style.opacity = "0";
        });

        // Al soltar el mouse
        document.addEventListener("mouseup", function() {
            isDragging = false;
            fondoCaverna.style.cursor = "grab";
            document.getElementById("texto-mapa-glaciacion").style.opacity = "1";
            document.getElementById("texto-cavernas").style.opacity = "1";
        });

        // Al mover el mouse
        document.addEventListener("mousemove", function(e) {
            if (isDragging) {
                let deltaY = e.clientY - startY; // Diferencia de arrastre vertical
                let newTop = initialTop + deltaY;

                // Limitar el movimiento para que no se salga del contenedor
                let minTop = contenedorCaverna.offsetHeight - fondoCaverna.offsetHeight;
                if (newTop > 0) {
                    newTop = 0; // No permitir mover hacia abajo más allá del límite superior
                }
                if (newTop < minTop) {
                    newTop = minTop; // No permitir mover hacia arriba más allá del límite inferior
                }

                fondoCaverna.style.top = newTop + "px"; // Aplicar nueva posición
            }
        });
    });
});

document.getElementById("texto-cavernas").addEventListener("click", function() {
    document.getElementById("contenedor-mapa-glaciacion").style.display = "none";
    document.getElementById("contenedor-caverna").style.display = "block";
  
    // Actualizamos la selección de los textos
    document.getElementById("texto-mapa-glaciacion").classList.add("no-seleccionado");
    document.getElementById("texto-cavernas").classList.remove("no-seleccionado");
  });
  
  document.getElementById("texto-mapa-glaciacion").addEventListener("click", function() {
    document.getElementById("contenedor-mapa-glaciacion").style.display = "block";
    document.getElementById("contenedor-caverna").style.display = "none";
  
    // Actualizamos la selección de los textos
    document.getElementById("texto-cavernas").classList.add("no-seleccionado");
    document.getElementById("texto-mapa-glaciacion").classList.remove("no-seleccionado");
  });
  
var imgFondoRevolucion = document.getElementById("img-revolucion-cognitiva");
var lenguaje = document.getElementById("lenguaje");
var ritualidad = document.getElementById("ritualidad");
var arte = document.getElementById("arte");

var rasgos = [lenguaje, ritualidad, arte];

function cambiarFondo(nuevoSrc) {
    imgFondoRevolucion.src = nuevoSrc;
}

function manejarSeleccion(rasgoSeleccionado, nuevoSrc) {
    rasgos.forEach(function(rasgo) {
        rasgo.classList.remove("rasgo-seleccionado");
    });

    rasgoSeleccionado.classList.add("rasgo-seleccionado");

    cambiarFondo(nuevoSrc);
}

lenguaje.addEventListener("click", function() {
    manejarSeleccion(lenguaje, "/img/prehistoria/arterupestre.webp");
});

ritualidad.addEventListener("click", function() {
    manejarSeleccion(ritualidad, "/img/prehistoria/dawnofman.jpeg"); 
});

arte.addEventListener("click", function() {
    manejarSeleccion(arte, "/img/prehistoria/arterupestre (2).webp");
});

