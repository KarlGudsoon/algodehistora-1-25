require("dotenv").config();
const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ ok: true, message: "Node funciona en v2networks 🚀" });
});

app.listen(3000, () => {
  console.log("Servidor Node activo");
});

const pool = require("./db");

app.get("/api/estudiantes", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM estudiantes"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
});
