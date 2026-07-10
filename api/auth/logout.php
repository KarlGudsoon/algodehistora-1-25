<?php
require __DIR__ . '/../config/session_config.php';

header('Content-Type: application/json');

session_start();
$_SESSION = [];
session_destroy();

// Elimina también la cookie del navegador
setcookie(session_name(), '', time() - 3600, '/');

echo json_encode(['message' => 'Sesión cerrada correctamente']);