<?php
$servername = "localhost"; 
$username = "algodehi_adrian"; 
$password = "1qa2ws3ed123"; 
$database = "algodehi_tests"; 

// Conexión a MySQL
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener todas las tablas
$sql = "SHOW TABLES";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Tablas en la base de datos: $database</h2>";
    
    while ($row = $result->fetch_array()) {
        $tabla = $row[0];
        echo "<h3>Tabla: $tabla</h3>";

        // Botón para descargar CSV
        echo "<button onclick='descargarCSV(\"$tabla\")'>📥 Descargar CSV</button>";

        // Botón para vaciar la tabla (con confirmación)
        echo "<button onclick='vaciarTabla(\"$tabla\")'>🗑️ Vaciar Tabla</button>";

        // Obtener los datos de la tabla
        $sql_data = "SELECT * FROM $tabla ORDER BY 1 ASC"; 
        $result_data = $conn->query($sql_data);

        if ($result_data->num_rows > 0) {
            echo "<table border='1' cellpadding='5' cellspacing='0'>";
            echo "<tr>";

            // Obtener nombres de columnas
            $columnas = array_keys($result_data->fetch_assoc());
            foreach ($columnas as $columna) {
                echo "<th>$columna</th>";
            }
            echo "</tr>";

            // Volver al inicio de los resultados
            $result_data->data_seek(0);

            // Mostrar los datos de la tabla
            while ($fila = $result_data->fetch_assoc()) {
                echo "<tr>";
                foreach ($columnas as $columna) {
                    echo "<td>" . htmlspecialchars($fila[$columna]) . "</td>";
                }
                echo "</tr>";
            }
            echo "</table><br>";
        } else {
            echo "<p>No hay datos en esta tabla.</p>";
        }
    }
} else {
    echo "<h2>No hay tablas en la base de datos.</h2>";
}

$conn->close();
?>

<!-- JavaScript para descargar CSV y vaciar tabla -->
<script>
function descargarCSV(tabla) {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "descargar_csv.php";

    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "tabla";
    input.value = tabla;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function vaciarTabla(tabla) {
    if (confirm("¿Estás seguro de que deseas vaciar la tabla " + tabla + "? Esta acción no se puede deshacer.")) {
        let form = document.createElement("form");
        form.method = "POST";
        form.action = "vaciar_tabla.php";

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "tabla";
        input.value = tabla;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
}
</script>