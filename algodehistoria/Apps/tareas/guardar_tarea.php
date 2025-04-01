<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");

$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$fecha_limite = $_POST['fecha_limite'];

$sql = "INSERT INTO tareas (titulo, descripcion, fecha_limite) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sss", $titulo, $descripcion, $fecha_limite);
$stmt->execute();

header("Location: ver_entregas.php");
?>
