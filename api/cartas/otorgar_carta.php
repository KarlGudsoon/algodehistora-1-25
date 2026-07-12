<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Método no permitido']));
}

$data = json_decode(file_get_contents('php://input'), true);
$slug = trim($data['slug'] ?? '');

if (empty($slug)) {
    http_response_code(400);
    die(json_encode(['error' => 'Falta el slug de la carta']));
}

// Verificar si el usuario ya tiene esta carta
$stmt = $pdo->prepare('SELECT id FROM usuario_cartas WHERE user_id = ? AND carta_slug = ?');
$stmt->execute([$_SESSION['user_id'], $slug]);

if ($stmt->fetch()) {
    echo json_encode(['message' => 'Ya tienes esta carta', 'nueva' => false]);
    exit;
}

// Otorgar la carta
$stmt = $pdo->prepare('INSERT INTO usuario_cartas (user_id, carta_slug) VALUES (?, ?)');
$stmt->execute([$_SESSION['user_id'], $slug]);

echo json_encode(['message' => 'Carta obtenida', 'nueva' => true]);