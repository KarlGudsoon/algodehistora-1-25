async function inicializarNav() {
  const user = await checkSession();
  const navUserSection = document.getElementById("navUserSection");

  if (!navUserSection) return;

  if (user) {
    navUserSection.innerHTML = `
      <span>Hola, ${user.name}</span>
      <button id="logoutBtn">Cerrar sesión</button>
    `;
    document.getElementById("logoutBtn").addEventListener("click", logout);
  } else {
    navUserSection.innerHTML = `
      <a href="/auth/">Ingresar</a>
    `;
  }
}
