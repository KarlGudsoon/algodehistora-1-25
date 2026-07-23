<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';
require __DIR__ . '/../includes/xp_helper.php'; 

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$slug = trim($data['slug'] ?? '');

if (empty($slug)) {
    http_response_code(400);
    die(json_encode(['error' => 'Falta el slug del país']));
}

$stmt = $pdo->prepare('SELECT id FROM usuario_paises WHERE user_id = ? AND pais_slug = ?');
$stmt->execute([$_SESSION['user_id'], $slug]);

if ($stmt->fetch()) {
    echo json_encode(['message' => 'Ya tienes este país', 'nueva' => false]);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO usuario_paises (user_id, pais_slug) VALUES (?, ?)');
$stmt->execute([$_SESSION['user_id'], $slug]);

$xpGanado = otorgarXP($pdo, $_SESSION['user_id'], 'pais_obtenido', $slug);

echo json_encode([
    'message' => 'País obtenido', 
    'nueva' => true,
    'xp_ganado' => $xpGanado,
]);