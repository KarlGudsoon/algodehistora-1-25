<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

$userId = $_SESSION['user_id'];

$stmt = $pdo->prepare('SELECT name, email, created_at FROM usuarios WHERE id = ?');
$stmt->execute([$userId]);
$usuario = $stmt->fetch();

if (!$usuario) {
    http_response_code(404);
    die(json_encode(['error' => 'Usuario no encontrado']));
}

echo json_encode(['usuario' => $usuario]);