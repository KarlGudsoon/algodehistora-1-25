const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ ok: true, message: "Node funciona en v2networks 🚀" });
});

app.listen(3000, () => {
  console.log("Servidor Node activo");
});
