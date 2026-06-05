<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_luminary");
// Validar que venga el parámetro
if (empty($_GET['curso'])) {
    die(json_encode(['success' => false, 'mensaje' => 'Falta el id del curso.']));
}

$id_curso = intval($_GET['curso']); // intval protege contra SQL injection

$stmt = $conexion->prepare("SELECT * FROM tareas WHERE curso_id = ?");
$stmt->bind_param("i", $id_curso);
$stmt->execute();
$resultado = $stmt->get_result();
?>

<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="/index.css" />
    <link rel="stylesheet" href="/assets/css/layout.css" />

    <header id="header"></header>
    <div id="navbarmobile"></div>

<ul class="tabla-tareas">
  <?php while ($tarea = $resultado->fetch_assoc()): ?>
    <li>
      <h3><?= htmlspecialchars($tarea['titulo']) ?></h3>
      <p><?= htmlspecialchars($tarea['descripcion']) ?></p>
      <p>Fecha límite: <?= htmlspecialchars($tarea['fecha_limite']) ?></p>

      <!-- ID único por formulario -->
      <form class="form-entrega" data-id="<?= $tarea['id'] ?>">
        <input type="hidden" name="tarea_id" value="<?= $tarea['id'] ?>">
        <input type="text" name="nombre_estudiante" placeholder="Tu nombre" required>
        
        <div class="campo-archivo seleccionado" id="campo-archivo">
            <div class="contenido-campo-archivo">
              <img src="/icons/upload.svg">
              <span>Sube tu archivo aquí</span>
              <span id="file-name">Ningún archivo seleccionado</span>
            </div>
            <input type="file" name="archivo" required>
          </div>
        <button type="submit">Subir Tarea</button>

        <!-- Mensaje de respuesta por formulario -->
        <p class="mensaje"></p>
      </form>
    </li>
  <?php endwhile; ?>
</ul>

<a href="login.php">Ingresar</a>

<style>
  body { margin: 0 auto; padding: 0; }

  .mensaje { font-weight: bold; margin-top: 8px; }
  .mensaje.ok    { color: green; }
  .mensaje.error { color: red; }

  .tabla-tareas {
    list-style: none; 
    padding: 0;
    margin: 1rem;
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .tabla-tareas li {
    width: 100%;
    max-width: 1200px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background-color: rgba(0,0,0, 0.25);
    padding: 2rem;
    border-radius: 1rem;
  }
  
  .tabla-tareas li input[type="text"] {
    width: 100%;
    max-width: 300px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    display: block;
    padding: 0.8rem;
  }
  
  .campo-archivo {
      padding: 1rem;
      border-radius: 10px;
      border: 2px dotted rgba(255, 255, 255, 0.2);
      font-size: 0.95rem;
      transition: all 0.2s ease;
      outline: none;
      color: white;
      background-color: rgba(0, 0, 0, 0.15);
      cursor: pointer;
      position: relative;
      display: flex;
      justify-content: center;
    }
  .tabla-tareas .campo-archivo input[type="file"] {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
  padding: 0;
}

.tabla-tareas .campo-archivo .contenido-campo-archivo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.contenido-campo-archivo img {
  width: 30px;
  height: 30px;
}

.tabla-tareas input[type="file"]::file-selector-button {
  display: none;
}

.tabla-tareas .campo-archivo:hover {
  border: 2px dotted rgba(255, 255, 255, 0.5);
}
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