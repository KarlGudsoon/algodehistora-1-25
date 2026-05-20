async function cargarReproductor() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const capituloActual = Number(params.get("capitulo")) || 1;

  if (!id) return;

  try {
    const response = await fetch("./data/animes.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const animes = await response.json();
    const anime = animes.find((a) => a.id === id);

    if (!anime) {
      console.error("Anime no encontrado.");
      return;
    }

    // Generar la ruta del video automáticamente
    const videoSrc = `./videos/${anime.folder}/${capituloActual}.mp4`;

    const reproductor = document.getElementById("reproductor-anime");
    reproductor.src = videoSrc;
    reproductor.load();
    reproductor.play();

    // Generar lista de capítulos automáticamente desde el total
    const lista = document.getElementById("lista-capitulos");
    lista.innerHTML = Array.from({ length: anime.capitulos }, (_, i) => {
      const num = i + 1;
      const activo = num === capituloActual ? "activo" : "";
      return `
        <li class="${activo}">
          <a href="?id=${id}&capitulo=${num}">
            Capítulo ${num}
          </a>
        </li>
      `;
    }).join("");

    // Scroll al capítulo activo
    document.querySelector(".activo")?.scrollIntoView({ block: "center" });
  } catch (error) {
    console.error("Error al cargar el reproductor:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarReproductor);
