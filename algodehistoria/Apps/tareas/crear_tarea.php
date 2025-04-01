<form action="guardar_tarea.php" method="POST">
    <input type="text" name="titulo" placeholder="Título de la tarea" required>
    <textarea name="descripcion" placeholder="Descripción de la tarea" required></textarea>
    <input type="date" name="fecha_limite" required>
    <button type="submit">Crear Tarea</button>
</form>
