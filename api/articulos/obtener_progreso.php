<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

$slug = trim($_GET['articulo_slug'] ?? '');
if (empty($slug)) {
    http_response_code(400);
    die(json_encode(['error' => 'Falta articulo_slug']));
}

$stmt = $pdo->prepare('SELECT id FROM articulos WHERE slug = ?');
$stmt->execute([$slug]);
$articulo = $stmt->fetch();

if (!$articulo) {
    http_response_code(404);
    die(json_encode(['error' => 'Artículo no encontrado']));
}

$stmt = $pdo->prepare('
    SELECT nota, aprobado, fecha_completado 
    FROM articulo_completado 
    WHERE user_id = ? AND articulo_id = ?
');
$stmt->execute([$_SESSION['user_id'], $articulo['id']]);
$resultado = $stmt->fetch();

if (!$resultado) {
    echo json_encode(['resultado' => null]);
    exit;
}

// Si ya existe un resultado, traemos también las respuestas correctas
// para poder reconstruir el resumen sin volver a rendir el cuestionario
$stmt = $pdo->prepare('SELECT orden, respuesta_correcta FROM cuestionario_preguntas WHERE articulo_id = ?');
$stmt->execute([$articulo['id']]);
$preguntasCorrectas = $stmt->fetchAll();

$correctasPorOrden = [];
foreach ($preguntasCorrectas as $p) {
    $correctasPorOrden[$p['orden']] = $p['respuesta_correcta'];
}

echo json_encode([
    'resultado' => [
        'nota' => $resultado['nota'],
        'aprobado' => (bool) $resultado['aprobado'],
        'fecha_completado' => $resultado['fecha_completado'],
        'respuestas_correctas' => $correctasPorOrden,
    ]
]);