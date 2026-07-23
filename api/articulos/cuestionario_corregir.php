<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';
require __DIR__ . '/../middlewares/auth_check.php';
require __DIR__ . '/../includes/xp_helper.php'; 

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$slug = trim($data['articulo_slug'] ?? '');
$respuestas = $data['respuestas'] ?? [];

if (empty($slug) || empty($respuestas)) {
    http_response_code(400);
    die(json_encode(['error' => 'Datos inválidos']));
}

$stmt = $pdo->prepare('SELECT id FROM articulos WHERE slug = ?');
$stmt->execute([$slug]);
$articulo = $stmt->fetch();

if (!$articulo) {
    http_response_code(404);
    die(json_encode(['error' => 'Artículo no encontrado']));
}

$articuloId = $articulo['id'];

$stmt = $pdo->prepare('SELECT orden, respuesta_correcta FROM cuestionario_preguntas WHERE articulo_id = ?');
$stmt->execute([$articuloId]);
$preguntasCorrectas = $stmt->fetchAll();

$cantidadCorrectas = 0;
foreach ($preguntasCorrectas as $p) {
    $ordenStr = (string) $p['orden'];
    if (isset($respuestas[$ordenStr]) && (int) $respuestas[$ordenStr] === (int) $p['respuesta_correcta']) {
        $cantidadCorrectas++;
    }
}

function obtenerNota($puntaje) {
    $tabla = [
        ['puntaje' => 0, 'nota' => 2],
        ['puntaje' => 1, 'nota' => 2.7],
        ['puntaje' => 2, 'nota' => 3.3],
        ['puntaje' => 3, 'nota' => 4],
        ['puntaje' => 4, 'nota' => 5.5],
        ['puntaje' => 5, 'nota' => 7],
    ];
    for ($i = 0; $i < count($tabla) - 1; $i++) {
        $p1 = $tabla[$i];
        $p2 = $tabla[$i + 1];
        if ($puntaje >= $p1['puntaje'] && $puntaje <= $p2['puntaje']) {
            $t = ($puntaje - $p1['puntaje']) / ($p2['puntaje'] - $p1['puntaje']);
            return round($p1['nota'] + $t * ($p2['nota'] - $p1['nota']), 1);
        }
    }
    return null;
}

$nota = obtenerNota($cantidadCorrectas);
$aprobado = $nota >= 4 ? 1 : 0;

$stmt = $pdo->prepare('
    INSERT INTO articulo_completado (user_id, articulo_id, nota, aprobado)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        nota = VALUES(nota), 
        aprobado = VALUES(aprobado),
        fecha_completado = CURRENT_TIMESTAMP
');
$stmt->execute([$_SESSION['user_id'], $articuloId, $nota, $aprobado]);

$correctasPorOrden = [];
foreach ($preguntasCorrectas as $p) {
    $correctasPorOrden[$p['orden']] = $p['respuesta_correcta'];
}

$xpGanado = 0;
if ($aprobado) {
    $xpGanado = otorgarXP($pdo, $_SESSION['user_id'], 'articulo_completado', (string) $articuloId);

    if ($nota == 7) {
        $xpGanado += otorgarXP($pdo, $_SESSION['user_id'], 'articulo_completado_nota_perfecta', (string) $articuloId);
    }
}

echo json_encode([
    'cantidad_correctas' => $cantidadCorrectas,
    'nota' => $nota,
    'aprobado' => (bool) $aprobado,
    'respuestas_correctas' => $correctasPorOrden,
    'xp_ganado' => $xpGanado
]);