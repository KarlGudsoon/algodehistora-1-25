<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");

$tarea_id = $_POST['tarea_id'];
$nombre_estudiante = $_POST['nombre_estudiante'];

$directorio = "uploads/";
$archivo_nombre = basename($_FILES["archivo"]["name"]);
$ruta = $directorio . time() . "_" . $archivo_nombre;

if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $ruta)) {
    $sql = "INSERT INTO entregas (tarea_id, nombre_estudiante, archivo) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iss", $tarea_id, $nombre_estudiante, $ruta);
    $stmt->execute();

    echo "Tarea subida con éxito.";
} else {
    echo "Error al subir la tarea.";
}
?>
