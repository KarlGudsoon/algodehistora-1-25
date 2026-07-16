async function inicializarPerfil() {
  try {
    const usuario = await obtenerPerfilDashboard();
    document.getElementById("datosPerfil").innerHTML = `
      <p>Nombre: ${usuario.name}</p>
      <p>Correo: ${usuario.email}</p>
      <p>Miembro desde: ${new Date(usuario.created_at).toLocaleDateString("es-CL")}</p>
    `;
  } catch (error) {
    console.error("Error al cargar el perfil:", error);
  }
}
