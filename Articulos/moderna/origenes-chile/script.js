var botonGeo = document.getElementById("lengueta-geo");
var botonPueblos = document.getElementById("lengueta-pueblos");
var titulo = document.getElementById("titulo-explicacion1");
var texto = document.getElementById("texto-explicacion1");
var img = document.getElementById("img-explicacion1");

botonGeo.addEventListener("click", function () {
    titulo.innerHTML = "GEOMORFOLOGÍA DE CHILE";
    texto.innerHTML = "El territorio de Chile se formó hace millones de años debido a procesos geológicos como el choque de placas tectónicas, que formaron la cordillera de los Andes, que junto a la corriente de Humboldt, mantiene el Desierto de Atacama.";
    img.src = "/img/moderna/descubrimiento-chile/00909c64-2d8e-464b-bcb6-e1013e2b5e7d (2).webp"

    const containerId = this.getAttribute('data-container');
    const container = document.getElementById(containerId);

    document.getElementById('pueblos-originarios').classList.remove('active');
    
    container.classList.add('active');
    this.classList.add('active');
    botonPueblos.classList.remove('active');
});

botonPueblos.addEventListener("click", function () {
    titulo.innerHTML = "PUEBLOS ORIGINARIOS";
    texto.innerHTML = "Antes de la llegada de los españoles y la dominación Inca, en el territorio actual de Chile habitaron diversos pueblos originarios. Como los límites actuales no existían en el siglo XVI, los pueblos tenían su territorio más allá de la frontera actual entre países.";
    img.src = "/img/moderna/descubrimiento-chile/selknam-ropa-cazar-removebg-preview.png"

    const containerId = this.getAttribute('data-container');
    const container = document.getElementById(containerId);

    document.getElementById('geomorfologia').classList.remove('active');
    
    container.classList.add('active');
    this.classList.add('active');
    botonGeo.classList.remove('active');
});


document.querySelectorAll('.carta-pueblo').forEach(div => {
    div.addEventListener('mouseenter', function() {
        let mapaId = 'mapa_' + this.id;
        let mapa = document.getElementById(mapaId);
        if (mapa) {
            mapa.style.fill = "yellow";
            mapa.querySelectorAll('*').forEach(el => {
                el.style.fill = "yellow";
            });
        }
    });

    div.addEventListener('mouseleave', function() {
        let mapaId = 'mapa_' + this.id;
        let mapa = document.getElementById(mapaId);
        if (mapa) {
            mapa.style.fill = "";
            mapa.querySelectorAll('*').forEach(el => {
                el.style.fill = "";
            });
        }
    });
});



document.querySelectorAll('.mapa_pueblo').forEach(el => {
    el.addEventListener('mouseenter', function() {
        let cartaId = this.getAttribute('data-carta'); 
        let carta = document.getElementById(cartaId);

        if (carta) {
            carta.style.transform = "scale(1.1)";
        }
    });

    el.addEventListener('mouseleave', function() {
        let cartaId = this.getAttribute('data-carta');
        let carta = document.getElementById(cartaId);

        if (carta) {
            carta.style.transform = "";
        }
    });
});

document.getElementById("abrir-mapa").addEventListener("click", function() {
    var mapa = document.getElementById("mapa-descubrimiento-america");
    var activador = document.querySelector(".capa-activador-mapa");

    if (activador.classList.contains("activo")) {
        activador.classList.remove("activo");
    }
    else {
        activador.classList.add("activo");
    }

    mapa.classList.toggle("activo");
    document.body.classList.toggle("no-scroll"); // Agregar o quitar la clase "no-scroll" al body
});

document.querySelector(".capa-activador-mapa").addEventListener("click", function() {
    var mapa = document.getElementById("mapa-descubrimiento-america");

    if (this.classList.contains("activo")) {
        this.classList.remove("activo");
    } else {
        this.classList.add("activo");
    }
        

    mapa.classList.add("activo");
    document.body.classList.add("no-scroll"); // Agregar o quitar la clase "no-scroll" al body
});

document.getElementById("lengueta-descubrimiento").addEventListener("click", function () {

    const containerId = this.getAttribute('data-container');
    const container = document.getElementById(containerId);

    document.getElementById('conquista-america').classList.remove('active');
    
    container.classList.add('active');
    this.classList.add('active');
    document.getElementById("lengueta-conquista").classList.remove('active');

    // window.location.href = '#inicio-descubrimiento';

    document.getElementById("inicio-descubrimiento-2").style.display = "none";
    document.getElementById("inicio-descubrimiento").style.display = "flex";
});

document.getElementById("lengueta-conquista").addEventListener("click", function () {

    const containerId = this.getAttribute('data-container');
    const container = document.getElementById(containerId);

    document.getElementById("mapa-descubrimiento-america").classList.remove('active');
    
    container.classList.add('active');
    this.classList.add('active');
    document.getElementById("lengueta-descubrimiento").classList.remove('active');
    
    /// window.location.href = '#inicio-descubrimiento';

    document.getElementById("inicio-descubrimiento-2").style.display = "flex";
    document.getElementById("inicio-descubrimiento").style.display = "none";
});
