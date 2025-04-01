<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");

// Obtener todas las tareas con sus entregas
$resultado = $conexion->query("
    SELECT tareas.id AS tarea_id, tareas.titulo, entregas.nombre_estudiante, entregas.archivo 
    FROM tareas 
    LEFT JOIN entregas ON tareas.id = entregas.tarea_id
    ORDER BY tareas.id, entregas.id
");

$tareas = [];
while ($fila = $resultado->fetch_assoc()) {
    $tarea_id = $fila['tarea_id'];
    if (!isset($tareas[$tarea_id])) {
        $tareas[$tarea_id] = [
            'titulo' => $fila['titulo'],
            'entregas' => []
        ];
    }
    if ($fila['nombre_estudiante']) { // Solo agregar si hay entrega
        $tareas[$tarea_id]['entregas'][] = [
            'nombre' => $fila['nombre_estudiante'],
            'archivo' => $fila['archivo']
        ];
    }
}
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

<form action="guardar_tarea.php" method="POST">
    <input type="text" name="titulo" placeholder="Título de la tarea" required>
    <textarea name="descripcion" placeholder="Descripción de la tarea" required></textarea>
    <input type="date" name="fecha_limite" required>
    <button type="submit">Crear Tarea</button>
</form>

<ul>
    <?php foreach ($tareas as $tarea_id => $tarea): ?>
        <li id="tarea-<?= $tarea_id ?>">
            <h3><?= $tarea['titulo'] ?></h3>
            <button onclick="eliminarTarea(<?= $tarea_id ?>)">❌ Eliminar Tarea</button>

            <?php if (!empty($tarea['entregas'])): ?>
                <ul>
                    <?php foreach ($tarea['entregas'] as $entrega): ?>
                        <li id="entrega-<?= md5($entrega['archivo']) ?>">
                            <p>📌 <strong><?= $entrega['nombre'] ?></strong></p>
                            <a href="<?= $entrega['archivo'] ?>" download>📥 Descargar tarea</a>
                            <button onclick="eliminarEntrega('<?= $entrega['archivo'] ?>')">🗑️ Eliminar Entrega</button>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p>🚫 Aún no hay entregas.</p>
            <?php endif; ?>
        </li>
    <?php endforeach; ?>
</ul>

<a href="logout.php">Salir</a>

<script>
function eliminarTarea(tareaId) {
    if (!confirm('¿Seguro que quieres eliminar esta tarea y sus entregas?')) return;

    fetch('eliminar_tarea.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'tarea_id=' + tareaId
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('tarea-' + tareaId).remove();
        } else {
            alert('Error al eliminar la tarea.');
        }
    });
}

function eliminarEntrega(archivo) {
    if (!confirm('¿Seguro que quieres eliminar esta entrega?')) return;

    fetch('eliminar_entrega.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'archivo=' + encodeURIComponent(archivo)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload(); // 🔄 Recarga la página después de eliminar
        } else {
            alert('Error al eliminar la entrega.');
        }
    });
}
</script>