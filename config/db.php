<?php
// Config fuera del árbol público si tu hosting lo permite (mejor aún: un nivel atrás de public_html)
$host = 'localhost';
$db   = 'tu_basededatos';
$user = 'tu_usuario';
$pass = 'tu_password';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(['error' => 'Error de conexión a la base de datos']));
}