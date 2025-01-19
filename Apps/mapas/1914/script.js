var worldMap = document.querySelector("svg");

function resetSVGFill(svgElement) {
  svgElement.querySelectorAll("*").forEach(function(element) {
    element.style.fill = ""; 
    element.style.opacity = ""; 
  });
}

let isStyled = false; 

document.getElementById("aliados").addEventListener("click", function() {
  const polygonsREINO = document.querySelectorAll("#REINOUNIDO polygon");
  const egipto = document.getElementById("egipto"); 
  const france = document.getElementById("FR");
  const algeria = document.getElementById("algeria");
  const afo = document.getElementById("afo");
  const afe1 = document.getElementById("afe1");
  const afe2 = document.getElementById("afe2");
  const nigeria = document.getElementById("NG");
  const marruecosf = document.getElementById("marruecosf");
  const sahara = document.getElementById("EH");
  const gambia = document.getElementById("GM");
  const sierraleona = document.getElementById("SL");
  const costadeoro = document.getElementById("GH");
  const uganda = document.getElementById("UG");
  const polygonsRUSO = document.querySelectorAll("#IMPERIORUSO .cls-1");
  const aliadosBoton = this;

  if (!isStyled) {
    // Aplicar estilos
    polygonsREINO.forEach(polygon => {
      polygon.style.fill = "#1e90ff";
      polygon.style.opacity = "1";
    });
    egipto.style.fill = "#1e90ff";
    egipto.style.opacity = "1";
    france.style.fill = "#1e90ff";
    france.style.opacity = "1";
    algeria.style.fill = "#1e90ff"; 
    algeria.style.opacity = "1";
    afo.style.fill = "#1e90ff"; 
    afo.style.opacity = "1";
    afe1.style.fill = "#1e90ff";
    afe1.style.opacity = "1";
    afe2.style.fill = "#1e90ff";
    afe2.style.opacity = "1";
    nigeria.style.fill = "#1e90ff";
    nigeria.style.opacity = "1";
    marruecosf.style.fill = "#1e90ff";
    marruecosf.style.opacity = "1";
    sahara.style.fill = "#1e90ff";
    sahara.style.opacity = "1";
    gambia.style.fill = "#1e90ff";
    gambia.style.opacity = "1";
    sierraleona.style.fill = "#1e90ff";
    sierraleona.style.opacity = "1";
    costadeoro.style.fill = "#1e90ff";
    costadeoro.style.opacity = "1";
    uganda.style.fill = "#1e90ff";
    uganda.style.opacity = "1";
    polygonsRUSO.forEach(polygon => {
      polygon.style.fill = "#1e90ff";
      polygon.style.opacity = "1";
    });
    isStyled = true;
  } else {
    // Revertir estilos
    polygonsREINO.forEach(polygon => {
      polygon.style.fill = "";
      polygon.style.opacity = "";
    });
    egipto.style.fill = "";
    egipto.style.opacity = "";
    france.style.fill = "";
    france.style.opacity = "";
    algeria.style.fill = ""; 
    algeria.style.opacity = "";
    afo.style.fill = ""; 
    afo.style.opacity = "";
    afe1.style.fill = "";
    afe1.style.opacity = "";
    afe2.style.fill = "";
    afe2.style.opacity = "";
    nigeria.style.fill = "";
    nigeria.style.opacity = "";
    marruecosf.style.fill = "";
    marruecosf.style.opacity = "";
    sahara.style.fill = "";
    sahara.style.opacity = "";
    gambia.style.fill = "";
    gambia.style.opacity = "";
    sierraleona.style.fill = "";
    sierraleona.style.opacity = "";
    costadeoro.style.fill = "";
    costadeoro.style.opacity = "";
    uganda.style.fill = "";
    uganda.style.opacity = "";
    polygonsRUSO.forEach(polygon => {
      polygon.style.fill = "";
      polygon.style.opacity = "";
    });
    isStyled = false;
  }

  // Alternar color del botón
  aliadosBoton.style.background = aliadosBoton.style.background === "red" ? "#242424" : "red";
});




let isCentralesStyled = false;

document.getElementById("centrales").addEventListener("click", function() {
  const polygonsALEMANIA = document.querySelectorAll("#ALEMANIA .cls-7");
  const polygonsAUSTRIAHUNGRIA = document.querySelectorAll("#AUSTRIAHUNGRIA .cls-1");
  const italy = document.getElementById("IT");
  const centralesBoton = this;

  if (!isCentralesStyled) {
    polygonsALEMANIA.forEach(polygon => {
      polygon.style.fill = "#ffa218";
      polygon.id = "centrales";
    });
    polygonsAUSTRIAHUNGRIA.forEach(polygon => {
      polygon.style.fill = "#ffa218";
    });
    italy.style.fill = "#ffa218";
    isCentralesStyled = true; 
  } else {
    polygonsALEMANIA.forEach(polygon => {
      polygon.style.fill = "";
      polygon.id = ""; 
    });
    polygonsAUSTRIAHUNGRIA.forEach(polygon => {
      polygon.style.fill = "";
    });
    italy.style.fill = "";
    isCentralesStyled = false; 
  }

  centralesBoton.style.background = centralesBoton.style.background === "red" ? "#242424" : "red";
});


document.getElementById("tripleentente").addEventListener("click", function() {
  const tripleAlianza = document.getElementById("TRIPLEENTENTE");
  const tripleAlianzaBoton = this;
  tripleAlianza.style.display = tripleAlianza.style.display === "block" ? "none" : "block";
  tripleAlianzaBoton.classList.toggle("boton-activo");
});


document.getElementById("triplealianza").addEventListener("click", function() {
  const tripleEntente = document.getElementById("TRIPLEALIANZA");
  const tripleEntenteBoton = this;
  tripleEntente.style.display = tripleEntente.style.display === "block" ? "none" : "block";
  tripleEntenteBoton.classList.toggle("boton-activo");
});


document.querySelectorAll("g").forEach(function(group) {
  group.addEventListener("mouseenter", function() {
    group.querySelectorAll("*").forEach(function(child) { 
      child.style.filter = "brightness(120%)"; 
    });
  });
  
  group.addEventListener("mouseleave", function() {
    group.querySelectorAll("*").forEach(function(child) { 
      child.style.filter = ""; 
    });
  });
});

document.querySelectorAll("g").forEach(function(concepto) {
  let clickStartX, clickStartY;
  
  concepto.addEventListener("mousedown", function(event) {
      clickStartX = event.clientX;
      clickStartY = event.clientY;
  });
  
  concepto.addEventListener("mouseup", function(event) {
      const clickEndX = event.clientX;
      const clickEndY = event.clientY;

      if (clickStartX === clickEndX && clickStartY === clickEndY) {
          var idConcepto = this.id;
          var territorio = concepto.querySelectorAll(".territorio");  
          var glosarioConcepto = document.getElementById("PAIS-" + idConcepto);
          
          if (glosarioConcepto) {
              // Alternar opacidad y pointer-events
              if (glosarioConcepto.style.opacity === "0" || glosarioConcepto.style.opacity === "") {
                  glosarioConcepto.style.opacity = "1";
                  glosarioConcepto.style.pointerEvents = "auto"; // Activa pointer-events

                  // Cambia el color de fill para todos los hijos de cada elemento en 'territorio'
                  territorio.forEach(function(element) {
                      element.querySelectorAll('*').forEach(function(child) {
                          child.style.fill = "black"; // Cambia el fill a negro
                      });
                  });
              } else {
                  glosarioConcepto.style.opacity = "0";
                  glosarioConcepto.style.pointerEvents = "none";
                  resetSVGFill(worldMap);
                  territorio.forEach(function(element) {
                      element.querySelectorAll('*').forEach(function(child) {
                          child.style.fill = ""; // Reinicia el fill o usa otro color
                      });
                  });
              }
          }
      }
  });
});


document.querySelectorAll(".pais-cerrar").forEach(function(cerrar) {
  cerrar.addEventListener("click", function() {
      this.parentElement.style.opacity = "0";
      this.parentElement.style.pointerEvents = "none";
      resetSVGFill(worldMap);
  });
  
});

document.getElementById("territorio-alemania").addEventListener("click", function() {
  var alemania = document.getElementById("ALEMANIA");
  var camerun = document.getElementById("CAMERUN");
  var africaoriental = document.getElementById("AFOA");
  var africasudoeste = document.getElementById("NA");
  var nuevaguinea = document.getElementById("PG");
  var zoom = document.getElementById("zoom");

  // Variable para alternar estado
  var isHighlighted = alemania.dataset.highlighted === "true";

  // Colores según estado
  var newColor = isHighlighted ? "" : "yellow";

  // Actualizar colores
  alemania.querySelectorAll(".cls-7").forEach(function(child) {
    child.style.fill = newColor;
  });
  camerun.querySelectorAll("*").forEach(function(child) {
    child.style.fill = newColor;
  });
  africaoriental.querySelectorAll("*").forEach(function(child) {
    child.style.fill = newColor;
  });
  africasudoeste.style.fill = newColor;
  nuevaguinea.style.fill = newColor;

  // Resetear zoom si está resaltado, de lo contrario no hacer nada
  if (!isHighlighted) {
    zoom.style.transform = "translate(0px, 0px) scale(1)";
  }

  // Alternar el estado de resaltado
  alemania.dataset.highlighted = !isHighlighted;
});









var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("zoom");

function setTransform() {
  zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

zoom.onmousedown = function (e) {
  e.preventDefault();
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
};

document.onmouseup = function (e) {
  panning = false;
};

document.onmousemove = function (e) {
  if (!panning) return;
  e.preventDefault();
  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  setTransform();
};

zoom.onwheel = function (e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
      ys = (e.clientY - pointY) / scale,
      delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
  (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;
  setTransform();
};


      
      

