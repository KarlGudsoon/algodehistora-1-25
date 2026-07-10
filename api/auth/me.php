<?php
require __DIR__ . '/../config/session_config.php';

header('Content-Type: application/json');

session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    die(json_encode(['error' => 'No hay sesión activa']));
}

echo json_encode([
    'user' => [
        'id' => $_SESSION['user_id'],
        'email' => $_SESSION['email'],
        'name' => $_SESSION['name'],
    ]
]);