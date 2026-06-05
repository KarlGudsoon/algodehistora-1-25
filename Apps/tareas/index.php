<?php
$conexion = new mysqli("localhost", "algodehi_adrian", "1qa2ws3ed123", "algodehi_luminary");
$resultado = $conexion->query("SELECT * FROM tareas");
?>


<link rel="stylesheet" href="/index.css">

<meta name="viewport" content="width=device-width, initial-scale=1">

<header id="header"></header>
<div id="navbarmobile"></div>

<main>
    <h1 class="titulo">Todos los cursos</h1>
    
    <ul class="tabla-curso">
        <li class="curso" style="--background: rgb(194, 40, 58)">
            <a href="tareas.php?curso=1"> 
                <img src="/img/otros/artes.webp">
                <h1>1° Nivel A</h1>
                <p>Arte y medios audiovisuales: Fotografía, diseño gráfico y videos</p>
            </a>
        </li>
        <li class="curso" style="--background: rgb(194, 40, 58)">
            <a href="tareas.php?curso=2"> 
                <img src="/img/moderna/fondo-independecia-chile.webp">
                <h1>1° Nivel B</h1>
                <p>La conformación del escenario internacional desde la segunda mitad del siglo XX.</p>
            </a>
        </li>
        <li class="curso" style="--background: rgb(16, 96, 143)">
            <a href="tareas.php?curso=10">
                <img src="/img/contemporanea/7444c67c-7af3-4170-99ab-5cceb8f28984.webp">
                <h1>2° Nivel D</h1>
                <p>La conformación del escenario internacional desde la segunda mitad del siglo XX.</p>
            </a>
        </li>
    </ul>
</main>

<style>
  body {
    margin: 0;
    padding: 0;
  }
    .titulo {
        font: 900 2rem BreeSerif;
        text-align: center;
        text-transform: uppercase;
        opacity: 0.5;
    }
  
    .enlace {
        text-decoration: underline;
        background: #c2283a;
        padding: 0.5rem;
    }
    
    .curso {
        background: var(--background);
        backdrop-filter: blur(15px);
        border-radius: 1rem;
        border: 1px solid rgba(255 255 255 / 0.2);
        box-shadow: 0 0 10px rgba(0 0 0 / 0.2);
        width: 350px;
        min-height: 300px;
        transition: 0.2s ease;
        outline: 1px solid transparent;
        outline-offset: 0px;
    }
    
    .curso:hover {
        scale: 1.02;
        outline: 1px solid white;
        outline-offset: 3px;
    }
    
    .curso a {
        width: 100%;
        height: 100%;
        display: block;
    }
    
    .curso img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 1rem 1rem 0rem 0rem;
    }
    
    .curso h1 {
        margin: 0;
        margin-bottom: 0;
        padding: 0.2rem 1rem 0.2rem 1rem;
        font: 900 1.5rem BreeSerif;
        text-transform: uppercase;
    }
    
    .curso p {
        font: 300 1rem Roboto;
        padding: 0.2rem 1rem 0 1rem;
        margin: 0;
    }
    
    nav {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
    }
    
    nav ul {
        width: fit-content;
    }
    
    .tabla-curso {
        list-style: none;
        padding: 1rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem
        
    }
    
    button {
        margin-top: 1rem;
    }
    
    .subir-archivo {
        border: 2px dashed white;
        padding: 1rem;
        border-radius: 1rem;
        background-color: rgba(0 0 0 / 0.1);
        cursor: pointer;
    }
    
    input[type="file" i] {
        
    }
    
    input[type="text"] {
        background: #e92a41;
        padding: 0.8rem;
        font-family: Roboto;
        font-size: 1rem;
        color: white;
        appearance: none;
        border: 1px solid white;
        border-radius: 1rem;
    }
    
    input[type="text"]::placeholder {
        color:white;
        
    }
    
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .fecha {
        background: #e92a41;
        padding: 0.5rem;
        box-shadow: 0 0 10px rgba(0 0 0 / 0.2);
        width: fit-content;
        border-radius: 0.5rem;
    }
    
    .concepto {
      cursor: pointer;
      user-select: none;
      background: none;
      position: relative;
      padding: 0.2rem;
      font-weight: 300;
      z-index: 1;
      width: fit-content;
      
    }
    
    .concepto:hover {
      color: white;
    }
    
    .concepto:before {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 10%;
      background: white;
      transition: .2s ease;
      z-index: -1;
    }
    
    .concepto:hover:before {
      bottom: 0%;
      height: 100%;
      background: rgb(0 0 0 / 0.2);
    }
    


</style>

<script src="/assets/js/layout.js" defer></script>

