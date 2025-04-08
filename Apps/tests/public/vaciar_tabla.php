<?php
$servername = "localhost"; 
$username = "algodehi_adrian"; 
$password = "1qa2ws3ed123"; 
$database = "algodehi_tests"; 

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if (isset($_POST['tabla'])) {
    $tabla = $_POST['tabla'];

    // Validar que la tabla exista
    $sql_check = "SHOW TABLES LIKE '$tabla'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows == 0) {
        die("Error: La tabla no existe.");
    }

    // Vaciar la tabla
    $sql = "TRUNCATE TABLE $tabla";
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('✅ La tabla \"$tabla\" ha sido vaciada correctamente.'); window.location.href='bienvenido.php';</script>";
    } else {
        echo "Error al vaciar la tabla: " . $conn->error;
    }
} else {
    echo "Error: No se especificó ninguna tabla.";
}

$conn->close();
?>
