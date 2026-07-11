<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

require_once __DIR__ . '/../luminary/conexion.php'; // conexión a la BD luminary

// Verificar rol
if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    header("Location: /Apps/luminary/index.html");
    exit;
}

$conexion_tareas = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_luminary");

if ($conexion_tareas->connect_error) {
    die("❌ Error al conectar con la base de datos de tareas: " . $conexion_tareas->connect_error);
}
$conexion_tareas->set_charset("utf8");

// Luego usa $conexion_tareas en tus consultas de tareas
$resultado = $conexion_tareas->query("
    SELECT 
        tareas.id AS tarea_id,
        tareas.titulo,
        tareas.fecha_limite,

        -- datos del curso (nueva tabla)
        cursos.nivel,
        cursos.letra,

        -- datos de las entregas
        entregas.nombre_estudiante,
        entregas.archivo,
        entregas.revisado,
        entregas.nota

    FROM tareas
    LEFT JOIN cursos ON tareas.curso_id = cursos.id
    LEFT JOIN entregas ON tareas.id = entregas.tarea_id

    ORDER BY cursos.nivel, cursos.letra, tareas.id, entregas.id
");


$tareas_por_curso = [];

while ($fila = $resultado->fetch_assoc()) {

    // Crear nombre del curso basado en nivel y letra
    $curso = $fila['nivel'] . ' ' . $fila['letra'];
    $tarea_id = $fila['tarea_id'];

    // Crear el grupo del curso si no existe
    if (!isset($tareas_por_curso[$curso])) {
        $tareas_por_curso[$curso] = [];
    }

    // Crear el grupo de la tarea dentro del curso si no existe
    if (!isset($tareas_por_curso[$curso][$tarea_id])) {
        $tareas_por_curso[$curso][$tarea_id] = [
            'titulo' => $fila['titulo'],
            'fecha_limite' => $fila['fecha_limite'],
            'entregas' => []
        ];
    }

    // Añadir entrega si existe
    if (!empty($fila['nombre_estudiante'])) {
        $tareas_por_curso[$curso][$tarea_id]['entregas'][] = [
            'nombre' => $fila['nombre_estudiante'],
            'archivo' => $fila['archivo'],
            'nota' => $fila['nota'],
            'revisado' => (bool)$fila['revisado']
        ];
    }
}

?>

<link rel="stylesheet" href="/index.css">

<style>
    body {
        margin: 0;
        background: #1d1d1d;
        color: white;
        display: flex;
        height: 100vh;
    }
    
    aside {
        width: 175px;
        background: #232323;
        margin: 1rem 0rem 1rem 1rem;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
    }
    
    .contenedor-logo-footer {
        height: 50px;
        justify-content: center;
    }
    
    .contenedor-logo-footer img {
        z-index: 0;
        display: block;
    }
    
    .contenedor-logo-footer span:after {
        background: #232323;
    }
    
    .contenedor-logo-footer span:before {
        background: #232323;
    }
    
    .icon {
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .icon img {
        width: 90%;
        height: 90%;
    }
    
    main {
        margin: 0;
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 1rem;
    }
        
        /* Aplica a todo el documento */
    ::-webkit-scrollbar {
      width: 8px; /* ancho de la barra vertical */
      height: 8px; /* alto de la barra horizontal */
      
    }
    
    /* Fondo de la barra */
    ::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 10px;
    }
    
    /* Barra que se mueve */
    ::-webkit-scrollbar-thumb {
      background-color: #424141;
      border-radius: 10px;
      width: 5px;
    }
    
    /* Hover sobre la barra */
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
    
    .contenedor-tareas {
        display: flex;
        gap: 1rem;
        flex: 1;
    }

    #lista-tareas {
        width: auto;
        list-style: none;
        overflow: auto;
    }
    
    #lista-tareas ul {
        list-style: none;
        padding: 0;
    }
    
    #detalle-tarea {
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
        width: auto;
        height: auto;
        background: #232323;
        overflow: auto;
        padding: 2rem;
        color: white;
        flex: 1;
    }
    
    .panel-lateral {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
    }

    .tarea {
        padding: 10px;
        margin: 1rem 0;
        background-color: #333333;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
        transition: 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        outline: 1px solid transparent;
        outline-offset: 0px;
    }

    .tarea:hover {
        scale: 1.025;
        filter: brightness(110%);
        outline: 1px solid rgba(255 255 255 / 75%);
        outline-offset: 3px;
    }
    
    .tarea:active {
        scale: 1;
    }
    
    .tarea.active {
        outline: 1px solid white;
        outline-offset: 0px;
        scale: 1.025;
    }
    
    .tarea.active:hover {
        
    }
    
    .tarea button {
        min-width: 50px;
        min-height: 50px;
        padding: .5rem;
        display: block;
    }
    
    #curso-tarea {
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        color: white;
    }
    
    .fecha-limite {
        
    }

    .entrega-item {
        border-radius: 8px;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
        display: flex;
        align-items: center;
        height: 100px;
        gap: 1rem;
        justify-content: space-between;
        overflow: hidden;
        background: #333333;
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    
    .entrega-item.revisada {
        background-color: #05713e !important;
    }
    
    .checkbox-personalizado {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      gap: 8px;
      user-select: none;
      font-family: Arial, sans-serif;
    }
    
    .checkbox-personalizado input {
      display: none; /* Oculta el checkbox real */
    }
    
    .checkbox-personalizado .checkmark {
      width: 25px;
      height: 25px;
      border: 2px solid #ccc;
      border-radius: 100%;
      display: flex;
      margin: 0 2rem;
      justify-content: center;
      align-items: center;
      position: relative;
      background: rbga(0 0 0 / 20%);
      transition: all 0.2s ease;
    }
    
    .checkbox-personalizado input:checked + .checkmark {
      background-color: #00c853;
      border-color: #00c853;
    }
    
    .checkbox-personalizado .checkmark::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      opacity: 0;
      transform: rotate(45deg);
      transition: opacity 0.2s ease;
    }
    
    .checkbox-personalizado input:checked + .checkmark::after {
      opacity: 1;
    }


    .entrega-item .eliminar {
        background: #e92a41;
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    
    .entrega-item .eliminar:hover {
        filter: brightness(90%);
    }
    
    
    .entrega-item.eliminando {
        opacity: 0;
        transform: translateX(20px);
    }

    .curso-bloque {
        margin-bottom: 1rem;
        border: 1px solid rgba(255 255 255 / 0.35);
        border-radius: 1rem;
        padding: 1rem;
        background: #232323;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
    }

    .curso-titulo {
        margin: 0;
        font-size: 2rem;
        font-family: BreeSerif;
        text-transform: uppercase;
        color: white;
        border-radius: 1rem;
    }
    
    .link {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .link:hover {
        text-decoration: underline;
    }
    
    .link img {
        width: 20px;
        height: 20px;
    }
    
    .nota {
      width: 60px;
      height:40px;
      padding: 6px;
      border-radius: 8px;
      border: none;
      text-align: center;
      font-weight: bold;
      font-size: 1rem;
      font-family: Roboto;
      background: rgba(255 255 255 / 20%);
      color: white;
      transition: all 0.2s ease;
      outline: 2px solid rgba(255 255 255 / 35%);
    }
    
    .nota:focus {
      outline: 2px solid rgba(255 255 255 / 50%);
      background: rgba(255 255 255 / 15%);
    }
    
    .creador-tarea {
        padding: 1rem;
        border: 1px solid rgba(255 255 255 / 0.35);
        border-radius: 1rem;
        background: #232323;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
        min-height: 125px;
        display: flex;
        gap: 0.5rem;
    }
    
    .creador-tarea input {
        background: rgba(255 255 255 / 0.35);
        border: none;
        border-radius: 1rem;
        padding: 0.5rem;
        color: white;
        font-family: Roboto;
    }
    
    .creador-tarea select {
        background: #e92a41;
        border: none;
        border-radius: 1rem;
        padding: 0.5rem;
        color: white;
        font-family: Roboto;
        transition: .2s ease;
        box-shadow: 0 0 1rem rgba(0 0 0 / 0.35);
    }
    
    .creador-tarea select:hover {
        background: #c32235;
    }
    
    .creador-tarea select:focus {
        box-shadow: 0 0 0 2px rgba(255 255 255 / 20%);
        border: none;
        outline: none;
    }
    
    .creador-tarea select option {
        background: #e92a41;
        border: none;
        border-radius: 1rem;
        padding: 0.5rem;
        color: white;
        font-family: Roboto;
    }
    
    .creador-tarea select option:checked {
        background: #c2283a;
        color: white;
    }
    
    .creador-tarea textarea {
        background: rgba(255 255 255 / 0.35);
        border: none;
        border-radius: 1rem;
        padding: 0.5rem;
        color: white;
        font-family: Roboto;
        resize: none;
        height: 100%;
    }
    
    .creador-tarea textarea::placeholder {
        color: white;
    }
    
    .creador-tarea input::placeholder {
        color: white;
    }
    
        /* Estado dentro del <li> */
    .tarea-revisada {
        border-left: 6px solid #3cb371; /* verde */
       
    }
    
    .tarea-pendiente {
        border-left: 6px solid #f5a623; /* amarillo */
        
    }
    
    .tarea-sinentregas {
        border-left: 6px solid #999; /* gris */
        
    }
    
    /* El span opcional si quieres estilos adicionales */
    .estado-tarea {
        padding: 3px 6px;
        border-radius: 5px;
        opacity: .9;
    }


    
    /* === TOAST === */
    #toast {
        position: fixed;
        top: 25px;
        right: 25px;
        background: rgba(0,0,0,0.85);
        color: #fff;
        padding: 15px 20px;
        border-radius: 12px;
        font-family: Roboto;
        font-size: 0.95rem;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-20px);
        transition: opacity 0.4s ease, transform 0.4s ease;
        z-index: 9999;
    }
    
    #toast.show {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

</style>

<aside>
    <div>
        <div class="contenedor-logo-footer" onclick="window.location.href='/'">
            <span>
                <img class="logo" src="/svg/logo-dark.svg">
            </span>
        </div>
        
        <ul>
            <li>Inicio</li>
            <li><a href="/Apps/tareas/ver_entregas.php">Tareas</a></li>
            <li><a href="/Apps/luminary/tests/">Cuestionarios</a></li>
            <li><a href="/Apps/luminary/admin/agregar_estudiante.php">Estudiantes</a></li>
        </ul>
    </div>
    
    <a class="icon" href="/Apps/luminary/logout.php"><img src="/Apps/luminary/assets/assets/icons/tabler--logout.svg"></a>
    
</aside>

<main>
    <h1 style="padding: 0 1rem;">Lista de tareas</h1>
    <section style="display: flex; flex: 1; overflow: hidden;">
        <div class="contenedor-tareas">
            <!-- Lista de tareas agrupadas -->
            <div id="lista-tareas">
                <?php foreach ($tareas_por_curso as $curso => $tareas): ?>
                    <div class="curso-bloque">
                        <h3 class="curso-titulo">🏫 <?= htmlspecialchars($curso) ?></h3>
                        <ul>
                            <?php foreach ($tareas as $tarea_id => $tarea): ?>
                                <li id="tarea-<?= $tarea_id ?>" 
                                    class="tarea" 
                                    onclick="verEntregas('<?= $curso ?>', <?= $tarea_id ?>)">
                                    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                        <div style="display: flex; flex-direction: column;">
                                            <span class="fecha-limite"><?= htmlspecialchars($tarea['fecha_limite']) ?></span>
                                            <p style="margin: 0;"><?= htmlspecialchars($tarea['titulo']) ?></p>
                                            <div style="width: 100%; height: 1px; background: rgba(255 255 255 / 50%); margin: 5px 0;"></div>
                                            <div>
                                                <?php
                                                    $total_entregas = count($tarea['entregas']);
                                                    $revisadas = 0;
                                                    foreach ($tarea['entregas'] as $entrega) {
                                                        if (!empty($entrega['revisado']) && $entrega['revisado'] == 1) {
                                                            $revisadas++;
                                                        }
                                                    }
                                                    $pendientes = $total_entregas - $revisadas;
                                                ?>
                                                <span class="estado-tarea">
                                                    <?= ($pendientes > 0) ? '⏳ Pendiente' : '✅ Revisada' ?>
                                                </span>
                                            </div>
                                        </div>
                                        <a onclick="event.stopPropagation(); eliminarTarea(<?= $tarea_id ?>)" style="margin-left:10px; cursor:pointer;"><img src="/assets/icons/check.svg"></a>  
                                    </div>
                                    
                                    
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        
        
            <div class="panel-lateral">
                <form action="guardar_tarea.php" method="POST" class="creador-tarea">
                    <div style="display: flex; flex-direction: column; flex: 2; gap: 0.5rem;">
                        <input type="text" name="titulo" placeholder="Título de la tarea" required>
                        <textarea name="descripcion" placeholder="Descripción de la tarea" required></textarea> 
                    </div>
                    <div style="display: flex; flex-direction: column; flex: 1; gap: 0.5rem;">
                        <label style="width: fit-content;">
                            Curso:
                            <select name="curso" required>
                                <option value="1">1° Nivel A</option>
                                <option value="2">1° Nivel B</option>
                                <option value="10">2° Nivel D</option>
                            </select>
                        </label>
                        <input type="text" name="enlace" placeholder="Enlace">
                        <input type="date" name="fecha_limite" required>
                    </div>
                    
                    
                    
                    
                    
                    <button type="submit">Crear Tarea</button>
                </form>
            
                <div id="detalle-tarea">
                    
                    <span id="curso-tarea"></span>
                    <h3 id="titulo-tarea">Selecciona una tarea 👈</h3>
                    <div id="lista-entregas"></div>
                </div>
            </div>
        </div>
    </section>
    <div id="toast"></div>
</main>






<script>

function showToast(message, success = true) {
    const toast = document.getElementById("toast");

    toast.style.background = success ? "rgba(0, 150, 70, 0.9)" : "rgba(200, 20, 20, 0.9)";
    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

const tareasPorCurso = <?= json_encode($tareas_por_curso, JSON_UNESCAPED_UNICODE) ?>;

function verEntregas(curso, id) {
    const tarea = tareasPorCurso[curso][id];
    const contenedorDetalle = document.getElementById('detalle-tarea');
    const titulo = document.getElementById('titulo-tarea');
    const cursoDiv = document.getElementById('curso-tarea');
    const entregasDiv = document.getElementById('lista-entregas');

    contenedorDetalle.style.display = 'block';
    titulo.textContent = tarea.titulo;
    cursoDiv.textContent = curso;
    entregasDiv.innerHTML = '';
    
    if (curso.startsWith("1°")) {
    cursoDiv.style.backgroundColor = "#c2283a";
    } 
    else if (curso.startsWith("2°")) {
        cursoDiv.style.backgroundColor = "#10608f";
    } 
    else {
        cursoDiv.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    }
    
    if (tarea.entregas.length === 0) {
        entregasDiv.innerHTML = '<p>🚫 Aún no hay entregas para esta tarea.</p>';
        return;
    }

    tarea.entregas.forEach(e => {
    const item = document.createElement('div');
    item.classList.add('entrega-item');
    item.style.margin = '10px 0';
    if (e.revisado) item.classList.add('revisada');

    item.innerHTML = `
      <label class="checkbox-personalizado">
        <input 
          type="checkbox" 
          ${e.revisado ? 'checked' : ''} 
          onchange="actualizarRevisado('${e.archivo}', this.checked, this, '${curso}', ${id})""
        >
        <span class="checkmark"></span>
      </label>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <p><strong>${e.nombre}</strong></p>
          <div style="display: flex; gap: 10px;">
              <a class="link" href="${e.archivo}" target="_blank"><img src="/assets/icons/view.svg"> Ver entrega</a>
              <span>|</span>
              <a class="link" href="${e.archivo}" download><img src="/assets/icons/download.svg"> Descargar</a>
          </div>
      </div>
      <input 
          class="nota" 
          type="number" 
          step="0.1" 
          min="1" 
          max="7" 
          value="${e.nota ?? ''}" 
          placeholder="—"
          onchange="actualizarNota('${e.archivo}', this.value, this)"
        >
      <a class="eliminar" onclick="eliminarEntrega('${e.archivo}')">🗑</a>
    `;

    entregasDiv.appendChild(item);
});

}

function eliminarEntrega(archivo) {
    if (!confirm('¿Seguro que quieres eliminar esta entrega?')) return;

    fetch('eliminar_entrega.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'archivo=' + encodeURIComponent(archivo)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            showToast("❌ Error al eliminar la entrega", false);
            return;
        }

        showToast("🗑 Entrega eliminada correctamente");

        // Encontrar el bloque visual de la entrega
        const item = document.querySelector(`.entrega-item [onclick="eliminarEntrega('${archivo}')"]`)
                        ?.closest('.entrega-item');

        if (item) {

            // Animación CSS
            item.classList.add('eliminando');

            setTimeout(() => {

                item.remove();

                // Obtener curso y tarea actual desde los <div> de la vista
                const cursoActual = document.getElementById('curso-tarea').dataset.curso;
                const tareaIdActual = document.getElementById('titulo-tarea').dataset.tareaId;

                if (!cursoActual || !tareaIdActual) return;

                const tarea = tareasPorCurso[cursoActual][tareaIdActual];
                if (!tarea) return;

                // Remover la entrega dentro del arreglo JS
                tarea.entregas = tarea.entregas.filter(e => e.archivo !== archivo);

                // Recalcular estado interno
                const total = tarea.entregas.length;
                const revisadas = tarea.entregas.filter(e => e.revisado).length;
                const pendientes = total - revisadas;

                const liTarea = document.getElementById(`tarea-${tareaIdActual}`);
                if (!liTarea) return;

                const estadoSpan = liTarea.querySelector('.estado-tarea');
                if (!estadoSpan) return;

                // Limpiar clases previas
                liTarea.classList.remove("tarea-revisada", "tarea-pendiente", "tarea-sinentregas");

                // Aplicar estado segun la nueva lógica
                if (total === 0) {
                    estadoSpan.textContent = "📄 Sin entregas";
                    liTarea.classList.add("tarea-sinentregas");

                } else if (pendientes > 0) {
                    estadoSpan.textContent = "⏳ Pendiente";
                    liTarea.classList.add("tarea-pendiente");

                } else {
                    estadoSpan.textContent = "✅ Revisada";
                    liTarea.classList.add("tarea-revisada");
                }

            }, 400); // Debe coincidir con la animación CSS
        }

    })
    .catch(() => {
        showToast("❌ Error de conexión con el servidor", false);
    });
}




function eliminarTarea(tareaId) {
    if (!confirm('¿Seguro que quieres eliminar esta tarea y todas sus entregas?')) return;

    fetch('eliminar_tarea.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'tarea_id=' + encodeURIComponent(tareaId)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Eliminar visualmente la tarea de la lista
            const tareaElemento = document.getElementById('tarea-' + tareaId);
            if (tareaElemento) {
                tareaElemento.style.transition = "opacity 0.4s ease";
                tareaElemento.style.opacity = "0";
                setTimeout(() => tareaElemento.remove(), 400);
            }

            // Si el detalle abierto corresponde a la tarea eliminada → limpiar panel
            const tituloActual = document.getElementById('titulo-tarea').textContent.trim();
            if (tareaElemento && tituloActual === tareaElemento.querySelector('h4').textContent.trim()) {
                const detalle = document.getElementById('detalle-tarea');
                detalle.style.display = 'none';
                document.getElementById('titulo-tarea').textContent = 'Selecciona una tarea 👈';
                document.getElementById('lista-entregas').innerHTML = '';
            }
        } else {
            alert('❌ Error al eliminar la tarea.');
        }
    })
    .catch(() => alert('⚠️ Error de conexión con el servidor.'));
}

document.querySelectorAll(".curso-titulo").forEach(bloque => {
    const titulo = bloque.textContent.trim();

    if (titulo.includes("1°")) {
        bloque.style.backgroundColor = "#c2283a";
    } else if (titulo.includes("2°")) {
        bloque.style.backgroundColor = "#10608f";
    } else {
        bloque.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    }
});

function actualizarColorTarea(curso, tareaId) {
    const tarea = tareasPorCurso[curso][tareaId];
    if (!tarea) return;

    const total = tarea.entregas.length;
    const revisadas = tarea.entregas.filter(e => e.revisado).length;
    const pendientes = total - revisadas;

    const liTarea = document.getElementById(`tarea-${tareaId}`);
    if (!liTarea) return;

    const estadoSpan = liTarea.querySelector('.estado-tarea');
    if (!estadoSpan) return;

    // Limpiar clases anteriores
    liTarea.classList.remove("tarea-revisada", "tarea-pendiente", "tarea-sinentregas");

    if (total === 0) {
        // 🟦 Estado: Sin entregas
        estadoSpan.textContent = "📄 Sin entregas";
        liTarea.classList.add("tarea-sinentregas");

    } else if (pendientes > 0) {
        // 🟨 Estado: Pendiente
        estadoSpan.textContent = "⏳ Pendiente";
        liTarea.classList.add("tarea-pendiente");

    } else {
        // 🟩 Estado: Revisada
        estadoSpan.textContent = "✅ Revisada";
        liTarea.classList.add("tarea-revisada");
    }
}

function actualizarColoresIniciales() {
    for (const curso in tareasPorCurso) {
        for (const tareaId in tareasPorCurso[curso]) {
            actualizarColorTarea(curso, tareaId);
        }
    }
}


// ✅ Llamar al cargar la página
document.addEventListener("DOMContentLoaded", actualizarColoresIniciales);

document.querySelectorAll(".tarea").forEach(elemento => {
    elemento.addEventListener("click", () => {
        // Quita la clase "active" de todas las tareas
        document.querySelectorAll(".tarea.active").forEach(t => {
            t.classList.remove("active");
        });

        // Agrega la clase "active" solo al elemento clickeado
        elemento.classList.add("active");
    });
});



document.querySelectorAll(".fecha-limite").forEach(fechas => {
    let fechaOriginal = fechas.textContent.trim(); // ← .trim() por si hay espacios
    let fecha = new Date(fechaOriginal);

    const opciones = { day: "numeric", month: "long" };
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

    fechas.textContent = fechaFormateada;
});

function actualizarRevisado(archivo, revisado, checkbox, curso, tareaId) {
    const item = checkbox.closest('.entrega-item');

    fetch('actualizar_revisado.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'archivo=' + encodeURIComponent(archivo) + '&revisado=' + (revisado ? 1 : 0)
    })
    .then(r => r.json())
    .then(data => {
        if (!data.success) {
            alert('❌ No se pudo actualizar el estado de revisión.');
            checkbox.checked = !revisado;
            return;
        }

        // 🔁 Actualizar el dato local
        const tarea = tareasPorCurso[curso][tareaId];
        tarea.entregas.forEach(e => {
            if (e.archivo === archivo) e.revisado = revisado;
        });

        // 🎨 Cambiar estilo del item individual
        if (revisado) item.classList.add('revisada');
        else item.classList.remove('revisada');

        // 🧮 Calcular estado global de la tarea
        const total = tarea.entregas.length;
        const revisadas = tarea.entregas.filter(e => e.revisado).length;

        const liTarea = document.getElementById(`tarea-${tareaId}`);
        if (!liTarea) return;

        const estadoSpan = liTarea.querySelector('.estado-tarea');
        if (!estadoSpan) return;

        // Limpiar clases previas
        liTarea.classList.remove("tarea-revisada", "tarea-pendiente", "tarea-sinentregas");

        // 📌 Aplicar el estado correcto
        if (total === 0) {
            estadoSpan.textContent = "📄 Sin entregas";
            liTarea.classList.add("tarea-sinentregas");

        } else if (revisadas === total) {
            estadoSpan.textContent = "✅ Revisada";
            liTarea.classList.add("tarea-revisada");

        } else {
            estadoSpan.textContent = "⏳ Pendiente";
            liTarea.classList.add("tarea-pendiente");
        }

    })
    .catch(() => {
        alert('⚠️ Error de conexión con el servidor.');
        checkbox.checked = !revisado;
    });
}

function actualizarNota(archivo, nota, input) {
    nota = parseFloat(nota);
    if (isNaN(nota) || nota < 1 || nota > 7) {
        alert('⚠️ La nota debe estar entre 1.0 y 7.0');
        input.value = '';
        return;
    }

    fetch('actualizar_nota.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'archivo=' + encodeURIComponent(archivo) + '&nota=' + encodeURIComponent(nota)
    })
    .then(r => r.json())
    .then(data => {
        if (!data.success) {
            alert('❌ No se pudo actualizar la nota.');
        } else {
            // 🔁 Actualiza el dato localmente para mantener coherencia
            for (const curso in tareasPorCurso) {
                for (const id in tareasPorCurso[curso]) {
                    tareasPorCurso[curso][id].entregas.forEach(e => {
                        if (e.archivo === archivo) {
                            e.nota = nota;
                        }
                    });
                }
            }

            // 💫 Pequeña animación de confirmación visual
            input.style.backgroundColor = '#4caf50';
            input.style.color = 'white';
            setTimeout(() => {
                input.style.backgroundColor = '';
                input.style.color = '';
            }, 600);
        }
    })
    .catch(() => alert('⚠️ Error de conexión con el servidor.'));
}





</script>
