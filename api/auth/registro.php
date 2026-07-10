<?php
require __DIR__ . '/../config/session_config.php';
require __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

// Solo aceptar peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Método no permitido']));
}

// Leer los datos enviados en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$name = trim($data['name'] ?? '');

// Validaciones básicas
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    die(json_encode(['error' => 'El correo electrónico no es válido']));
}

if (strlen($password) < 8) {
    http_response_code(400);
    die(json_encode(['error' => 'La contraseña debe tener al menos 8 caracteres']));
}

if (empty($name)) {
    http_response_code(400);
    die(json_encode(['error' => 'El nombre es obligatorio']));
}

// Verificar si el correo ya existe
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);

if ($stmt->fetch()) {
    http_response_code(409);
    die(json_encode(['error' => 'Este correo ya está registrado']));
}

// Crear el hash seguro de la contraseña
$passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// Insertar el nuevo usuario
$stmt = $pdo->prepare('INSERT INTO usuarios (email, password_hash, name) VALUES (?, ?, ?)');
$stmt->execute([$email, $passwordHash, $name]);
$userId = $pdo->lastInsertId();

// Iniciar sesión automáticamente después de registrarse
session_start();
session_regenerate_id(true); // previene ataques de fijación de sesión

$_SESSION['user_id'] = $userId;
$_SESSION['email'] = $email;
$_SESSION['name'] = $name;

http_response_code(201);
echo json_encode([
    'message' => 'Cuenta creada exitosamente',
    'user' => [
        'id' => $userId,
        'email' => $email,
        'name' => $name,
    ]
]);