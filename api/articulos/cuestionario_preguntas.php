<?php
require __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$slug = trim($_GET['articulo_slug'] ?? '');
if (empty($slug)) {
    http_response_code(400);
    die(json_encode(['error' => 'Falta articulo_slug']));
}

// Primero obtenemos el id del artículo a partir del slug
$stmt = $pdo->prepare('SELECT id FROM articulos WHERE slug = ?');
$stmt->execute([$slug]);
$articulo = $stmt->fetch();

if (!$articulo) {
    http_response_code(404);
    die(json_encode(['error' => 'Artículo no encontrado']));
}

$stmt = $pdo->prepare('
    SELECT id, orden, pregunta, opcion_1, opcion_2, opcion_3, opcion_4
    FROM cuestionario_preguntas
    WHERE articulo_id = ?
    ORDER BY orden ASC
');
$stmt->execute([$articulo['id']]);
$preguntas = $stmt->fetchAll();

echo json_encode(['preguntas' => $preguntas]);