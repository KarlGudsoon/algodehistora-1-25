<?php
header('Content-Type: application/json');
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_tareas");

$archivo = $_POST['archivo'];

// Eliminar el archivo del servidor
if (file_exists($archivo)) {
    unlink($archivo);
}

// Eliminar la entrega de la base de datos
$sql = "DELETE FROM entregas WHERE archivo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $archivo);
$success = $stmt->execute();

echo json_encode(["success" => $success]);
?>
