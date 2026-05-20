async function listarAnimes() {
  try {
    const response = await fetch("./data/animes.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const animeList = document.getElementById("anime-list");

    if (!animeList) {
      throw new Error('Element "anime-list" not found in the DOM.');
    }

    data.forEach((anime) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");

      a.href = `./reproductor.html?id=${anime.id}`;
      img.src = anime.image;
      img.alt = anime.name;

      a.append(img);
      li.appendChild(a);
      animeList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading animes:", error);
  }
}

document.addEventListener("DOMContentLoaded", listarAnimes);

function filterAnimes() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const animesList = document.querySelectorAll("ul li");

  animesList.forEach((anime) => {
    const animeName = anime.textContent.toLowerCase();
    if (animeName.includes(searchInput)) {
      anime.style.display = "";
    } else {
      anime.style.display = "none";
    }
  });
}
