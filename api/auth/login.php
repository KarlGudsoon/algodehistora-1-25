<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Método no permitido']));
}

$data = json_decode(file_get_contents('php://input'), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    die(json_encode(['error' => 'Correo y contraseña son obligatorios']));
}

$stmt = $pdo->prepare('SELECT * FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    die(json_encode(['error' => 'Correo o contraseña incorrectos']));
}

session_start();
session_regenerate_id(true);

$_SESSION['user_id'] = $user['id'];
$_SESSION['email'] = $user['email'];
$_SESSION['name'] = $user['name'];

echo json_encode([
    'message' => 'Sesión iniciada correctamente',
    'user' => [
        'id' => $user['id'],
        'email' => $user['email'],
        'name' => $user['name'],
    ]
]);