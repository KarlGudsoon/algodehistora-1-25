// js/services/dashboardService.js

async function obtenerEstadisticasDashboard() {
  const res = await fetch("/api/dashboard/estadisticas.php", {
    credentials: "include",
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener estadísticas");
  return data;
}

async function obtenerColeccionDashboard() {
  const res = await fetch("/api/dashboard/coleccion.php", {
    credentials: "include",
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener colección");
  return data;
}

async function obtenerPerfilDashboard() {
  const res = await fetch("/api/dashboard/perfil.php", {
    credentials: "include",
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener perfil");
  return data.usuario;
}
