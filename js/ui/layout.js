async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(
      `No se encontró el contenedor #${id} en esta página, se omite ${file}`,
    );
    return;
  }
  const res = await fetch(file);
  const html = await res.text();
  el.innerHTML = html;
}

async function initLayout() {
  await Promise.all([
    loadComponent("header", "/components/header.html"),
    loadComponent("footer", "/components/footer.html"),
    loadComponent("navbarmobile", "/components/navbarmobile.html"),
  ]);

  await inicializarNav(); // ahora sí, navUserSection ya existe en el DOM

  document.addEventListener("click", (e) => {
    if (e.target.id === "btn-menu-mobile") {
      document.querySelector(".menu-mobile")?.classList.toggle("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === "btn-cerrar-menu") {
      document.querySelector(".menu-mobile")?.classList.remove("active");
    }
  });
}

initLayout();
