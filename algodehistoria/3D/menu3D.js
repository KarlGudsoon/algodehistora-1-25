// Selecciona todos los elementos con la clase "seleccionador"
var seleccionadores = document.querySelectorAll(".seleccionador");

// Selecciona todos los elementos con la clase "card-menu"
var menus = document.querySelectorAll(".menu");

// Agrega un event listener a cada elemento seleccionador
seleccionadores.forEach(function(seleccionador) {
  seleccionador.addEventListener("click", function() {
    // Obtiene el ID del elemento seleccionador clickeado
    var idSeleccionador = seleccionador.id;

    // Itera sobre todos los elementos con la clase "card-menu"
    menus.forEach(function(menu) {
      // Verifica si el menú corresponde al seleccionador clickeado
      if (menu.id === "menu-" + idSeleccionador) {
        // Si el menú está visible, oculta el menú estableciendo la altura en 0px
        if (menu.style.height === "300px") {
          menu.style.height = "0px";
        } else {
          // Si no, establece la altura del menú en 400px
          menu.style.height = "300px";
        }
      } else {
        // Si no corresponde, oculta el menú estableciendo la altura en 0px
        menu.style.height = "0px";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Selecciona todos los elementos con la clase "inner"
  const carousels = document.querySelectorAll(".inner");

  // Agrega el event listener a cada elemento "inner"
  carousels.forEach(function(carousel) {
    let isDragging = false;
    let startX, startScrollLeft;

    const dragStart = (e) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      isDragging = false;
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  });
});

var CardMenus = document.querySelectorAll(".card-menu");
var Visor3D = document.querySelector(".visor3D");
var Menu3ds = document.querySelectorAll(".menu");
var container = document.querySelectorAll(".container-widget-seleccionador");

CardMenus.forEach(function(CardMenu) {
  CardMenu.addEventListener("click", function() {
    var newSrc = CardMenu.getAttribute("data-src");
    Visor3D.src = newSrc;

    CardMenus.forEach(function(menu) {
      menu.classList.remove("card-menu-seleccionada");
    });

    CardMenu.classList.add("card-menu-seleccionada");

    // Establecer el estilo height a 0px para ocultar todos los menús 3D
    Menu3ds.forEach(function(menu) {
      menu.style.height = "0px";
    });
  });
});

// Selecciona los elementos con la clase "abrir-menu"
var AbrirMenu = document.querySelectorAll(".abrir-menu");

// Selecciona los elementos con la clase "menu"
var container = document.querySelectorAll(".container-widget-seleccionador");

// Itera sobre cada elemento "abrir-menu"
AbrirMenu.forEach(function(elemento) {
  elemento.addEventListener("click", function() {
    // Itera sobre cada elemento "menu"
    container.forEach(function(container) {
      // Verifica si el menú está oculto
      if (container.style.bottom !== "0px") {
        // Si está oculto, muéstralo
        container.style.bottom = "0px";
      } else {
        // Si está visible, ocúltalo
        container.style.bottom = ""; // Puedes ajustar el valor según tus necesidades
      }
    });
  });
});
