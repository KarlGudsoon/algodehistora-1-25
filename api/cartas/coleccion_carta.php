<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

$stmt = $pdo->prepare('SELECT carta_slug, fecha_obtenida FROM usuario_cartas WHERE user_id = ?');
$stmt->execute([$_SESSION['user_id']]);
$coleccion = $stmt->fetchAll();

echo json_encode(['coleccion' => $coleccion]);