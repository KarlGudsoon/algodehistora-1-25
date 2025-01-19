var Imagen = document.querySelector(".imagen-zoom");
var ContenedorImagen = document.querySelector(".contenedor-imagen-zoom");
var zoomActivo = false; // Variable para controlar el estado del zoom

function ZoomEnClick(event) {
  // Si el zoom está activo, restaura el tamaño original de la imagen
  if (zoomActivo) {
    TweenMax.to(Imagen, 0.2, { scaleX: '1', scaleY: '1' });
    zoomActivo = false;
  } else { // Si el zoom no está activo, aplica el zoom en el lugar donde se hizo clic
    var rect = Imagen.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    // Calcular el porcentaje de desplazamiento del clic en relación con el tamaño de la imagen
    var porcentajeX = (offsetX / Imagen.offsetWidth) * 100;
    var porcentajeY = (offsetY / Imagen.offsetHeight) * 100;

    // Aplicar el zoom centrado en la posición del clic
    TweenMax.to(Imagen, 0.2, {
      scaleX: '2',
      scaleY: '2',
      transformOrigin: `${porcentajeX}% ${porcentajeY}%`
    });
    zoomActivo = true;
  }
}

function RestaurarZoom() {
  // Restaurar el tamaño original de la imagen
  if (zoomActivo) {
    TweenMax.to(Imagen, 0.2, { scaleX: '1', scaleY: '1' });
    zoomActivo = false;
  }
}

// Agregar listeners de eventos para el clic y mouseleave
Imagen.addEventListener('click', ZoomEnClick);
Imagen.addEventListener('mouseleave', RestaurarZoom);