$(function() {

	var num = $("div").length;
	var random;
	var r2;
	var max = 52;
	var count = 0;

	$("#click").click(randomCard);

	function randomCard() {
		r2 = random;
		random = Math.floor(Math.random() * (max - 1 + 1)) + 1;
		if (random == r2) {
			randomCard();
			return;
		}

		if (count === max) {
			$(".card").hide();
			$("#joker").show();
			$(".header").show();
			$("#click").prop("disabled",true);
			$("#click").removeClass("hover");
			count = 0;
			$(".flipped").removeClass("flipped");
		} else if (!$("#card-" + random).hasClass("flipped")) {
			$(".card").hide();
			$("#card-" + random).addClass("flipped").show();
			$(".header").hide();
			count++
		} else {
			randomCard();
			return;
		}
	}

})

const button = document.querySelector(".hover");

button.addEventListener("click", e => {
  button.classList.add("sacudir");
  limpiarCambios();
  
  setTimeout(() => {
    button.classList.remove("sacudir");
  }, 600)
});

const buttonsBandera = document.querySelectorAll(".buttonBandera");

// Seleccionar todos los elementos con la clase .card-bandera
const banderas = document.querySelectorAll(".card-bandera");

// Función para cambiar la opacidad de la bandera
function toggleOpacidad(bandera) {
  // Comprobar si la opacidad actual es 0 o 1 y cambiarla
  if (bandera.style.opacity === "1") {
    bandera.style.opacity = "0";
  } else {
    bandera.style.opacity = "1";
  }
}

// Agregar evento click a cada botón de bandera
buttonsBandera.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    // Obtener el índice del botón clickeado
    const index = Array.from(buttonsBandera).indexOf(button);
    // Obtener la bandera correspondiente
    const bandera = banderas[index];
    // Cambiar la opacidad de la bandera correspondiente
    toggleOpacidad(bandera);
  });
});

// Opcionalmente, también podrías agregar un evento click a cada card-bandera para ocultarla
banderas.forEach(bandera => {
  bandera.addEventListener("click", () => {
    bandera.style.opacity = "0";
  });
});



const LocationEuropa = document.querySelector(".location-europa");

const LocationAmericasur = document.querySelector(".location-americasur");

const LocationAmericanorte = document.querySelector(".location-americanorte");

const LocationAfrica = document.querySelector(".location-africa");

const LocationOrientemedio = document.querySelector(".location-orientemedio");

const LocationAsia = document.querySelector(".location-asia");

const LocationOceania = document.querySelector(".location-oceania");

const Mapa = document.querySelector("#Layer_1");

const Alemania = document.querySelector("#Alemania");

const elementosMapa = document.querySelector("#Mundo");

const svgChildren = $('g').children();

const mundoChildren = $('#Mundo').children();

var pais = document.querySelector("cls-1");

let animacionEjecutada = false;

function limpiarCambios() {
  document.querySelector(".sacudirdado")?.classList.remove("sacudirdado");
  svgChildren.css({'fill':''});
  TweenMax.to(Mapa, 0.5, {css: {scaleX: 1, scaleY: 1, x: 0, y: 0, 'top': 0,'left':0,}});
}


function marcarPais() {
    elementosMapa.addEventListener("click", e => {
        // Eliminar el estilo fill de todos los elementos dentro de elementosMapa
        elementosMapa.querySelectorAll('*').forEach(elemento => {
            elemento.style.fill = '';
        });
        
        // Aplicar el nuevo color al elemento clickeado
        var elementoClickeado = e.target;
        elementoClickeado.style.fill = "#ffcd17";
    });
}

marcarPais();

$(function () {
    $(".cls-1").click(function() {
        // Ocultar todas las cartas
        $(".card").hide();

        // Obtener el id del botón clickeado
        var idCarta = $(this).attr("id");

        // Mostrar la carta correspondiente al id del botón clickeado
        $("#card-" + idCarta).show();
    });
});

$(function () {
    $(".location-americasur").click(function() {

        // Obtener el id del botón clickeado
        var idCarta = $(this).attr("id");

        // Mostrar la carta correspondiente al id del botón clickeado
        $("#card-" + idCarta).show();
    });
});


function Europa() {
  TweenMax.to(Mapa, 0.5, {css: {scaleX: 2, scaleY: 2, x: 0, y: 0, 'top': 300,'left':0,}});
}

LocationEuropa.addEventListener('click',Europa,true);

function Americasur() {
  TweenMax.to(Mapa, 0.5, {css: {scaleX: 2, scaleY: 2, x: 0, y: 0, 'top': -500,'left': 700,}});
}

LocationAmericasur.addEventListener('click',Americasur,true);

function Americanorte() {
  TweenMax.to(Mapa, 0.5, {css: {scaleX: 2, scaleY: 2, x: 0, y: 0, 'top': -500,'left': 700,}});
}

LocationAmericanorte.addEventListener('click',Americanorte,true);