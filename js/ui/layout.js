async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
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

document.addEventListener("DOMContentLoaded", initLayout);
