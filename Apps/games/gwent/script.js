let cartasDisponibles = [];
let manoJugador = [];
let manoIA = [];
let turno = 0;
let puedeJugar = true;

fetch('/Apps/cartas/cartas.json')
  .then(res => res.json())
  .then(data => {
    cartasDisponibles = Object.values(data);
    iniciarJuego();
  });

  function iniciarJuego() {
    const cantidad = 5; // 5 cartas para cada uno
  
    // Crear un mazo de 10 cartas al azar (con repetición)
    const mazoInicial = [];
    for (let i = 0; i < cantidad * 2; i++) {
      const cartaAleatoria = cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)];
      mazoInicial.push({ ...cartaAleatoria }); // se clona para evitar referencias compartidas
    }
  
    manoJugador = mazoInicial.slice(0, cantidad);
    manoIA = mazoInicial.slice(cantidad, cantidad * 2);
    turno = 0;
  
    mostrarMano();
    mostrarManoIA();
  }
  

function mostrarMano() {
  const contenedor = document.getElementById('mano-jugador');
  contenedor.innerHTML = '';

  manoJugador.forEach((carta, i) => {
    const div = document.createElement('div');
    div.className = 'carta';
    div.classList.add(carta.rareza)
    div.draggable = true;
    div.dataset.index = i;

    div.innerHTML = `
      <span class="puntaje">${carta.puntaje}</span>
      
      <div class="fondo">
        <h1>${carta.categoria[0].nombre}</h1>
        <img src="${carta.fondoFrontal}">
      </div>
      <img class="personaje" src="${carta.imagen}" alt="${carta.titulo}">
      <div class="titulo">
        <span>Carta histórica</span>
        <h4>${carta.titulo}</h4>
        <span>${carta.categoria[0].nombre}</span>
      </div>
      
      
      
    `;

    // Cuando empieza a arrastrarse
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', i); // índice de la carta
    });
    

    contenedor.appendChild(div);
  });
}

function soltarCarta(event) {
  event.preventDefault();
  const indice = parseInt(event.dataTransfer.getData('text/plain'));
  if (!isNaN(indice)) {
    jugarCarta(indice);
  }
}

document.addEventListener('drop', (event) => {
  // Detecta si se soltó fuera de jugadas-jugador
  const zonaValida = document.getElementById('jugadas-jugador');
  const soltadoEnZonaValida = zonaValida.contains(event.target);

  if (!soltadoEnZonaValida) {
    event.preventDefault();
    // Anima el retorno visualmente
    const indice = event.dataTransfer.getData('text/plain');
    const cartas = document.querySelectorAll('#mano-jugador .carta');
    const carta = cartas[indice];
    if (carta) {
      carta.classList.add('rebote');
      setTimeout(() => carta.classList.remove('rebote'), 500);
    }
  }
});



const campo = document.getElementById('jugadas-jugador');

campo.addEventListener('dragover', (e) => {
  e.preventDefault();
  campo.classList.add('over');
});

campo.addEventListener('dragleave', () => {
  campo.classList.remove('over');
});

campo.addEventListener('drop', (e) => {
  campo.classList.remove('over');
});



function mostrarManoIA() {
  const contenedorIA = document.getElementById('mano-ia');
  contenedorIA.innerHTML = '';

  manoIA.forEach(() => {
    const cartaReverso = document.createElement('div');
    cartaReverso.className = 'carta ia'; // Estilo para reverso o genérico
    contenedorIA.appendChild(cartaReverso);
  });
}

function jugarCarta(indice) {
  if (!puedeJugar) return; // ⛔ Bloquea si no es turno del jugador
  puedeJugar = false; // 🔒 Bloquea jugadas hasta que la IA responda

  const cartaJugador = manoJugador.splice(indice, 1)[0];
  const cartaIA = manoIA.shift();

  agregarCartaCampo('jugadas-jugador', cartaJugador);
  aplicarEfectos(cartaJugador, 'jugador', cartaIA);
  mostrarMano();
  

  // 💡 Jugada de la IA tras un pequeño retraso
  setTimeout(() => {
    if (cartaIA) {
      agregarCartaCampo('jugadas-ia', cartaIA);
      aplicarEfectos(cartaIA, 'ia');
  
      const contenedorIA = document.getElementById('mano-ia');
      if (contenedorIA.firstChild) {
        contenedorIA.removeChild(contenedorIA.firstChild);
      }
    }
  
    turno++;
  
    if (manoJugador.length === 0 && manoIA.length === 0) {
      setTimeout(mostrarResultado, 800);
    } else {
      puedeJugar = true;
      mostrarMano();
    }
  }, 1000);
}


function aplicarEfectos(carta, quien, cartaIA = null) {
  if (!carta || !carta.especialidad) return;

  const especialidad = carta.especialidad.toLowerCase();

  switch (especialidad) {
    case "pensador":
      const jugadas = document.querySelectorAll(`#jugadas-${quien} .carta p`);
      jugadas.forEach(p => {
        const puntos = parseInt(p.textContent);
        p.classList.add("sumar-puntos");
        p.textContent = (puntos + 1) + ' pts';
      });
      break;

    case "agricultor":
      if (quien === 'jugador' && manoJugador.length < cartasDisponibles.length) {
        const restantes = cartasDisponibles.filter(c =>
          !manoJugador.includes(c) &&
          !manoIA.includes(c) &&
          !document.querySelector(`#jugadas-jugador .carta img[src="${c.imagen}"]`) &&
          !document.querySelector(`#jugadas-ia .carta img[src="${c.imagen}"]`)
        );
        if (restantes.length > 0) {
          const nuevaCarta = restantes[Math.floor(Math.random() * restantes.length)];
          manoJugador.push(nuevaCarta);
          alert("🌾 ¡Agricultor! Obtienes una carta extra.");
        }
      }
      break;

      case "intrépido":
      case "intrepido":
        if (quien === 'jugador') {
          const zonaIA = document.getElementById('jugadas-ia');
          const primeraCartaIA = zonaIA.querySelector('.carta');
      
          if (primeraCartaIA) {
            const puntajeEl = primeraCartaIA.querySelector('p');
            const puntajeActual = parseInt(puntajeEl.textContent);
            const nuevoPuntaje = Math.max(0, puntajeActual - 2);
            puntajeEl.textContent = `${nuevoPuntaje} pts`;
      
            // ✨ Efecto de temblor
            primeraCartaIA.classList.add('temblor-daño');
            setTimeout(() => {
              primeraCartaIA.classList.remove('temblor-daño');
            }, 500);
          }
        }
        break;

        case "compañero":
        // Selecciona todas las cartas en la zona del jugador o la IA
        const cartasZona = document.querySelectorAll(`#jugadas-${quien} .carta`);

        // Filtra aquellas con mismo título y especialidad "compañero"
        const cartasIguales = [...cartasZona].filter(div => {
          const titulo = div.querySelector('h4')?.textContent?.trim();
          const spans = div.querySelectorAll('span');
          const tieneEspecialidad = [...spans].some(span =>
            span.textContent.toLowerCase() === "compañero"
          );
          return titulo === carta.titulo && tieneEspecialidad;
        });

        // Si hay al menos 2 cartas iguales, aplicar efecto
        if (cartasIguales.length >= 2) {
          cartasIguales.forEach(div => {
            if (!div.dataset.companeroBonusAplicado) {
              const p = div.querySelector('p');
              let puntos = parseInt(p.textContent);
              p.textContent = `${puntos + 2} pts`;
              div.dataset.companeroBonusAplicado = "true";

              // 🎉 Efecto visual
              p.classList.add('brillo-bonus');
              setTimeout(() => div.classList.remove('brillo-bonus'), 800);
            }
          });
        }
        break;

      }            
}


function agregarCartaCampo(id, carta) {
  const zona = document.getElementById(id);
  const div = document.createElement('div');
  div.className = 'carta';
  div.innerHTML = `
    <img src="${carta.imagen}" alt="${carta.titulo}">
    <h4>${carta.titulo}</h4>
    <p>${carta.puntaje} pts</p>
  `;

  

  if (carta.personalidad) {
    carta.personalidad.forEach(p => {
      const span = document.createElement('span');
      span.textContent = p.nombre;
      span.style.display = 'block';
      span.style.fontSize = '0.8em';
      span.style.color = 'gray';
      div.appendChild(span);
    });
  }
  
  // AÑADIR ESPECIALIDAD VISIBLE para "compañero"
  if (carta.especialidad) {
    const span = document.createElement('span');
    span.textContent = carta.especialidad; // importante para "compañero"
    span.style.display = 'block';
    span.style.fontSize = '0.8em';
    span.style.color = 'darkgreen';
    div.appendChild(span);
  }
  

  zona.appendChild(div);
}

function mostrarResultado() {
  const cartasJugador = document.querySelectorAll('#jugadas-jugador .carta p');
  const cartasIA = document.querySelectorAll('#jugadas-ia .carta p');

  const puntajeJugador = [...cartasJugador].reduce((acc, el) => acc + parseInt(el.textContent), 0);
  const puntajeIA = [...cartasIA].reduce((acc, el) => acc + parseInt(el.textContent), 0);

  const resultado = document.getElementById('resultado');
  if (puntajeJugador > puntajeIA) {
    resultado.innerText = `¡Ganaste! (${puntajeJugador} vs ${puntajeIA})`;
  } else if (puntajeJugador < puntajeIA) {
    resultado.innerText = `Perdiste... (${puntajeJugador} vs ${puntajeIA})`;
  } else {
    resultado.innerText = `Empate. (${puntajeJugador} vs ${puntajeIA})`;
  }
}