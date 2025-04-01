<?php

$usuario = isset($_POST['txt_usuario']) ? $_POST['txt_usuario'] : '';
$respuesta = isset($_POST['txt_respuesta']) ? $_POST['txt_respuesta'] : '';

try {

    $conexion = new PDO("mysql:host=localhost;port=3306;dbname=prehistoria", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $pdo = $conexion->prepare('INSERT INTO respuestas(usuario, respuesta) VALUES(?, ?)');
    $pdo->bindParam(1, $usuario);
    $pdo->bindParam(2, $respuesta);
    $pdo->execute() or die(print($pdo->errorInfo()));

    echo json_encode('true');

} catch(PDOException $error) {
    echo $error->getMessage();
    die();
}