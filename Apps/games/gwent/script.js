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

    function jugarCarta(indice) {
      const cartaJugador = manoJugador.splice(indice, 1)[0];
      const cartaIA = manoIA.shift();

      aplicarEfectos(cartaJugador, 'jugador');
      aplicarEfectos(cartaIA, 'ia');

      mostrarMano();

      agregarCartaCampo('jugadas-jugador', cartaJugador);
      agregarCartaCampo('jugadas-ia', cartaIA);

      turno++;

      if (turno >= manoJugador.length) {
        setTimeout(mostrarResultado, 1000);
      }
    }

    function aplicarEfectos(carta, quien) {
      if (!carta.personalidad) return;

      carta.personalidad.forEach(p => {
        switch (p.nombre) {
          case "Pensador":
            const jugadas = document.querySelectorAll(`#jugadas-${quien} .carta p`);
            jugadas.forEach(p => {
              const puntos = parseInt(p.textContent);
              p.textContent = (puntos + 1) + ' pts';
            });
            break;

          case "Agricultor":
            const cartasPrevias = document.querySelectorAll(`#jugadas-${quien} .carta h4`);
            const mismaCategoria = Array.from(cartasPrevias).some(h =>
              h.textContent !== carta.titulo &&
              carta.categoria?.[0]?.nombre &&
              h.textContent.includes(carta.categoria[0].nombre)
            );
            if (mismaCategoria) {
              carta.puntaje = String(parseInt(carta.puntaje) * 2);
            }
            break;

          case "Intrépido":
            if (quien === 'jugador' && manoJugador.length < cartasDisponibles.length) {
              const restantes = cartasDisponibles.filter(c => !manoJugador.includes(c) && !manoIA.includes(c));
              if (restantes.length > 0) {
                manoJugador.push(restantes[Math.floor(Math.random() * restantes.length)]);
              }
            }
            break;
        }
      });
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

      div.style.animation = "entrar 0.5s ease";

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