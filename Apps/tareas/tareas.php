<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");
$resultado = $conexion->query("SELECT * FROM tareas");
?>

<link rel="stylesheet" href="/index.css">

<header>
      <img src="/icons/logo.svg">
      <nav>
        <ul>
          <li><a href="/index.html">Inicio</a></li>
          <li><a href="#articulos">Articulos</a></li>
          <li><a href="#aplicaciones">Aplicaciones</a></li>
          <li><a href="#acerca-de">Acerca de</a></li>
        </ul>
      </nav>
</header>

<ul>
    <?php while ($tarea = $resultado->fetch_assoc()): ?>
        <li>
            <h3><?= $tarea['titulo'] ?></h3>
            <p><?= $tarea['descripcion'] ?></p>
            <p>Fecha límite: <?= $tarea['fecha_limite'] ?></p>

            <form action="subir_tarea.php" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="tarea_id" value="<?= $tarea['id'] ?>">
                <input type="text" name="nombre_estudiante" placeholder="Tu nombre" required>
                <input type="file" name="archivo" required>
                <button type="submit">Subir Tarea</button>
            </form>
        </li>
    <?php endwhile; ?>
</ul>

<a href="login.php">Ingresar</a>

<style>
  body {
    margin: 0;
    padding: 0;
  }

</style>
