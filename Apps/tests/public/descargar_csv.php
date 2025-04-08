<?php
$servername = "localhost"; 
$username = "algodehi_adrian"; 
$password = "1qa2ws3ed123"; 
$database = "algodehi_tests"; 

// Conectar a MySQL
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Verificar si se recibe el nombre de la tabla
if (isset($_POST['tabla'])) {
    $tabla = $_POST['tabla'];

    // Validar que la tabla exista
    $sql_check = "SHOW TABLES LIKE '$tabla'";
    $result_check = $conn->query($sql_check);
    
    if ($result_check->num_rows == 0) {
        die("Error: La tabla no existe.");
    }

    // Obtener datos de la tabla
    $sql = "SELECT * FROM $tabla";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Definir nombre del archivo CSV
        $filename = $tabla . "_datos.csv";

        // Encabezados para forzar la descarga
        header("Content-Type: text/csv; charset=UTF-8");
        header("Content-Disposition: attachment; filename=$filename");

        // Abrir la salida estándar como archivo
        $output = fopen("php://output", "w");

        // **IMPORTANTE**: Agregar BOM UTF-8 para que Excel reconozca caracteres especiales
        fprintf($output, "\xEF\xBB\xBF");

        // Obtener nombres de columnas
        $columnas = array_keys($result->fetch_assoc());
        fputcsv($output, $columnas, ";"); // Separador ";"

        // Volver al inicio de los datos
        $result->data_seek(0);

        // Escribir filas al CSV
        while ($row = $result->fetch_assoc()) {
            fputcsv($output, $row, ";");
        }

        fclose($output);
    } else {
        die("Error: La tabla no tiene datos.");
    }
} else {
    die("Error: No se especificó ninguna tabla.");
}

$conn->close();
?>
