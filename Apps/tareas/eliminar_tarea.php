<?php
header('Content-Type: application/json');
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");

$tarea_id = $_POST['tarea_id'];

// Borrar archivos de las entregas antes de eliminar registros
$resultado = $conexion->query("SELECT archivo FROM entregas WHERE tarea_id = $tarea_id");
while ($fila = $resultado->fetch_assoc()) {
    unlink($fila['archivo']);
}

// Eliminar entregas asociadas
$conexion->query("DELETE FROM entregas WHERE tarea_id = $tarea_id");

// Eliminar la tarea
if ($conexion->query("DELETE FROM tareas WHERE id = $tarea_id")) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
