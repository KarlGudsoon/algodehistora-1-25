let glosarioDatos = {};

fetch("/Apps/glosario/glosario.json")
    .then(response => response.json())
    .then(data => {
        glosarioDatos = data;
    })
    .catch(error => console.error("Error cargando el JSON:", error));

document.querySelectorAll(".concepto").forEach(concepto => {
    concepto.addEventListener("click", function(event) {
        const id = this.id;
        if (glosarioDatos[id]) {
            document.getElementById("glosario-titulo").innerText = glosarioDatos[id].titulo;
            document.getElementById("glosario-texto").innerText = glosarioDatos[id].descripcion;

            const widget = document.getElementById("glosario");
            widget.classList.add("active");
        }
    });
});
