$(document).ready(function($) {

    var mainContainer = $("#mainBox");

    mainContainer.append(svgMapVector);

    var svgMain     = $("#Layer_1");
    var svgMain2     = $("#Layer_2");
    var svgTool     = $("#toolbox");
    var svgDragme   = $("#dragme");

    svgMain.draggable();
    svgTool.draggable();
    svgDragme.draggable();
    svgMain2.css({'visibility':'hidden'});
  

    svgMain.each(function(index){
        $(this).attr('id','element_'+index);

        $(this)
    });

    $("#zoom1").on('click',function(){

        TweenMax.to(svgMain,0.5,{css:{scaleX:'+=1',scaleY:'+=1'}});

    });

     $("#zoom2").on('click',function(){

        TweenMax.to(svgMain,0.5,{css:{scaleX:'-=1',scaleY:'-=1'}});

    });

    $("#zoom3").on('click',function(){

         TweenMax.to(svgMain,0.5,{css:{scaleX:'0.8',scaleY:'0.8','top':0,'left':0, x: 0, y: 0}});

    });

     $("#zoom4").on('click',function(){

        TweenMax.to(svgMain,0.5,{css:{'top':0,'left':0, x: 0, y: 0}});

    });
  
});
/*
var A223 = document.getElementById('a223'),
    bt2 = document.getElementById('bt2'),
    bt1 = document.getElementById('bt1'),
    svg223 = document.getElementById('svg223'),
    Asia =  document.getElementById('Asia'),
    Mesopotamia = document.getElementById('Mesopotamia'),
    contador = 0;
    
    function a223(){ 
      document.getElementById("svg223").style.clipPath = "circle(100%)";
      document.getElementById("svg509").style.clipPath = "circle(100%)";
      A223.style.background = "white";
      A223.style.borderRadius = "10px";
      A223.style.color = "var(--red)";
      A223.style.padding = "2%";
      bt2.style.background = "";
      bt2.style.borderRadius = "";
      bt2.style.color = "";
      bt2.style.padding = "";
      bt1.style.background = "";
      bt1.style.borderRadius = "";
      bt1.style.color = "";
      bt1.style.padding = "";
      
    }
    
    function segundo(){ 
      Asia.style.clipPath = "circle(100%)";
      A223.style.background = "";
      A223.style.borderRadius = "";
      A223.style.color = "";
      A223.style.padding = "";
      bt2.style.background = "white";
      bt2.style.borderRadius = "10px";
      bt2.style.color = "var(--red)";
      bt2.style.padding = "2%";
      bt1.style.background = "";
      bt1.style.borderRadius = "";
      bt1.style.color = "";
      bt1.style.padding = "";
    }

    function primero(){ 
      Mesopotamia.style.clipPath = "circle(100%)";
      bt1.style.background = "white";
      bt1.style.borderRadius = "10px";
      bt1.style.color = "var(--red)";
      bt1.style.padding = "2%";
    }


bt1.addEventListener('click',primero,true);
bt2.addEventListener('click',segundo,true);

*/

var bt1 = document.getElementById('bt1'),
    bt2 = document.getElementById('bt2'),
    bt3 = document.getElementById('bt3'),
    bt4 = document.getElementById('bt4'),
    bt5 = document.getElementById('bt5'),
    bt6 = document.getElementById('bt6'),
    bt7 = document.getElementById('bt7'),
    bt8 = document.getElementById('bt8'),
    bt9 = document.getElementById('bt9');

var buttons = [bt1, bt2, bt3, bt4, bt5, bt6, bt7, bt8, bt9];
var parent = bt1.parentElement;

// Crear un array de botones donde cada botón desbloquea al siguiente
var buttonPairs = [
    [bt1, bt2],
    [bt2, bt3],
    [bt3, bt4],
    [bt4, bt5],
    [bt5, bt6],
    [bt6, bt7],
    [bt7, bt8],
    [bt8, bt9]
];

buttons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    var clickedButton = event.target;

    // Eliminar la clase 'activado' de todos los botones
   

    // Alternar la clase 'activado' del botón clicado
    if (!clickedButton.classList.contains('activado')) {
      clickedButton.classList.add('activado');
    }

    // Obtener el texto del botón clicado y transformarlo en ID
    var targetId = clickedButton.textContent.trim();
    var targetElement = document.getElementById(targetId);

    // Reemplazar las clases 'aparecer' y 'desaparecer' en todos los elementos
    Array.from(parent.querySelectorAll('[id]')).forEach(function(el) {
      if (el.classList.contains('aparecer')) {
        el.classList.remove('aparecer');
        el.classList.add('desaparecer');
      }
    });

    // Alternar entre las clases 'desaparecer' y 'aparecer' en el elemento correspondiente
    if (targetElement) {
      if (targetElement.classList.contains('desaparecer')) {
        targetElement.classList.remove('desaparecer');
        targetElement.classList.add('aparecer');
      } else if (targetElement.classList.contains('aparecer')) {
        targetElement.classList.remove('aparecer');
        targetElement.classList.add('desaparecer');
      } else {
        // Si no tiene ninguna de las clases, por defecto añadir 'aparecer'
        targetElement.classList.add('aparecer');
      }
    }

    // Desbloquear el siguiente botón en la secuencia
    buttonPairs.forEach(function(pair) {
      if (clickedButton === pair[0]) {
        pair[1].classList.remove('bloqueado');
      }
    });
  });
});



