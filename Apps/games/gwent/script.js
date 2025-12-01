// Juego de cartas con tres posiciones: atacante, defensiva y recolectora.

let cartasDisponibles = [];
let manoJugador = [];
let manoIA = [];
let turno = 0;
let puedeJugar = true;
let esperandoObjetivo = false;

// Cargar cartas
fetch('/Apps/cartas/cartas.json')
  .then(res => res.json())
  .then(data => {
    cartasDisponibles = Object.values(data);
    iniciarJuego();
  });

// Iniciar partida
function iniciarJuego() {
  const cantidad = 5; // cartas en mano

  const mazoInicial = [];
  for (let i = 0; i < cantidad * 2; i++) {
    const cartaAleatoria = cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)];
    mazoInicial.push({ ...cartaAleatoria });
  }

  manoJugador = mazoInicial.slice(0, cantidad);
  manoIA = mazoInicial.slice(cantidad);
  turno = 0;

  mostrarMano();
  mostrarManoIA();
}

// ----------- MANO DEL JUGADOR -------------
function mostrarMano() {
  const cont = document.getElementById('mano-jugador');
  cont.innerHTML = '';

  manoJugador.forEach((carta, i) => {
    const div = document.createElement('div');
    div.className = 'carta';
    div.classList.add(carta.rareza);
    div.draggable = true;
    div.dataset.index = i;

    div.innerHTML = `
      <p class="puntaje">${carta.puntaje}</p>

      <div draggable="false" class="especialidad">
        <img class="icono-especialidad">
        <span>${carta.especialidad}</span>
      </div>

      <div class="fondo">
        <h1>${carta.categoria[0].nombre}</h1>
        <img src="${carta.fondoFrontal}">
      </div>

      <img draggable="false" class="personaje" src="${carta.imagen}">
      
      <div class="titulo">
        <span>Carta histórica</span>
        <h4>${carta.titulo}</h4>
        <span class="${carta.categoria[0].clase}">${carta.categoria[0].nombre}</span>
      </div>
    `;

    // 🔥 aplicar ícono correcto
    const icono = div.querySelector(".icono-especialidad");

    switch (carta.especialidad.trim().toLowerCase()) {

      case "agricultor":
        icono.src = "/icons/trigo.svg";
        break;

      case "intrépido":
      case "intrepido":
        icono.src = "/icons/arma.svg";
        break;

      case "pensador":
        icono.src = "/icons/cerebro.svg";
        break;

      case "compañero":
      case "companero":
        icono.src = "/icons/demografia.svg";
        break;

      default:
        icono.src = "/icons/interrogacion.svg";
    }

    // drag
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', i);
    });

    cont.appendChild(div);
  });
}


// ---------- DROP CORRECTO EN UNA DE LAS 3 ZONAS -----------

function soltarCarta(event) {
  event.preventDefault();

  const indice = parseInt(event.dataTransfer.getData("text/plain"));
  if (isNaN(indice)) return;

  // Buscar zona válida EXACTA
  const zona = event.target.closest("#zona-atacante, #zona-defensiva, #zona-recolectora");
  if (!zona) {
    console.log("Zona inválida");
    return;
  }

  // Jugar carta en la zona real
  jugarCarta(indice, zona.id);
}


// ----------- MANO IA -----------

function mostrarManoIA() {
  const cont = document.getElementById('mano-ia');
  cont.innerHTML = '';

  manoIA.forEach(() => {
    const reverso = document.createElement('div');
    reverso.className = 'carta ia';
    cont.appendChild(reverso);
  });
}


// ------------ JUGAR CARTA (ahora acepta zonaDestino real) -------------

function jugarCarta(indice, zonaDestino) {
  if (!puedeJugar) return;
  puedeJugar = false;

  const cartaJugador = manoJugador.splice(indice, 1)[0];

  // Agrega la carta a la zona donde se soltó y obten el elemento creado
  const cartaElemento = agregarCartaCampo(zonaDestino, cartaJugador, 'jugador');

  // aplicar efectos: le pasamos la carta, el dueño, la zona y el elemento creado
  aplicarEfectos(cartaJugador, 'jugador', zonaDestino, cartaElemento);
  mostrarMano();

  // Turno IA
  setTimeout(() => {

    if (esperandoObjetivo) return; // 🔥 IA espera sin hacer nada

    continuarTurnoIA(); // 👈 ahora el turno IA está separado y limpio

}, 500);
}

function continuarTurnoIA() {

    if (esperandoObjetivo) return;

    // ⏳ Retraso aleatorio antes de que la IA actúe
    const delay = Math.floor(Math.random() * 1100) + 400; 
    // entre 400 ms y 1500 ms

    setTimeout(() => {

        const cartaIA = manoIA.shift();

        if (cartaIA) {
            const cartaIAEl = agregarCartaCampo('jugadas-ia', cartaIA, 'ia');
            aplicarEfectos(cartaIA, 'ia', 'jugadas-ia', cartaIAEl);

            const contIA = document.getElementById('mano-ia');
            if (contIA.firstChild) contIA.removeChild(contIA.firstChild);
        }

        turno++;

        if (manoJugador.length === 0 && manoIA.length === 0) {
            setTimeout(mostrarResultado, 800);
        } else {
            puedeJugar = true;
            mostrarMano();
        }

    }, delay);
}


setInterval(() => {
  console.log("esperandoObjetivo =", esperandoObjetivo);
}, 1000);

function eliminarCartasEnCero() {

    // Zonas del jugador
    const zonasJugador = ["zona-atacante", "zona-defensiva", "zona-recolectora"];

    zonasJugador.forEach(z => {
        const zona = document.getElementById(z);
        if (!zona) return;

        zona.querySelectorAll(".carta").forEach(carta => {
            const p = carta.querySelector("p");
            const puntos = parseInt(p.textContent) || 0;

            if (puntos <= 0) {
                carta.classList.add("carta-muerta");
                setTimeout(() => carta.remove(), 400);
            }
        });
    });

    // Zona IA
    const zonaIA = document.getElementById("jugadas-ia");

    zonaIA.querySelectorAll(".carta").forEach(carta => {
        const p = carta.querySelector("p");
        const puntos = parseInt(p.textContent) || 0;

        if (puntos <= 0) {
            carta.classList.add("carta-muerta");
            setTimeout(() => carta.remove(), 400);
        }
    });
}

// ----------- EFECTOS -----------
// aplicarEfectos(carta, quien, zonaDestino, cartaElemento)
function aplicarEfectos(carta, quien, zonaDestino, cartaElemento = null) {
  if (!carta || !carta.especialidad) return;
  const especialidad = carta.especialidad.toLowerCase();

  // Helper: obtener todas las zonas del jugador (para compañero/pensador)
  const zonasJugador = ['zona-atacante', 'zona-defensiva', 'zona-recolectora'];

  switch (especialidad) {

    // PENSADOR: da +1 a las cartas que ya estaban en la MISMA zona (antes de jugar esta carta)
    case "pensador": {
      // si quien = jugador -> la zonaDestino será una de las zonasJugador
      // si quien = ia -> la zonaDestino será 'jugadas-ia'
      let selector;
      if (quien === 'jugador') selector = `#${zonaDestino} .carta`;
      else selector = `#jugadas-ia .carta`;

      // Aumentar todas las cartas existentes excepto la cartaElemento (si fue añadida)
      document.querySelectorAll(selector).forEach(div => {
        if (cartaElemento && div === cartaElemento) return; // no tocar la carta recién colocada
        const p = div.querySelector('p');
        if (!p) return;
        let pts = parseInt(p.textContent) || 0;
        p.textContent = pts + 1;
        p.classList.add("sumar-puntos")
      });
      break;
    }

    // AGRICULTOR: agrega una carta extra al jugador (a la mano)
    case "agricultor": {
      if (quien === "jugador") {

        // 1️⃣ Tomar carta aleatoria
        const nuevaCarta = { 
            ...cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)]
        };

        // 2️⃣ Agregarla a la mano
        manoJugador.push(nuevaCarta);

        // 3️⃣ Dibujar la mano
        mostrarMano();

        // 4️⃣ Seleccionar la última carta recién creada
        setTimeout(() => {
            const cartas = document.querySelectorAll("#mano-jugador .carta");
            const ultima = cartas[cartas.length - 1];

            if (ultima) {
                ultima.classList.add("carta-nueva");
                setTimeout(() => ultima.classList.remove("carta-nueva"), 700);
            }
        }, 10); 
     }  else {
        const nuevaCartaIA = { 
            ...cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)]
        };

        // 2️⃣ Agregar a la mano IA
        manoIA.push(nuevaCartaIA);

        // 3️⃣ Dibujar la mano IA
        mostrarManoIA();

        // 4️⃣ Animación (opcional)
        setTimeout(() => {
            const cartasIA = document.querySelectorAll("#mano-ia .carta");
            const ultimaIA = cartasIA[cartasIA.length - 1];

            if (ultimaIA) {
                ultimaIA.classList.add("carta-nueva");
                setTimeout(() => ultimaIA.classList.remove("carta-nueva"), 500);
            }
        }, 10);
      }
      break;
    }

    // INTRÉPIDO: ataca una carta que elija el jugador (o la IA elige una al azar)
    case "intrépido":
    case "intrepido": {
      
      if (quien === 'jugador') {

        const enemigos = Array.from(document.querySelectorAll('#jugadas-ia .carta'));
        if (enemigos.length === 0) break;

        // 🔒 Bloquear turno IA hasta que el jugador elija objetivo
        esperandoObjetivo = true;

        enemigos.forEach(div => div.classList.add('targetable'));

        function elegir(ev) {

          const objetivo = ev.currentTarget;
          const p = objetivo.querySelector('p');
          let pts = parseInt(p.textContent) || 0;
          const nuevo = Math.max(0, pts - 2);

          // Aplicar daño
          p.textContent = nuevo;
          p.classList.add("menos-puntos");

          objetivo.classList.add('temblor-daño');
          setTimeout(() => objetivo.classList.remove('temblor-daño'), 500);

          // Quitar selección
          enemigos.forEach(d => {
            d.classList.remove('targetable');
            d.removeEventListener('click', elegir);
          });

          // 🔓 Permitimos el turno IA
          esperandoObjetivo = false;

          eliminarCartasEnCero();

          // 💥 Ahora sí continúa el turno IA
          continuarTurnoIA();
        }

        enemigos.forEach(d => d.addEventListener('click', elegir));

      } 
      else {
        // ➤ IA usa intrepido: elige carta aleatoria del jugador
        const objetivoPool = [];

        zonasJugador.forEach(z => {
          const zonaEl = document.getElementById(z);
          if (zonaEl) {
            objetivoPool.push(...zonaEl.querySelectorAll('.carta'));
          }
        });

        if (objetivoPool.length > 0) {

          const objetivo = objetivoPool[Math.floor(Math.random() * objetivoPool.length)];
          const p = objetivo.querySelector('p');

          let pts = parseInt(p.textContent) || 0;
          p.textContent = Math.max(0, pts - 2);
          p.classList.add("menos-puntos");

          objetivo.classList.add('temblor-daño');
          setTimeout(() => objetivo.classList.remove('temblor-daño'), 500);
        }

        eliminarCartasEnCero();
      }

      break;
    }


    // COMPAÑERO: si hay 2 o más cartas iguales del mismo dueño (en sus zonas),
    // sumar +2 a cada una (si ya no tienen el bonus aplicado)
    case "compañero": {
      if (quien === 'jugador') {
        // buscar en las 3 zonas del jugador
        const todas = zonasJugador.flatMap(z => Array.from(document.querySelectorAll(`#${z} .carta`)));
        const iguales = todas.filter(div => {
          const titulo = div.querySelector('h4')?.textContent?.trim();
          const spans = Array.from(div.querySelectorAll('span'));
          const tieneComp = spans.some(s => s.textContent.toLowerCase() === 'compañero');
          return titulo === carta.titulo && tieneComp;
        });

        if (iguales.length >= 2) {
          iguales.forEach(div => {
            if (!div.dataset.companeroBonusAplicado) {
              const p = div.querySelector('p');
              let pts = parseInt(p.textContent) || 0;
              p.textContent = pts + 2;
              div.dataset.companeroBonusAplicado = "true";
              p.classList.add('brillo-bonus');
              setTimeout(() => p.classList.remove('brillo-bonus'), 800);
            }
          });
        }
      } else {
        // IA: buscar en su tablero (jugadas-ia)
        const todas = Array.from(document.querySelectorAll('#jugadas-ia .carta'));
        const iguales = todas.filter(div => {
          const titulo = div.querySelector('h4')?.textContent?.trim();
          const spans = Array.from(div.querySelectorAll('span'));
          const tieneComp = spans.some(s => s.textContent.toLowerCase() === 'compañero');
          return titulo === carta.titulo && tieneComp;
        });

        if (iguales.length >= 2) {
          iguales.forEach(div => {
            if (!div.dataset.companeroBonusAplicado) {
              const p = div.querySelector('p');
              let pts = parseInt(p.textContent) || 0;
              p.textContent = pts + 2;
              div.dataset.companeroBonusAplicado = "true";
              p.classList.add('brillo-bonus');
              setTimeout(() => p.classList.remove('brillo-bonus'), 800);
            }
          });
        }
      }
      break;
    }

    default:
      // otras especialidades (si hay) no hacen nada aquí
      break;
  }
}









// ----------- AGREGAR CARTA A UNA ZONA -----------
// ahora retorna el elemento creado y marca owner y zone
function agregarCartaCampo(zonaDestino, carta, owner = 'jugador') {
  const zona = document.getElementById(zonaDestino);
  if (!zona) return null;

  const div = document.createElement('div');
  div.className = 'carta';
  div.classList.add(carta.rareza);
  // metadata
  div.dataset.owner = owner;
  div.dataset.titulo = carta.titulo;

  div.innerHTML = `
    <p class="puntaje">${carta.puntaje}</p>
    <div draggable="false" class="especialidad">
      <img class="icono-especialidad">
      <span>${carta.especialidad}</span>
    </div>
    <div class="fondo">
      <h1>${carta.categoria[0].nombre}</h1>
      <img class="fondo-img" src="${carta.fondoFrontal}">
    </div>
    <img class="personaje" src="${carta.imagen}">
    <div class="titulo">
      <span>Carta histórica</span>
      <h4>${carta.titulo}</h4>
      <span class="${carta.categoria[0].clase}">${carta.categoria[0].nombre}</span>
    </div>
  `;

  // 🔥 aplicar ícono correcto
  const icono = div.querySelector(".icono-especialidad");

  switch (carta.especialidad.trim().toLowerCase()) {

    case "agricultor":
      icono.src = "/icons/trigo.svg";
      break;

    case "intrépido":
    case "intrepido":
      icono.src = "/icons/arma.svg";
      break;

    case "pensador":
      icono.src = "/icons/cerebro.svg";
      break;

    case "compañero":
    case "companero":
      icono.src = "/icons/demografia.svg";
      break;

    default:
      icono.src = "/icons/interrogacion.svg";
  }

  zona.appendChild(div);

  return div;
}


// ----------- RESULTADO -----------

function mostrarResultado() {
  const cartasJugador = [
    ...document.querySelectorAll('#zona-atacante .carta p'),
    ...document.querySelectorAll('#zona-defensiva .carta p'),
    ...document.querySelectorAll('#zona-recolectora .carta p')
  ];
  const cartasIA = Array.from(document.querySelectorAll('#jugadas-ia .carta p'));

  const puntajeJugador = cartasJugador.reduce((a, el) => a + parseInt(el.textContent || 0), 0);
  const puntajeIA = cartasIA.reduce((a, el) => a + parseInt(el.textContent || 0), 0);

  const res = document.getElementById('resultado');
  if (puntajeJugador > puntajeIA) res.textContent = `¡Ganaste! (${puntajeJugador} vs ${puntajeIA})`;
  else if (puntajeJugador < puntajeIA) res.textContent = `Perdiste... (${puntajeJugador} vs ${puntajeIA})`;
  else res.textContent = `Empate. (${puntajeJugador} vs ${puntajeIA})`;
}


