<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user["password"])) {
            $_SESSION["usuario"] = $user["nombre"];
            header("Location: bienvenido.php");
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }
}
?>

<!DOCTYPE html>


<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>

<link rel="stylesheet" href="/index.css">

<style>

    html {
        height: 100%;
        width: 100%;
    }
    
    body {
        margin: 0;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    
    header {
        position: fixed;
        top: 0;
    }
    
    main {
        margin: 1rem;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgb(0, 0, 0, 0.25);
    }
    
    main h2 {
        margin: 0;
        font-size: 2rem;
    }
    
</style>

<header>
      <img src="/icons/logo.svg">
      <nav>
        <ul>
          <li><a href="/index.html">Inicio</a></li>
          <li><a href="#articulos">Articulos</a></li>
          <li><a href="#aplicaciones">Aplicaciones</a></li>
          <li><a href="#acerca-de">Acerca de</a></li>
        </ul>
      </nav>
</header>

<body>
    <main>
        <h2>Iniciar Sesión</h2>
        <form action="" method="POST">
            Email: <input type="email" name="email" required><br>
            Contraseña: <input type="password" name="password" required><br>
            <button type="submit">Ingresar</button>
        </form>
    </main>
</body>
</html>
