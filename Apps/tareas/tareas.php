<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");
$resultado = $conexion->query("SELECT * FROM tareas");
?>

<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="/index.css" />
    <link rel="stylesheet" href="/assets/css/layout.css" />
<ul>
  <?php while ($tarea = $resultado->fetch_assoc()): ?>
    <li>
      <h3><?= htmlspecialchars($tarea['titulo']) ?></h3>
      <p><?= htmlspecialchars($tarea['descripcion']) ?></p>
      <p>Fecha límite: <?= htmlspecialchars($tarea['fecha_limite']) ?></p>

      <!-- ID único por formulario -->
      <form class="form-entrega" data-id="<?= $tarea['id'] ?>">
        <input type="hidden" name="tarea_id" value="<?= $tarea['id'] ?>">
        <input type="text" name="nombre_estudiante" placeholder="Tu nombre" required>
        <input type="file" name="archivo" required>
        <button type="submit">Subir Tarea</button>

        <!-- Mensaje de respuesta por formulario -->
        <p class="mensaje"></p>
      </form>
    </li>
  <?php endwhile; ?>
</ul>

<a href="login.php">Ingresar</a>

<style>
  body { margin: 0; padding: 0; }

  .mensaje { font-weight: bold; margin-top: 8px; }
  .mensaje.ok    { color: green; }
  .mensaje.error { color: red; }
</style>

<script src="/assets/js/layout.js" defer></script>

<script>
  document.querySelectorAll('.form-entrega').forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // Evita recargar la página

      const mensajeEl = form.querySelector('.mensaje');
      const boton     = form.querySelector('button[type="submit"]');
      const formData  = new FormData(form); // Captura todos los campos incluido el archivo

      // Estado de carga
      boton.disabled    = true;
      boton.textContent = 'Subiendo...';
      mensajeEl.textContent = '';
      mensajeEl.className   = 'mensaje';

      try {
        const respuesta = await fetch('subir_tarea.php', {
          method: 'POST',
          body: formData // FormData maneja multipart automáticamente
        });

        const json = await respuesta.json();

        if (json.success) {
          mensajeEl.textContent = '✅ ' + json.mensaje;
          mensajeEl.classList.add('ok');
          form.reset(); // Limpia el formulario
        } else {
          mensajeEl.textContent = '❌ ' + json.mensaje;
          mensajeEl.classList.add('error');
        }

      } catch (err) {
        mensajeEl.textContent = '❌ Error de conexión con el servidor.';
        mensajeEl.classList.add('error');
        console.error(err);
      } finally {
        boton.disabled    = false;
        boton.textContent = 'Subir Tarea';
      }
    });
  });
</script>