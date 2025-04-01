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

        TweenMax.to(svgMain,0.5,{css:{scaleX:'+=2',scaleY:'+=2'}});

    });

     $("#zoom2").on('click',function(){

        TweenMax.to(svgMain,0.5,{css:{scaleX:'-=2',scaleY:'-=2'}});

    });

    $("#zoom3").on('click',function(){

         TweenMax.to(svgMain,0.5,{css:{scaleX:'1',scaleY:'1','top':0,'left':0, x: 0, y: 0}});

    });

     $("#zoom4").on('click',function(){

        TweenMax.to(svgMain,0.5,{css:{'top':0,'left':0, x: 0, y: 0}});

    });
  
});

var A223 = document.getElementById('a223'),
    A509 = document.getElementById('a509'),
    A753 = document.getElementById('a753'),
    svg223 = document.getElementById('svg223'),
    svg509 =  document.getElementById('_509_a._e._c.'),
    svg753 = document.getElementById('_753_a._e._c.'),
    contador = 0;
    
    function a223(){ 
      document.getElementById("svg223").style.clipPath = "circle(100%)";
      document.getElementById("svg509").style.clipPath = "circle(100%)";
      A223.style.background = "white";
      A223.style.borderRadius = "10px";
      A223.style.color = "var(--red)";
      A223.style.padding = "2%";
      A509.style.background = "";
      A509.style.borderRadius = "";
      A509.style.color = "";
      A509.style.padding = "";
      A753.style.background = "";
      A753.style.borderRadius = "";
      A753.style.color = "";
      A753.style.padding = "";
      
    }
    
    function a509(){ 
      document.getElementById("svg509").style.clipPath = "circle(100%)";
      document.getElementById("svg223").style.clipPath = "circle(0%)";
      document.getElementById("svg753").style.clipPath = "circle(100%)";
      A223.style.background = "";
      A223.style.borderRadius = "";
      A223.style.color = "";
      A223.style.padding = "";
      A509.style.background = "white";
      A509.style.borderRadius = "10px";
      A509.style.color = "var(--red)";
      A509.style.padding = "2%";
      A753.style.background = "";
      A753.style.borderRadius = "";
      A753.style.color = "";
      A753.style.padding = "";
    }

    function a753(){ 
      document.getElementById("svg753").style.clipPath = "circle(100%)";
      document.getElementById("svg509").style.clipPath = "circle(0%)";
      document.getElementById("svg223").style.clipPath = "circle(0%)";
      A223.style.background = "";
      A223.style.borderRadius = "";
      A223.style.color = "";
      A223.style.padding = "";
      A509.style.background = "";
      A509.style.borderRadius = "";
      A509.style.color = "";
      A509.style.padding = "";
      A753.style.background = "white";
      A753.style.borderRadius = "10px";
      A753.style.color = "var(--red)";
      A753.style.padding = "2%";
    }

A223.addEventListener('click',a223,true);
A509.addEventListener('click',a509,true);
A753.addEventListener('click',a753,true);
