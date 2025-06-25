let cartasDisponibles = [];
    let manoJugador = [];
    let manoIA = [];
    let turno = 0;

    fetch('/Apps/cartas/cartas.json')
      .then(res => res.json())
      .then(data => {
        cartasDisponibles = Object.values(data);
        iniciarJuego();
      });

    function iniciarJuego() {
      const cartasMezcladas = [...cartasDisponibles].sort(() => 0.5 - Math.random());
      const cantidad = Math.min(5, Math.floor(cartasMezcladas.length / 2));

      manoJugador = cartasMezcladas.slice(0, cantidad);
      manoIA = cartasMezcladas.slice(cantidad, cantidad * 2);
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
        div.innerHTML = `
          <img src="${carta.imagen}" alt="${carta.titulo}">
          <h4>${carta.titulo}</h4>
          <p>${carta.puntaje} pts</p>
        `;
        div.onclick = () => jugarCarta(i);
        contenedor.appendChild(div);
      });
    }

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
      const cartaJugador = manoJugador.splice(indice, 1)[0];
      const cartaIA = manoIA.shift();
    
      // Jugador juega inmediatamente
      aplicarEfectos(cartaJugador, 'jugador', cartaIA);
      agregarCartaCampo('jugadas-jugador', cartaJugador);
      mostrarMano();
    
      // 💡 Retrasar jugada IA
      setTimeout(() => {
        aplicarEfectos(cartaIA, 'ia');
        agregarCartaCampo('jugadas-ia', cartaIA);
      
        // 👇 Quita una carta del reverso visible
        const contenedorIA = document.getElementById('mano-ia');
        if (contenedorIA.firstChild) {
          contenedorIA.removeChild(contenedorIA.firstChild);
        }
      
        turno++;
      
        if (turno >= manoJugador.length) {
          setTimeout(mostrarResultado, 1000);
        }
      }, 600);// ⏱️ 600 milisegundos de espera (puedes ajustar)
    }

    function aplicarEfectos(carta, quien, cartaIA = null) {
      if (!carta.especialidad) return;
    
      const especialidad = carta.especialidad.toLowerCase();
    
      switch (especialidad) {
        case "pensador":
          const jugadas = document.querySelectorAll(`#jugadas-${quien} .carta p`);
          jugadas.forEach(p => {
            const puntos = parseInt(p.textContent);
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