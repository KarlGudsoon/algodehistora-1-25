async function otorgarCarta(slug) {
  const res = await fetch("/api/cartas/otorgar_carta.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ slug }),
  });

  if (res.status === 401) {
    throw new Error("No autenticado");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener la carta");
  return data;
}

async function obtenerMiColeccionCartas() {
  const res = await fetch("/api/cartas/coleccion_carta.php", {
    credentials: "include",
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener la colección");
  return data.coleccion;
}

async function obtenerMiColeccionCartasArticulo(slugsDelArticulo) {
  const query = encodeURIComponent(slugsDelArticulo.join(","));
  const res = await fetch(
    `/api/cartas/coleccion_carta_articulo.php?slugs=${query}`,
    {
      credentials: "include",
    },
  );
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener la colección");
  return data.coleccion.map((c) => c.carta_slug);
}

async function otorgarPais(slug) {
  const res = await fetch("/api/paises/otorgar_pais.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ slug }),
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener el país");
  return data;
}

async function obtenerMiColeccionPaises() {
  const res = await fetch("/api/paises/coleccion_pais.php", {
    credentials: "include",
  });
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener la colección");
  return data.coleccion;
}

async function obtenerMiColeccionPaisesArticulo(slugsDelArticulo) {
  const query = encodeURIComponent(slugsDelArticulo.join(","));
  const res = await fetch(
    `/api/paises/coleccion_pais_articulo.php?slugs=${query}`,
    {
      credentials: "include",
    },
  );
  if (res.status === 401) throw new Error("No autenticado");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al obtener la colección");
  return data.coleccion.map((c) => c.pais_slug);
}
