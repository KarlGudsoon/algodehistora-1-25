<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

$userId = $_SESSION['user_id'];

$stmt = $pdo->prepare('SELECT carta_slug, fecha_obtenida FROM usuario_cartas WHERE user_id = ?');
$stmt->execute([$userId]);
$cartas = $stmt->fetchAll();

$stmt = $pdo->prepare('SELECT pais_slug, fecha_obtenida FROM usuario_paises WHERE user_id = ?');
$stmt->execute([$userId]);
$paises = $stmt->fetchAll();

echo json_encode([
    'cartas' => $cartas,
    'paises' => $paises,
]);