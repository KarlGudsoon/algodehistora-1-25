<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';

header('Content-Type: application/json');

$userId = $_SESSION['user_id'];

// Total de artículos existentes
$totalArticulos = $pdo->query('SELECT COUNT(*) as total FROM articulos')->fetch()['total'];

// Artículos completados (aprobados) por el usuario
$stmt = $pdo->prepare('SELECT COUNT(*) as completados FROM articulo_completado WHERE user_id = ? AND aprobado = 1');
$stmt->execute([$userId]);
$completados = $stmt->fetch()['completados'];

// Historial completo: notas por artículo, con título y slug
$stmt = $pdo->prepare('
    SELECT a.slug, a.titulo, ac.nota, ac.aprobado, ac.fecha_completado
    FROM articulo_completado ac
    JOIN articulos a ON a.id = ac.articulo_id
    WHERE ac.user_id = ?
    ORDER BY ac.fecha_completado DESC
');
$stmt->execute([$userId]);
$historial = $stmt->fetchAll();

echo json_encode([
    'progreso' => [
        'articulos_completados' => (int) $completados,
        'articulos_totales' => (int) $totalArticulos,
    ],
    'historial_articulos' => $historial,
]);