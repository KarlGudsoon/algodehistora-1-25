/**
 * Muestra una notificación flotante de XP ganado.
 * Se puede llamar desde cualquier parte del sitio.
 *
 * @param {number} xp - Cantidad de XP ganado (si es 0 o menor, no muestra nada)
 * @param {string} [mensaje] - Texto opcional adicional (ej: "¡Artículo completado!")
 */
function mostrarNotificacionXP(xp, mensaje = "") {
  if (!xp || xp <= 0) return; // no hay XP nuevo, no mostramos nada

  console.log("Notificación activa");

  const notif = document.createElement("div");
  notif.className = "notificacion-xp";
  notif.innerHTML = `
    <div class="notificacion-xp-icono"><img src="/assets/icons/ribbon.svg"></div>
    <div class="notificacion-xp-texto">
      <strong>+${xp} XP</strong>
      ${mensaje ? `<small>${mensaje}</small>` : ""}
    </div>
  `;

  document.body.appendChild(notif);

  // Forzar reflow antes de animar la entrada
  notif.offsetHeight;
  notif.classList.add("activa");

  // Quitar automáticamente después de un tiempo
  setTimeout(() => {
    notif.classList.remove("activa");
    // Esperamos a que termine la transición de salida antes de eliminar del DOM
    notif.addEventListener("transitionend", () => notif.remove(), {
      once: true,
    });
  }, 2500);
}
