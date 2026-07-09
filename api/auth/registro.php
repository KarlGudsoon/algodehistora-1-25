<?php
require './config/db.php'; // ajustá la ruta según dónde lo pongas

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://tudominio.com');
header('Access-Control-Allow-Credentials: true');

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$name = trim($data['name'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    http_response_code(400);
    die(json_encode(['error' => 'Email válido y password de mínimo 8 caracteres requeridos']));
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    http_response_code(409);
    die(json_encode(['error' => 'El email ya está registrado']));
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

$stmt = $pdo->prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
$stmt->execute([$email, $hash, $name ?: null]);
$userId = $pdo->lastInsertId();

// Iniciar sesión igual que en login
session_start();
session_regenerate_id(true); // previene session fixation
$_SESSION['user_id'] = $userId;
$_SESSION['email'] = $email;

echo json_encode(['message' => 'Usuario creado', 'user' => ['id' => $userId, 'email' => $email, 'name' => $name]]);