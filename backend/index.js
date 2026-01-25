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

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL conectado ✅");
    conn.release();
  } catch (err) {
    console.error("Error MySQL ❌", err);
  }
})();
