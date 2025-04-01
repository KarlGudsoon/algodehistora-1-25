<?php
$servidor = "localhost";
$usuario = "algodehi_adrian";  // Cambia si tienes un usuario diferente
$password = "1qa2ws3ed123";
$base_datos = "algodehi_usuarios";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
