async function register(email, password, name) {
  const res = await fetch("/api/auth/registro.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ocurrió un error al registrarse");
  return data;
}
