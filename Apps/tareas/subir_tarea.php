<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

error_reporting(E_ALL);
ini_set('display_errors', 0); // En API los errores van en JSON, no en pantalla

// Función helper para responder
function responder($success, $mensaje, $data = null, $codigo = 200) {
    http_response_code($codigo);
    echo json_encode([
        'success' => $success,
        'mensaje' => $mensaje,
        'data'    => $data
    ]);
    exit;
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido.', null, 405);
}

// Validar campos requeridos
if (empty($_POST['tarea_id']) || empty($_POST['nombre_estudiante'])) {
    responder(false, 'Faltan campos requeridos: tarea_id, nombre_estudiante.', null, 400);
}

if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
    responder(false, 'Error al recibir el archivo.', null, 400);
}

// Conexión
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_luminary");
if ($conexion->connect_error) {
    responder(false, 'Error de conexión a la base de datos.', null, 500);
}

// Datos
$tarea_id          = intval($_POST['tarea_id']);
$nombre_estudiante = trim($_POST['nombre_estudiante']);
$directorio        = "uploads/";
$archivo_nombre    = basename($_FILES["archivo"]["name"]);
$ruta              = $directorio . time() . "_" . $archivo_nombre;

// Subir archivo
if (!move_uploaded_file($_FILES["archivo"]["tmp_name"], $ruta)) {
    responder(false, 'No se pudo guardar el archivo en el servidor.', null, 500);
}

// Insertar en BD
$sql  = "INSERT INTO entregas (tarea_id, nombre_estudiante, archivo) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    responder(false, 'Error al preparar la consulta.', null, 500);
}

$stmt->bind_param("iss", $tarea_id, $nombre_estudiante, $ruta);

if ($stmt->execute()) {
    responder(true, 'Tarea subida con éxito.', [
        'entrega_id'        => $stmt->insert_id,
        'tarea_id'          => $tarea_id,
        'nombre_estudiante' => $nombre_estudiante,
        'archivo'           => $ruta
    ], 201);
} else {
    responder(false, 'Error al guardar en la base de datos.', null, 500);
}
?>