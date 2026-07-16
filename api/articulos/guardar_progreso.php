<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$articuloSlug = trim($data['articulo_slug'] ?? '');
$nota = $data['nota'] ?? null;

if (empty($articuloSlug) || $nota === null || !is_numeric($nota)) {
    http_response_code(400);
    die(json_encode(['error' => 'Datos inválidos']));
}

$nota = (float) $nota;
$aprobado = $nota >= 4 ? 1 : 0;

$stmt = $pdo->prepare("
    INSERT INTO articulo_completado (user_id, articulo_slug, nota, aprobado)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        nota = VALUES(nota), 
        aprobado = VALUES(aprobado),
        fecha_completado = CURRENT_TIMESTAMP
");
$stmt->execute([$_SESSION['user_id'], $articuloSlug, $nota, $aprobado]);

echo json_encode([
    'message' => 'Resultado guardado',
    'nota' => $nota,
    'aprobado' => (bool) $aprobado,
]);