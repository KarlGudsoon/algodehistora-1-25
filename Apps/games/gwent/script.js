// script.js - Versión completa (reemplaza tu archivo actual)

/* =========  Estado global ========= */
let cartasDisponibles = [];
let manoJugador = [];
let manoIA = [];
let turnoActual = "jugador"; // "jugador" | "ia"
let puedeJugar = true;
let esperandoObjetivo = false;
let oroJugador = 0;
let oroIA = 0;

/* Zonas (consistente con el HTML que acordamos) */
const zonasJugador = ['zona-atacante', 'zona-defensiva', 'zona-recolectora'];
const zonasIA = ['zona-atacante-ia', 'zona-defensa-ia', 'zona-recoleccion-ia'];

/* ========= Cargar cartas (ajusta la ruta si hace falta) ========= */
fetch('/Apps/cartas/cartas.json')
  .then(res => res.json())
  .then(data => {
    cartasDisponibles = Object.values(data);
    iniciarJuego();
  })
  .catch(err => {
    console.error('Error cargando cartas.json', err);
    // Si quieres puedes poblar cartasDisponibles con mocks aquí para pruebas.
  });

// Configuración del juego
const CONFIG_JUEGO = {
  cartasPorMano: 5,
  especialidadIA: 'intrépido', // Puedes cambiar esto fácilmente
  jugadorUsaCartasAleatorias: true,
  iaUsaEspecialidadExclusiva: true
};

/* ========= Inicio de juego ========= */
function iniciarJuego() {
  const { cartasPorMano, especialidadIA } = CONFIG_JUEGO;
  const mazoInicial = [];
  
  // Cartas para el jugador
  for (let i = 0; i < cartasPorMano; i++) {
    const cartaAleatoria = cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)];
    mazoInicial.push({ ...cartaAleatoria });
  }
  
  // Cartas para la IA
  if (CONFIG_JUEGO.iaUsaEspecialidadExclusiva) {
    const cartasEspecialidad = obtenerCartasDeEspecialidad(especialidadIA);
    repartirCartasParaIA(cartasEspecialidad, cartasPorMano, mazoInicial);
  } else {
    // IA con cartas aleatorias
    for (let i = 0; i < cartasPorMano; i++) {
      const cartaAleatoria = cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)];
      mazoInicial.push({ ...cartaAleatoria });
    }
  }
  
  manoJugador = mazoInicial.slice(0, cartasPorMano);
  manoIA = mazoInicial.slice(cartasPorMano, cartasPorMano * 2);

  mostrarMano();
  mostrarManoIA();
  mostrarOro();
  turnoJugador();
}

function obtenerCartasDeEspecialidad(especialidad) {
  return cartasDisponibles.filter(carta => {
    if (!carta.especialidad) return false;
    return carta.especialidad.toLowerCase().includes(especialidad.toLowerCase());
  });
}

function repartirCartasParaIA(cartasFiltradas, cantidad, mazoInicial) {
  if (cartasFiltradas.length === 0) {
    console.warn(`No hay cartas con especialidad "${CONFIG_JUEGO.especialidadIA}". Usando cartas aleatorias.`);
    for (let i = 0; i < cantidad; i++) {
      const cartaAleatoria = cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)];
      mazoInicial.push({ ...cartaAleatoria });
    }
    return;
  }
  
  // Si hay suficientes cartas únicas
  if (cartasFiltradas.length >= cantidad) {
    const copia = [...cartasFiltradas];
    for (let i = 0; i < cantidad; i++) {
      const randomIndex = Math.floor(Math.random() * copia.length);
      mazoInicial.push({ ...copia[randomIndex] });
      copia.splice(randomIndex, 1);
    }
  } else {
    // Usar todas las disponibles y completar con repetidas
    cartasFiltradas.forEach(carta => mazoInicial.push({ ...carta }));
    const faltantes = cantidad - cartasFiltradas.length;
    for (let i = 0; i < faltantes; i++) {
      const randomIndex = Math.floor(Math.random() * cartasFiltradas.length);
      mazoInicial.push({ ...cartasFiltradas[randomIndex] });
    }
  }
}


/* ========= Render: mano jugador ========= */
function mostrarMano(highlightIndex = -1) {
  const cont = document.getElementById('mano-jugador');
  if (!cont) return;
  cont.innerHTML = '';

  manoJugador.forEach((carta, i) => {
    const div = document.createElement('div');
    div.className = 'carta';
    if (carta.rareza) div.classList.add(carta.rareza);
    div.draggable = true;
    div.dataset.index = i;
    div.cartaData = carta;

    div.innerHTML = `
      <p class="puntaje">${carta.puntaje}</p>
      <div class="especialidad"><img class="icono-especialidad"/><span>${carta.especialidad || ''}</span></div>
      <div class="fondo"><h1>${carta.categoria?.[0]?.nombre || ''}</h1><img src="${carta.fondoFrontal || ''}"></div>
      <img draggable="false" class="personaje" src="${carta.imagen || ''}">
      <div class="contenedor-habilidades">
        <div class="fuerza">${carta.habilidades[0].fuerza || ''}</div>
        <div class="defensa">${carta.habilidades[1].defensa || ''}</div>
        <div class="recoleccion">${carta.habilidades[2].recoleccion || ''}</div>
      </div>
      <div class="titulo">
        <span>Carta histórica</span>
        <h4>${carta.titulo || ''}</h4>
        <span class="${carta.categoria?.[0]?.clase || ''}">${carta.categoria?.[0]?.nombre || ''}</span>
      </div>
    `;

    // icono según especialidad (opcional)
    const icono = div.querySelector('.icono-especialidad');
    const esp = (carta.especialidad || '').toLowerCase().trim();
    if (icono) {
      if (esp === 'agricultor') icono.src = '/icons/trigo.svg';
      else if (esp === 'intrépido' || esp === 'intrepido') icono.src = '/icons/arma.svg';
      else if (esp === 'pensador') icono.src = '/icons/cerebro.svg';
      else if (esp === 'compañero' || esp === 'companero') icono.src = '/icons/demografia.svg';
      else icono.src = '/icons/interrogacion.svg';
    }

    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', i);
    });

    // click para abrir visor si tienes implementación (opcional)
    cont.appendChild(div);

    if (i === highlightIndex) {
      div.classList.add('carta-nueva');
      setTimeout(() => div.classList.remove('carta-nueva'), 800);
    }
  });
}

/* ========= Render: mano IA (reversos) ========= */
function mostrarManoIA() {
  const cont = document.getElementById('mano-ia');
  if (!cont) return;
  cont.innerHTML = '';
  manoIA.forEach(() => {
    const reverso = document.createElement('div');
    reverso.className = 'carta ia'; // estilo reverso vía CSS
    cont.appendChild(reverso);
  });
}

/* ========= Drag & Drop: soltarCarta (usado por ondrop en HTML) ========= */
function soltarCarta(event) {
  event.preventDefault();
  if (!puedeJugar || turnoActual !== "jugador" || esperandoObjetivo) return;

  const indice = parseInt(event.dataTransfer.getData('text/plain'));
  if (isNaN(indice)) return;

  // Determinar la zona destino (puede venir del ondrop en la zona; aseguramos selector)
  const zona = event.target.closest('#zona-atacante, #zona-defensiva, #zona-recolectora');
  if (!zona) {
    // rebote visual de la carta en la mano si suelta fuera
    const cartas = document.querySelectorAll('#mano-jugador .carta');
    const carta = cartas[indice];
    if (carta) {
      carta.classList.add('rebote');
      setTimeout(() => carta.classList.remove('rebote'), 350);
    }
    return;
  }

  jugarCarta(indice, zona.id);
}

/* ========= Jugar carta (Jugador) ========= */
function jugarCarta(indice, zonaDestino) {
  if (!puedeJugar || turnoActual !== "jugador" || esperandoObjetivo) return;

  puedeJugar = false; // bloquear mientras resolvemos

  const carta = manoJugador.splice(indice, 1)[0];
  if (!carta) {
    puedeJugar = true;
    return;
  }

  // agregar a zona y aplicar efectos
  const el = agregarCartaCampo(zonaDestino, carta, 'jugador');
  aplicarEfectos(carta, 'jugador', zonaDestino, el);

  mostrarMano();

  // si intrépido provocó espera de objetivo, NO cambiamos turno aquí.
  if (!esperandoObjetivo) {
    // iniciar siguiente turno (IA): usamos flujo centralizado
    siguienteTurno();
  } else {
    // mostrar que ahora la IA está esperando (visual)
    actualizarIndicadorTurno('ia');
    // no llamar siguienteTurno hasta elegir objetivo
  }
}

/* ========= Agregar carta a zona (retorna elemento) ========= */
function agregarCartaCampo(zonaDestino, carta, owner = 'jugador') {
  const zona = document.getElementById(zonaDestino);
  if (!zona) return null;

  const div = document.createElement('div');
  div.className = 'carta';
  if (carta.rareza) div.classList.add(carta.rareza);
  div.dataset.owner = owner;
  div.dataset.titulo = carta.titulo || '';
  div.cartaData = carta;

  div.innerHTML = `
      <p class="puntaje">${carta.puntaje}</p>
      <div class="especialidad"><img class="icono-especialidad"/><span>${carta.especialidad || ''}</span></div>
      <div class="fondo"><h1>${carta.categoria?.[0]?.nombre || ''}</h1><img src="${carta.fondoFrontal || ''}"></div>
      <img draggable="false" class="personaje" src="${carta.imagen || ''}">
      <div class="contenedor-habilidades">
        <div class="fuerza">${carta.habilidades[0].fuerza || ''}</div>
        <div class="defensa">${carta.habilidades[1].defensa || ''}</div>
        <div class="recoleccion">${carta.habilidades[2].recoleccion || ''}</div>
      </div>
      <div class="titulo">
        <span>Carta histórica</span>
        <h4>${carta.titulo || ''}</h4>
        <span class="${carta.categoria?.[0]?.clase || ''}">${carta.categoria?.[0]?.nombre || ''}</span>
      </div>
    `;

  // icono según especialidad (opcional)
  const icono = div.querySelector('.icono-especialidad');
  const esp = (carta.especialidad || '').toLowerCase().trim();
  if (icono) {
    if (esp === 'agricultor') icono.src = '/icons/trigo.svg';
    else if (esp === 'intrépido' || esp === 'intrepido') icono.src = '/icons/arma.svg';
    else if (esp === 'pensador') icono.src = '/icons/cerebro.svg';
    else if (esp === 'compañero' || esp === 'companero') icono.src = '/icons/demografia.svg';
    else icono.src = '/icons/interrogacion.svg';
  }

  if (owner === 'ia') div.classList.add('enemigo');

  zona.appendChild(div);

  // simple apilamiento vertical centrado: margen negativo para superposición
  const cartas = zona.querySelectorAll('.carta');
  cartas.forEach((c, i) => {
    if (i === 0) c.style.marginTop = '0px';
    else c.style.marginTop = '-56px'; // ajusta según altura de carta
  });

  return div;
}


/* ========= Efectos de cartas ========= */
function aplicarEfectos(carta, quien, zonaDestino, cartaElemento = null) {
  if (!carta || !carta.especialidad) return;
  const esp = carta.especialidad.toLowerCase().trim();

  switch (esp) {
    case 'pensador': {
      // suma +1 a cartas que ya estaban en la MISMA zona (excepto la recién añadida)
      document.querySelectorAll(`#${zonaDestino} .carta`).forEach(div => {
        if (cartaElemento && div === cartaElemento) return;
        const p = div.querySelector('p');
        if (!p) return;
        p.textContent = (parseInt(p.textContent || '0') + 1);
      });
      eliminarCartasEnCero();
      break;
    }

    case 'agricultor': {
      if (quien === 'jugador') {
        const nueva = { ...cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)] };
        manoJugador.push(nueva);
        mostrarMano(manoJugador.length - 1);
        setTimeout(() => {
            const cartas = document.querySelectorAll("#mano-jugador .carta");
            const ultima = cartas[cartas.length - 1];

            if (ultima) {
                ultima.classList.add("carta-nueva");
                setTimeout(() => ultima.classList.remove("carta-nueva"), 700);
            }
        }, 10); 
      } else {
        const nuevaIA = { ...cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)] };
        manoIA.push(nuevaIA);
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

    case 'intrépido':
    case 'intrepido': {
      if (quien === 'jugador') {
        // marcar cartas enemigas como targetables
        const enemigos = Array.from(document.querySelectorAll('#zona-atacante-ia .carta, #zona-defensa-ia .carta, #zona-recoleccion-ia .carta'));
        if (enemigos.length === 0) break;

        esperandoObjetivo = true;
        enemigos.forEach(d => d.classList.add('targetable'));

        function elegir(ev) {
          const objetivo = ev.currentTarget;
          const p = objetivo.querySelector('p');
          const pts = parseInt(p.textContent || '0');
          const nuevo = Math.max(0, pts - 2);
          p.textContent = nuevo;
          p.classList.add('menos-puntos');
          objetivo.classList.add('temblor-daño');
          setTimeout(() => objetivo.classList.remove('temblor-daño'), 400);

          enemigos.forEach(d => {
            d.classList.remove('targetable');
            d.removeEventListener('click', elegir);
          });

          eliminarCartasEnCero();

          esperandoObjetivo = false;
          // después de elegir, la IA realiza su turno completo
          siguienteTurno();
        }

        enemigos.forEach(d => d.addEventListener('click', elegir));

      } else {
        // IA elige objetivo aleatorio entre cartas del jugador
        const pool = [];
        zonasJugador.forEach(z => {
          const zEl = document.getElementById(z);
          if (zEl) pool.push(...zEl.querySelectorAll('.carta'));
        });
        if (pool.length > 0) {
          const objetivo = pool[Math.floor(Math.random() * pool.length)];
          const p = objetivo.querySelector('p');
          p.textContent = Math.max(0, parseInt(p.textContent || '0') - 2);
          objetivo.classList.add('temblor-daño');
          p.classList.add('menos-puntos');
          setTimeout(() => objetivo.classList.remove('temblor-daño'), 400);
          eliminarCartasEnCero();
        }
      }
      break;
    }

    case 'compañero':
    case 'companero': {
      if (quien === 'jugador') {
        const todas = zonasJugador.flatMap(z => Array.from(document.querySelectorAll(`#${z} .carta`)));
        const iguales = todas.filter(div => {
          const titulo = div.querySelector('h4')?.textContent?.trim();
          const spans = Array.from(div.querySelectorAll('span'));
          const tieneComp = spans.some(s => s.textContent.toLowerCase().includes('compañero') || s.textContent.toLowerCase().includes('companero'));
          return titulo === carta.titulo && tieneComp;
        });
        if (iguales.length >= 2) {
          iguales.forEach(div => {
            if (!div.dataset.companeroBonusAplicado) {
              const p = div.querySelector('p');
              p.textContent = (parseInt(p.textContent || '0') + 2);
              div.dataset.companeroBonusAplicado = 'true';
              p.classList.add('brillo-bonus');
              setTimeout(() => p.classList.remove('brillo-bonus'), 800);
            }
          });
        }
      } else {
        const todas = zonasIA.flatMap(z => Array.from(document.querySelectorAll(`#${z} .carta`)));
        const iguales = todas.filter(div => {
          const titulo = div.querySelector('h4')?.textContent?.trim();
          const spans = Array.from(div.querySelectorAll('span'));
          const tieneComp = spans.some(s => s.textContent.toLowerCase().includes('compañero') || s.textContent.toLowerCase().includes('companero'));
          return titulo === carta.titulo && tieneComp;
        });
        if (iguales.length >= 2) {
          iguales.forEach(div => {
            if (!div.dataset.companeroBonusAplicado) {
              const p = div.querySelector('p');
              p.textContent = (parseInt(p.textContent || '0') + 2);
              div.dataset.companeroBonusAplicado = 'true';
              p.classList.add('brillo-bonus');
              setTimeout(() => p.classList.remove('brillo-bonus'), 800);
            }
          });
        }
      }
      eliminarCartasEnCero();
      break;
    }

    default:
      break;
  }
}

/* ========= Helpers para habilidades ========= */
function tieneRecoleccion(carta) {
  if (!carta || !carta.habilidades) return false;
  return carta.habilidades.some(h => typeof h.recoleccion === 'number' && h.recoleccion > 0);
}
function obtenerNivelRecoleccion(carta) {
  if (!carta || !carta.habilidades) return 0;
  for (const h of carta.habilidades) {
    if (h.recoleccion) return Number(h.recoleccion) || 0;
  }
  return 0;
}
function tieneDefensa(carta) {
  if (!carta || !carta.habilidades) return false;
  return carta.habilidades.some(h => typeof h.defensa === 'number' && h.defensa > 0);
}

/* ========= Eliminar cartas que llegan a 0 ========= */
function eliminarCartasEnCero() {
  // jugador
  zonasJugador.forEach(z => {
    const zEl = document.getElementById(z);
    if (!zEl) return;
    zEl.querySelectorAll('.carta').forEach(c => {
      const p = c.querySelector('p');
      if (!p) return;
      const pts = parseInt(p.textContent || '0');
      if (pts <= 0) {
        c.classList.add('carta-muerta');
        setTimeout(() => c.remove(), 350);
      }
    });
  });

  // IA
  zonasIA.forEach(z => {
    const zEl = document.getElementById(z);
    if (!zEl) return;
    zEl.querySelectorAll('.carta').forEach(c => {
      const p = c.querySelector('p');
      if (!p) return;
      const pts = parseInt(p.textContent || '0');
      if (pts <= 0) {
        c.classList.add('carta-muerta');
        setTimeout(() => c.remove(), 350);
      }
    });
  });
}

/* ========= Recolección con delay por carta (async) ========= */
async function generarOro(quien) {
  let zona = (quien === 'jugador') ? document.getElementById('zona-recolectora') : document.getElementById('zona-recoleccion-ia');
  if (!zona) return;

  const cartas = Array.from(zona.querySelectorAll('.carta'));
  let total = 0;

  // bloquear acciones mientras se recolecta
  puedeJugar = false;

  for (let el of cartas) {
    // asegurar cartaData
    let carta = el.cartaData;
    if (!carta) {
      const titulo = el.querySelector('h4')?.textContent;
      carta = cartasDisponibles.find(c => c.titulo === titulo);
      el.cartaData = carta;
    }
    if (!carta) continue;

    const nivel = obtenerNivelRecoleccion(carta);
    if (!nivel || nivel <= 0) continue;

    // anim y delay
    el.classList.add('recolecta-efecto');

    // mostrar flotante +n (opcional)
    mostrarFlotante(el, `+${nivel}💰`);

    const coin = new Audio('/audio/drop-coin.mp3');
    coin.play();
    coin.volume = 0.2;

    await new Promise(res => setTimeout(res, 500));

    el.classList.remove('recolecta-efecto');
    total += nivel;
  }

  if (quien === 'jugador') oroJugador += total;
  else oroIA += total;

  if (total > 0) mostrarOro();

  // desbloquear (se desbloqueará en el flujo de turnos también)
  puedeJugar = true;
}

/* helper: pequeño texto flotante sobre la carta */
function mostrarFlotante(el, texto) {
  try {
    const span = document.createElement('div');
    span.className = 'float-oro';
    span.textContent = texto;
    span.style.position = 'absolute';
    span.style.left = '50%';
    span.style.top = '5%';
    span.style.transform = 'translateX(-50%)';
    span.style.pointerEvents = 'none';
    span.style.fontWeight = '700';
    span.style.color = '#ffd700';
    el.style.position = 'relative';
    el.appendChild(span);


    setTimeout(() => {
      span.style.transition = 'transform 1s ease, opacity 2s ease';
      span.style.transform = 'translate(-50%, -40px)';
      span.style.opacity = '1';
    }, 20);
    setTimeout(() => span.remove(), 2000);
  } catch (e) { /* safe */ }
}

/* ========= Mostrar HUD de oro ========= */
function mostrarOro() {
  const j = document.getElementById('oro-j');
  const i = document.getElementById('oro-i');
  if (j) j.textContent = oroJugador;
  if (i) i.textContent = oroIA;
}

/* ========= SISTEMA DE COMBATE ========= */

/* ========= Fase de combate (las cartas atacantes luchan) ========= */
async function faseDeCombate() {
  const zonaAtacanteJugador = document.getElementById('zona-atacante');
  const zonaAtacanteIA = document.getElementById('zona-atacante-ia');
  
  if (!zonaAtacanteJugador || !zonaAtacanteIA) return;
  
  const atacantesJugador = Array.from(zonaAtacanteJugador.querySelectorAll('.carta'));
  const atacantesIA = Array.from(zonaAtacanteIA.querySelectorAll('.carta'));
  
  // Si ningún bando tiene atacantes, no hay combate
  if (atacantesJugador.length === 0 && atacantesIA.length === 0) return;
  
  puedeJugar = false;
  
  mostrarIndicadorCombate();
  await new Promise(res => setTimeout(res, 800));
  
  // Las cartas del jugador atacan
  if (atacantesJugador.length > 0) {
    await ejecutarAtaques(atacantesJugador, 'jugador', 'ia');
  }
  
  // Las cartas de la IA atacan
  if (atacantesIA.length > 0) {
    await ejecutarAtaques(atacantesIA, 'ia', 'jugador');
  }
  
  eliminarCartasEnCero();
  
  puedeJugar = true;
}

/* ========= Ejecutar ataques con bloqueo defensivo ========= */
async function ejecutarAtaques(atacantes, bandoAtacante, bandoDefensor) {
  for (let atacante of atacantes) {
    const puntosAtacante = parseInt(atacante.querySelector('p')?.textContent || '0');
    if (puntosAtacante <= 0) continue;
    
    const objetivo = buscarObjetivoConPrioridad(bandoAtacante);
    if (!objetivo) break;
    
    const cartaData = atacante.cartaData || obtenerCartaDataDeElemento(atacante);
    let danioOriginal = calcularDanioAtaque(cartaData);
    
    // NUEVO: Calcular reducción por defensores
    const { danioFinal, danioAbsorbido, defensores } = calcularBloqueoDefensivo(danioOriginal, bandoDefensor);
    
    // Animación de ataque
    await animarAtaque(atacante, objetivo, bandoAtacante);
    
    // NUEVO: Si hay defensores, mostrar animación de bloqueo
    if (danioAbsorbido >= 0 && defensores.length > 0) {
      await animarBloqueoDefensivo(defensores, danioAbsorbido);
    }
    
    // Aplicar daño reducido
    const pObjetivo = objetivo.querySelector('p');
    const puntosActuales = parseInt(pObjetivo.textContent || '0');
    const nuevoPuntaje = Math.max(0, puntosActuales - danioFinal);
    pObjetivo.textContent = nuevoPuntaje;
    pObjetivo.classList.add('menos-puntos');
    objetivo.classList.add('temblor-daño');
    
    // Mostrar daño con indicador de bloqueo si aplica
    if (danioAbsorbido > 0) {
      mostrarFlotante(objetivo, `-${danioFinal}⚔️ (🛡️-${danioAbsorbido})`);
    } else {
      mostrarFlotante(objetivo, `-${danioFinal}⚔️`);
    }
    
    await new Promise(res => setTimeout(res, 500));
    objetivo.classList.remove('temblor-daño');
  }
}

/* ========= Calcular bloqueo defensivo ========= */
function calcularBloqueoDefensivo(danioOriginal, bandoDefensor) {
  // Obtener zona defensiva del bando defensor
  let zonaDefensivaId;
  if (bandoDefensor === 'jugador') {
    zonaDefensivaId = 'zona-defensiva';
  } else {
    zonaDefensivaId = 'zona-defensa-ia';
  }
  
  const zonaDefensiva = document.getElementById(zonaDefensivaId);
  if (!zonaDefensiva) {
    return { danioFinal: danioOriginal, danioAbsorbido: 0, defensores: [] };
  }
  
  const defensores = Array.from(zonaDefensiva.querySelectorAll('.carta')).filter(carta => {
    const pts = parseInt(carta.querySelector('p')?.textContent || '0');
    return pts > 0;
  });
  
  if (defensores.length === 0) {
    return { danioFinal: danioOriginal, danioAbsorbido: 0, defensores: [] };
  }
  
  // Calcular reducción total basada en la defensa de todas las cartas
  let reduccionTotal = 0;
  
  defensores.forEach(defensor => {
    const cartaData = defensor.cartaData || obtenerCartaDataDeElemento(defensor);
    if (cartaData && cartaData.habilidades) {
      for (const hab of cartaData.habilidades) {
        if (hab.defensa && hab.defensa > 0) {
          // Cada punto de defensa reduce un 25% del daño
          reduccionTotal += hab.defensa * 25;
        }
      }
    }
  });
  
  // Limitar reducción al 80% máximo (para que siempre pase algo de daño)
  reduccionTotal = Math.min(reduccionTotal, 80);
  
  // Calcular daño absorbido y daño final
  const danioAbsorbido = Math.floor((danioOriginal * reduccionTotal) / 100);
  const danioFinal = Math.max(0, danioOriginal - danioAbsorbido); // Mínimo 0 de daño
  
  return { danioFinal, danioAbsorbido, defensores };
}

/* ========= Animación de bloqueo defensivo ========= */
async function animarBloqueoDefensivo(defensores, danioAbsorbido) {
  // Animar todos los defensores que bloquearon
  defensores.forEach(defensor => {
    defensor.classList.add('bloqueando');
    
    // Mostrar escudo visual
    const escudo = document.createElement('div');
    escudo.textContent = '🛡️';
    escudo.style.position = 'absolute';
    escudo.style.fontSize = '32px';
    escudo.style.left = '50%';
    escudo.style.top = '50%';
    escudo.style.transform = 'translate(-50%, -50%)';
    escudo.style.pointerEvents = 'none';
    escudo.style.animation = 'escudoPulso 0.5s ease-out';
    escudo.style.zIndex = '999';
    
    defensor.style.position = 'relative';
    defensor.appendChild(escudo);
    
    setTimeout(() => {
      escudo.remove();
      defensor.classList.remove('bloqueando');
    }, 500);
  });
  
  await new Promise(res => setTimeout(res, 400));
}

/* ========= Buscar objetivo con sistema de prioridades ========= */
function buscarObjetivoConPrioridad(bandoAtacante) {
  // Determinar las zonas enemigas según quién ataca
  let zonasEnemigas;
  if (bandoAtacante === 'jugador') {
    // El jugador ataca a la IA
    zonasEnemigas = [
      'zona-atacante-ia',    // Prioridad 1
      'zona-defensa-ia',     // Prioridad 2
      'zona-recoleccion-ia'  // Prioridad 3
    ];
  } else {
    // La IA ataca al jugador
    zonasEnemigas = [
      'zona-atacante',       // Prioridad 1
      'zona-defensiva',      // Prioridad 2
      'zona-recolectora'     // Prioridad 3
    ];
  }
  
  // Buscar en orden de prioridad
  for (let zonaId of zonasEnemigas) {
    const zona = document.getElementById(zonaId);
    if (!zona) continue;
    
    // Filtrar solo cartas vivas
    const cartasVivas = Array.from(zona.querySelectorAll('.carta')).filter(carta => {
      const pts = parseInt(carta.querySelector('p')?.textContent || '0');
      return pts > 0;
    });
    
    // Si hay cartas vivas en esta zona, elegir una aleatoriamente
    if (cartasVivas.length > 0) {
      return cartasVivas[Math.floor(Math.random() * cartasVivas.length)];
    }
  }
  
  // No hay objetivos disponibles
  return null;
}

/* ========= Calcular daño de ataque ========= */
function calcularDanioAtaque(carta) {
  if (!carta || !carta.habilidades) return 1;
  
  // Buscar valor de fuerza
  for (const hab of carta.habilidades) {
    if (hab.fuerza && hab.fuerza > 0) {
      return hab.fuerza;
    }
  }
  
  // Si no tiene fuerza definida, usar 1 de daño base
  return 1;
}

/* ========= Obtener carta data de elemento DOM ========= */
function obtenerCartaDataDeElemento(elemento) {
  if (elemento.cartaData) return elemento.cartaData;
  
  const titulo = elemento.querySelector('h4')?.textContent?.trim();
  if (titulo) {
    const carta = cartasDisponibles.find(c => c.titulo === titulo);
    if (carta) {
      elemento.cartaData = carta;
      return carta;
    }
  }
  
  return null;
}

/* ========= Animación de ataque ========= */
async function animarAtaque(atacante, objetivo, bandoAtacante) {
  // Resaltar atacante
  atacante.classList.add('atacando');
  await new Promise(res => setTimeout(res, 200));
  
  // Crear proyectil visual
  crearProyectil(atacante, objetivo, bandoAtacante);
  
  await new Promise(res => setTimeout(res, 300));
  atacante.classList.remove('atacando');
}

/* ========= Crear proyectil visual ========= */
function crearProyectil(desde, hacia, bando) {
  const proyectil = document.createElement('div');
  proyectil.className = 'proyectil-ataque';
  proyectil.textContent = '⚔️';
  
  const rectDesde = desde.getBoundingClientRect();
  const rectHacia = hacia.getBoundingClientRect();
  
  proyectil.style.position = 'fixed';
  proyectil.style.left = rectDesde.left + rectDesde.width / 2 + 'px';
  proyectil.style.top = rectDesde.top + rectDesde.height / 2 + 'px';
  proyectil.style.fontSize = '24px';
  proyectil.style.zIndex = '10000';
  proyectil.style.pointerEvents = 'none';
  proyectil.style.transition = 'all 0.3s ease-out';
  
  document.body.appendChild(proyectil);
  
  setTimeout(() => {
    proyectil.style.left = rectHacia.left + rectHacia.width / 2 + 'px';
    proyectil.style.top = rectHacia.top + rectHacia.height / 2 + 'px';
    proyectil.style.opacity = '0';
    proyectil.style.transform = 'scale(1.5)';
  }, 10);
  
  setTimeout(() => proyectil.remove(), 350);
}

/* ========= Indicadores de combate ========= */
function mostrarIndicadorCombate() {
  const indicador = document.getElementById('turno-indicador');
  if (indicador) {
    indicador.textContent = '⚔️ FASE DE COMBATE ⚔️';
    indicador.classList.remove('jugador', 'ia');
    indicador.classList.add('combate');
  }
}

function ocultarIndicadorCombate() {
  actualizarIndicadorTurno(turnoActual);
}

/* ========= Fase de curación (solo cartas con especialidad "Sanador") ========= */
async function faseDeCuracion() {
  const todasLasZonas = [
    { id: 'zona-atacante', bando: 'jugador' },
    { id: 'zona-defensiva', bando: 'jugador' },
    { id: 'zona-recolectora', bando: 'jugador' },
    { id: 'zona-atacante-ia', bando: 'ia' },
    { id: 'zona-defensa-ia', bando: 'ia' },
    { id: 'zona-recoleccion-ia', bando: 'ia' }
  ];
  
  let haySanadores = false;
  
  // Buscar todas las cartas con especialidad "Sanador"
  for (let zona of todasLasZonas) {
    const zonaElemento = document.getElementById(zona.id);
    if (!zonaElemento) continue;
    
    const cartasSanador = Array.from(zonaElemento.querySelectorAll('.carta')).filter(carta => {
      const pts = parseInt(carta.querySelector('p')?.textContent || '0');
      if (pts <= 0) return false;
      
      const cartaData = carta.cartaData || obtenerCartaDataDeElemento(carta);
      if (!cartaData) return false;
      
      const especialidad = (cartaData.especialidad || '').toLowerCase().trim();
      return especialidad === 'sanador';
    });
    
    if (cartasSanador.length > 0) {
      haySanadores = true;
      
      // Mostrar indicador solo si hay sanadores
      if (!document.getElementById('turno-indicador').classList.contains('curacion')) {
        mostrarIndicadorCuracion();
        await new Promise(res => setTimeout(res, 600));
      }
      
      // Cada sanador cura cartas de su mismo bando
      for (let sanador of cartasSanador) {
        await ejecutarCuracionSanador(sanador, zona.bando);
      }
    }
  }
  
  if (haySanadores) {
    await new Promise(res => setTimeout(res, 300));
  }
  
  puedeJugar = true;
}

/* ========= Ejecutar curación de un sanador ========= */
async function ejecutarCuracionSanador(sanador, bando) {
  // Obtener zonas del mismo bando
  let zonasAliadas;
  if (bando === 'jugador') {
    zonasAliadas = ['zona-atacante'];
  } else {
    zonasAliadas = ['zona-atacante-ia']; 
  }
  
  // Recopilar todas las cartas aliadas (excepto el sanador mismo)
  const cartasAliadas = [];
  zonasAliadas.forEach(zonaId => {
    const zona = document.getElementById(zonaId);
    if (zona) {
      Array.from(zona.querySelectorAll('.carta')).forEach(carta => {
        if (carta !== sanador) {
          const pts = parseInt(carta.querySelector('p')?.textContent || '0');
          if (pts > 0) cartasAliadas.push(carta);
        }
      });
    }
  });
  
  if (cartasAliadas.length === 0) return;
  
  // Elegir objetivo para curar (prioriza más dañados)
  const objetivo = elegirAtacanteParaCurar(cartasAliadas);
  if (!objetivo) return;
  
  // Calcular curación
  const cartaData = sanador.cartaData || obtenerCartaDataDeElemento(sanador);
  let curacion = calcularCuracion(cartaData);
  
  // Animación
  await animarCuracion(sanador, objetivo);
  
  // Aplicar curación
  const pObjetivo = objetivo.querySelector('p');
  const puntosActuales = parseInt(pObjetivo.textContent || '0');
  const nuevoPuntaje = puntosActuales + curacion;
  pObjetivo.textContent = nuevoPuntaje;
  pObjetivo.classList.add('sumar-puntos');
  objetivo.classList.add('brillo-curacion');
  
  mostrarFlotante(objetivo, `+${curacion}💚`);
  
  await new Promise(res => setTimeout(res, 350));
  
  setTimeout(() => {
    pObjetivo.classList.remove('sumar-puntos');
    objetivo.classList.remove('brillo-curacion');
  }, 400);
}

/* ========= Elegir atacante para curar (prioriza más dañados) ========= */
function elegirAtacanteParaCurar(atacantes) {
  // Calcular el puntaje original de cada carta (aproximado por rareza o un valor fijo)
  const atacantesConInfo = atacantes.map(atc => {
    const cartaData = atc.cartaData || obtenerCartaDataDeElemento(atc);
    const puntajeOriginal = cartaData ? parseInt(cartaData.puntaje || 10) : 10;
    const puntajeActual = parseInt(atc.querySelector('p')?.textContent || '0');
    const dañoRecibido = Math.max(0, puntajeOriginal - puntajeActual);
    
    return { elemento: atc, dañoRecibido, puntajeActual };
  });
  
  // Filtrar solo los que tienen daño
  const dañados = atacantesConInfo.filter(a => a.dañoRecibido > 0);
  
  if (dañados.length > 0) {
    // 70% de probabilidad de curar al más dañado
    if (Math.random() < 0.7) {
      dañados.sort((a, b) => b.dañoRecibido - a.dañoRecibido);
      return dañados[0].elemento;
    }
  }
  
  // Si no hay dañados o el 30% restante, elegir aleatorio
  return atacantes[Math.floor(Math.random() * atacantes.length)];
}

/* ========= Calcular curación ========= */
function calcularCuracion(carta) {
  if (!carta || !carta.habilidades) return 1;
  
  // Buscar valor de defensa
  for (const hab of carta.habilidades) {
    if (hab.defensa && hab.defensa > 0) {
      return hab.defensa;
    }
  }
  
  // Si no tiene defensa definida, curar 1 punto
  return 1;
}

/* ========= Animación de curación ========= */
async function animarCuracion(defensor, atacante) {
  // Resaltar defensor
  defensor.classList.add('curando');
  await new Promise(res => setTimeout(res, 200));
  
  // Crear partícula de curación
  crearParticulaCuracion(defensor, atacante);
  
  await new Promise(res => setTimeout(res, 350));
  defensor.classList.remove('curando');
}

/* ========= Crear partícula de curación ========= */
function crearParticulaCuracion(desde, hacia) {
  const particula = document.createElement('div');
  particula.className = 'particula-curacion';
  particula.textContent = '💚';
  
  const rectDesde = desde.getBoundingClientRect();
  const rectHacia = hacia.getBoundingClientRect();
  
  particula.style.position = 'fixed';
  particula.style.left = rectDesde.left + rectDesde.width / 2 + 'px';
  particula.style.top = rectDesde.top + rectDesde.height / 2 + 'px';
  particula.style.fontSize = '24px';
  particula.style.zIndex = '10000';
  particula.style.pointerEvents = 'none';
  particula.style.transition = 'all 0.4s ease-out';
  
  document.body.appendChild(particula);
  
  setTimeout(() => {
    particula.style.left = rectHacia.left + rectHacia.width / 2 + 'px';
    particula.style.top = rectHacia.top + rectHacia.height / 2 + 'px';
    particula.style.opacity = '0';
    particula.style.transform = 'scale(1.5)';
  }, 10);
  
  setTimeout(() => particula.remove(), 450);
}

/* ========= Indicador de curación ========= */
function mostrarIndicadorCuracion() {
  const indicador = document.getElementById('turno-indicador');
  if (indicador) {
    indicador.textContent = '💚 FASE DE CURACIÓN 💚';
    indicador.className = 'turno curacion';
  }
}

/* ========= Turnos: indicador y flujo ========= */
function actualizarIndicadorTurno(quien) {
  const ind = document.getElementById('turno-indicador');
  if (!ind) return;
  if (quien === 'jugador') {
    ind.textContent = '⭐ Turno del jugador';
    ind.classList.remove('ia');
    ind.classList.remove('combate');
    ind.classList.add('jugador');
  } else {
    ind.textContent = '🤖 Turno de la IA';
    ind.classList.remove('jugador');
    ind.classList.remove('combate');
    ind.classList.add('ia');
  }
}

/* inicia turno del jugador (recolección primero) */
async function turnoJugador() {
  turnoActual = 'jugador';
  actualizarIndicadorTurno('jugador');
  // esperar recolección
  await generarOro('jugador');
  // permitir jugar
  puedeJugar = true;
}

/* inicia turno de la IA (recolección + jugar) */
async function turnoIA() {
  turnoActual = 'ia';
  actualizarIndicadorTurno('ia');
  puedeJugar = false;
  await generarOro('ia');

  // retraso aleatorio antes de jugar para simular pensamiento
  const delay = Math.floor(Math.random() * 1100) + 800;
  setTimeout(() => {
    iaJugarCarta();
  }, delay);
}

/* avanzar al siguiente turno */
async function siguienteTurno() {
  // Ejecutar fase de combate
  await faseDeCombate();
  
  // Ejecutar fase de curación (después del combate)
  await faseDeCuracion();
  
  // Cambiar de turno
  if (turnoActual === 'jugador') {
    turnoIA();
  } else {
    turnoJugador();
  }
}

/* ========= IA juega carta (con lógica mejorada) ========= */
function iaJugarCarta() {
  if (manoIA.length === 0) {
    siguienteTurno();
    return;
  }

  // Evaluar todas las cartas y elegir la mejor jugada
  const mejorJugada = evaluarMejorJugada();
  
  if (!mejorJugada) {
    siguienteTurno();
    return;
  }

  const { indice, zona } = mejorJugada;
  const cartaIA = manoIA.splice(indice, 1)[0];

  const el = agregarCartaCampo(zona, cartaIA, 'ia');
  aplicarEfectos(cartaIA, 'ia', zona, el);

  mostrarManoIA();

  setTimeout(() => {
    eliminarCartasEnCero();
    siguienteTurno();
  }, 350);
}

/* ========= Evaluar mejor jugada para la IA ========= */
function evaluarMejorJugada() {
  if (manoIA.length === 0) return null;

  let mejorPuntuacion = -Infinity;
  let mejorJugada = null;

  // Evaluar cada carta en la mano
  manoIA.forEach((carta, indice) => {
    const evaluaciones = evaluarCartaParaZonas(carta);
    
    // Encontrar la mejor zona para esta carta
    let mejorZonaLocal = null;
    let mejorPuntosLocal = -Infinity;

    for (const [zona, puntos] of Object.entries(evaluaciones)) {
      if (puntos > mejorPuntosLocal) {
        mejorPuntosLocal = puntos;
        mejorZonaLocal = zona;
      }
    }

    // Comparar con la mejor jugada general
    if (mejorPuntosLocal > mejorPuntuacion) {
      mejorPuntuacion = mejorPuntosLocal;
      mejorJugada = { indice, zona: mejorZonaLocal };
    }
  });

  return mejorJugada;
}

/* ========= Evaluar carta para cada zona ========= */
function evaluarCartaParaZonas(carta) {
  if (!carta || !carta.habilidades) {
    return {
      'zona-atacante-ia': carta.puntaje || 0,
      'zona-defensa-ia': carta.puntaje || 0,
      'zona-recoleccion-ia': carta.puntaje || 0
    };
  }

  const habs = carta.habilidades;
  let fuerza = 0, defensa = 0, recoleccion = 0;

  habs.forEach(h => {
    if (h.fuerza) fuerza = h.fuerza;
    if (h.defensa) defensa = h.defensa;
    if (h.recoleccion) recoleccion = h.recoleccion;
  });

  const puntajeBase = parseInt(carta.puntaje) || 0;
  const especialidad = (carta.especialidad || '').toLowerCase().trim();

  // Calcular puntuación para cada zona
  const evaluaciones = {
    'zona-atacante-ia': calcularPuntuacionAtaque(puntajeBase, fuerza, especialidad),
    'zona-defensa-ia': calcularPuntuacionDefensa(puntajeBase, defensa, especialidad),
    'zona-recoleccion-ia': calcularPuntuacionRecoleccion(puntajeBase, recoleccion, especialidad)
  };

  return evaluaciones;
}

/* ========= Cálculo de puntuación por zona ========= */
function calcularPuntuacionAtaque(puntaje, fuerza, especialidad) {
  let puntos = puntaje * 1.5; // Base: el puntaje importa en ataque
  puntos += fuerza * 15; // Fuerza es muy valiosa aquí
  
  if (especialidad === 'intrépido' || especialidad === 'intrepido') {
    puntos += 25; // Bonus por habilidad ofensiva
  }
  
  // Añadir algo de aleatoriedad (±20%)
  puntos *= (0.9 + Math.random() * 0.2);
  
  return puntos;
}

function calcularPuntuacionDefensa(puntaje, defensa, especialidad) {
  let puntos = puntaje * 1.2; // El puntaje importa moderadamente
  puntos += defensa * 18; // Defensa es crucial aquí
  
  if (especialidad === 'pensador') {
    puntos += 20; // Pensador fortalece la zona
  }
  
  // Considerar estado actual: si tengo pocas defensas, priorizar
  const cartasEnDefensa = document.querySelectorAll('#zona-defensa-ia .carta').length;
  if (cartasEnDefensa < 2) {
    puntos *= 1.3;
  }
  
  puntos *= (0.9 + Math.random() * 0.2);
  
  return puntos;
}

function calcularPuntuacionRecoleccion(puntaje, recoleccion, especialidad) {
  let puntos = puntaje * 0.8; // El puntaje importa menos aquí
  puntos += recoleccion * 25; // Recolección es lo más importante
  
  if (especialidad === 'agricultor') {
    puntos += 30; // Bonus significativo por especialidad
  }
  
  if (especialidad === 'compañero' || especialidad === 'companero') {
    puntos += 15; // Bonus moderado
  }
  
  // Estrategia: priorizar recolección al inicio
  const turnosJugados = 10 - manoIA.length; // Aproximación
  if (turnosJugados < 3 && recoleccion > 0) {
    puntos *= 1.4; // Invertir en economía temprana
  }
  
  puntos *= (0.9 + Math.random() * 0.2);
  
  return puntos;
}

/* ========= Resultado final ========= */
function mostrarResultado() {
  // sumar puntajes de todas las zonas
  const cartasJugador = [
    ...document.querySelectorAll('#zona-atacante .carta p'),
    ...document.querySelectorAll('#zona-defensiva .carta p'),
    ...document.querySelectorAll('#zona-recolectora .carta p')
  ];
  const cartasIAp = [
    ...document.querySelectorAll('#zona-atacante-ia .carta p'),
    ...document.querySelectorAll('#zona-defensa-ia .carta p'),
    ...document.querySelectorAll('#zona-recoleccion-ia .carta p')
  ];

  const puntajeJugador = cartasJugador.reduce((a, el) => a + parseInt(el.textContent || 0), 0);
  const puntajeIA = cartasIAp.reduce((a, el) => a + parseInt(el.textContent || 0), 0);

  const res = document.getElementById('resultado');
  if (!res) return;
  if (puntajeJugador > puntajeIA) res.textContent = `¡Ganaste! (${puntajeJugador} vs ${puntajeIA})`;
  else if (puntajeJugador < puntajeIA) res.textContent = `Perdiste... (${puntajeJugador} vs ${puntajeIA})`;
  else res.textContent = `Empate. (${puntajeJugador} vs ${puntajeIA})`;
}

/* ========= Utilidades / debug ========= */
// Descomenta si quieres ver el estado periódicamente
// setInterval(() => console.log('estado:', { turnoActual, puedeJugar, esperandoObjetivo, oroJugador, oroIA, manoJugador: manoJugador.length, manoIA: manoIA.length }), 2500);
