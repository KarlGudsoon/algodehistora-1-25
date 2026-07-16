async function guardarResultadoCuestionario(articuloSlug, nota) {
  const res = await fetch("/api/articulos/guardar_resultado.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ articulo_slug: articuloSlug, nota }),
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al guardar el resultado");
  return data;
}

async function obtenerResultadoCuestionario(articuloSlug) {
  const res = await fetch(
    `/api/articulos/obtener_progreso.php?articulo_slug=${encodeURIComponent(articuloSlug)}`,
    {
      credentials: "include",
    },
  );
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener el resultado");
  return data.resultado; // null si no existe, o { nota, aprobado, fecha_completado, respuestas_correctas }
}
