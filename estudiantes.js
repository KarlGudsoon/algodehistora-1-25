fetch("/api/estudiantes")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("estudiantes");

    data.forEach(a => {
      contenedor.innerHTML += `
        <article>
          <h2>${a.nombre}</h2>
          <p>${a.rut}</p>
        </article>
      `;
    });
  })
  .catch(err => {
    console.error("Error:", err);
  });
