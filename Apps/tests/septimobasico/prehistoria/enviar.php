<h1>
    <?php

    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $nota = $_POST['resultado'];

    $conexion = mysqli_connect("localhost", "root", "", "cuestionario");

    if (!$conexion) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    $consulta = "INSERT INTO prehistoria (nombre, apellidos, nota) VALUES ('$nombre', '$apellidos', $nota)";

    $resultado = mysqli_query($conexion, $consulta);

    if ($resultado) {
        echo 'Cuestionario finalizado';
    } else {
        echo 'Error al insertar: ' . mysqli_error($conexion);
    }

    mysqli_close($conexion);

    ?>
</h1>

<style>
    @font-face {
    font-family: Roboto;
    src: url("/fonts/RobotoSlab-Regular.ttf")
      format("truetype");
    }

    :root {
        background-color: #e92a41;
    }
    
    body {
        display: grid;
        place-content: center;
    }

    h1 {
        font-family: Roboto;
        color: white;
    }
</style>
