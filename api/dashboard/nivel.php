<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';
require __DIR__ . '/../includes/xp_helper.php';

header('Content-Type: application/json');

$userId = $_SESSION['user_id'];

$stmt = $pdo->prepare('SELECT xp_total FROM usuario_experiencia WHERE user_id = ?');
$stmt->execute([$userId]);
$fila = $stmt->fetch();

$xpTotal = $fila ? (int) $fila['xp_total'] : 0;

echo json_encode(calcularNivel($xpTotal));