async function inicializarNav() {
  const user = await checkSession();
  const navUserSection = document.getElementById("navUserSection");

  if (!navUserSection) return;

  if (user) {
    const inicialUser = user.name.charAt(0).toUpperCase();
    navUserSection.innerHTML = `
      <span class="avatar">${inicialUser}</span>
      <button id="logoutBtn"><img src="/assets/icons/logout.svg" alt="Cerrar sesión" /></button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", logout);
  } else {
    navUserSection.innerHTML = `
      <a href="/auth/">Ingresar</a>
    `;
  }
}
