document.addEventListener("DOMContentLoaded", function () {
    const cartas = document.querySelectorAll(".carta");
    const fondoJuegoMesa = document.getElementById("juego-mesa-fondo");

    // Evento para detectar clic en una carta
    cartas.forEach(carta => {
        carta.addEventListener("click", function (event) {
            const sonidoClick = new Audio("/audio/seleccion2.mp3");
            sonidoClick.play();
            cartas.forEach(c => c.classList.remove("clickeada"));
            this.classList.add("clickeada");
            fondoJuegoMesa.classList.add("bloqueado");
            event.stopPropagation();
        });
    });

    // Evento para detectar clic fuera de las cartas
    document.addEventListener("click", function () {
        cartas.forEach(carta => carta.classList.remove("clickeada"));
        fondoJuegoMesa.classList.remove("bloqueado");
        
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dadoBtn = document.querySelector(".boton-dado");
    const dados = document.querySelectorAll(".dado");
    const resultadoDadoSpan = document.getElementById("resultado-dado");
    const resultadoCasillas = document.querySelector(".resultado-casillas");
    const cartasSituacion = document.querySelectorAll(".carta-situacion, .carta-situacion-verde"); // Incluye cartas verdes
    const dineroObreroSpan = document.getElementById("dinero-obrero");
    const dineroPorPagarSpan = document.getElementById("dinero-por-pagar");
    const conjuntoBilletes500 = document.querySelector(".conjunto-billetes-500");
    const conjuntoBilletes1000 = document.querySelector(".conjunto-billetes-1000");
    const conjuntoBilletes2000 = document.querySelector(".conjunto-billetes-2000");
    const depositoBilletes = document.querySelector(".deposito-billetes");
    const pagarBtn = document.querySelector(".boton-pagar");

    let posicionActual = 1;
    const totalCasillas = 38;
    let enMovimiento = false;
    let deudaMaxima = 0;
    let deudaPagada = false;
    let contadorVueltas = 0; // Contador de vueltas

    // Calcula el dinero total del obrero
    function calcularDineroObrero() {
        let total = 0;
        document.querySelectorAll(".conjunto-billetes-500 .billete, .conjunto-billetes-1000 .billete, .conjunto-billetes-2000 .billete").forEach(billete => {
            total += parseInt(billete.dataset.cantidad, 10);
        });
        dineroObreroSpan.textContent = total;
    }

    // Verifica si hay una deuda activa
    function hayDeudaActiva() {
        const cartaActiva = document.querySelector(".carta-situacion.active");
        return cartaActiva && cartaActiva.querySelector(".carta-dinero[data-dinero='pierde']");
    }

    // Evento para lanzar el dado
    dadoBtn.addEventListener("click", function () {
        if (hayDeudaActiva() && !deudaPagada) {
            alert("Debes pagar la deuda antes de lanzar el dado.");
            return;
        }

        if (enMovimiento) {
            alert("No puedes lanzar el dado mientras te mueves.");
            return;
        }

        enMovimiento = true;
        dadoBtn.disabled = true;

        let resultadoDado = Math.floor(Math.random() * 6) + 1;
        const sonidoDado = new Audio("/audio/dado.mp3");
        sonidoDado.play();

        animarDado(resultadoDado, () => {
            resultadoDadoSpan.textContent = resultadoDado;
            resultadoCasillas.classList.add("active");

            setTimeout(() => {
                resultadoCasillas.classList.remove("active");
            }, 3000);

            let nuevaPosicion = posicionActual + resultadoDado;

            if (nuevaPosicion > totalCasillas) {
                nuevaPosicion = nuevaPosicion - totalCasillas;
            }

            cartasSituacion.forEach(carta => carta.classList.remove("active"));

            animarMovimiento(posicionActual, nuevaPosicion, () => {
                setTimeout(() => {
                    enMovimiento = false;
                    dadoBtn.disabled = false;

                    const nuevaCasilla = document.getElementById(`e-${nuevaPosicion}`);
                    if (nuevaCasilla && nuevaCasilla.dataset.casilla === "situacion") {
                        const cartaAleatoria = cartasSituacion[Math.floor(Math.random() * cartasSituacion.length)];
                        cartaAleatoria.classList.add("active");
                        const sonidoCarta = new Audio("/audio/carta.mp3");
                        sonidoCarta.play();

                        setTimeout(() => {
                            const cartaDinero = cartaAleatoria.querySelector(".carta-dinero");
                            if (cartaDinero) {
                                if (cartaDinero.dataset.dinero === "pierde") {
                                    deudaMaxima = parseInt(cartaDinero.textContent, 10);
                                    dineroPorPagarSpan.textContent = deudaMaxima;
                                    deudaPagada = false;
                                } else if (cartaDinero.dataset.dinero === "gana") {
                                    const dineroGanado = parseInt(cartaDinero.textContent, 10);
                                    agregarDineroAlJugador(dineroGanado); // Función para agregar dinero
                                }
                            }
                        }, 1000);
                    }
                }, 500);
            });

            posicionActual = nuevaPosicion;
        });
    });

    // Función para agregar dinero al jugador
    function agregarDineroAlJugador(cantidad) {
        const billetesDisponibles = [
            { valor: 2000, contenedor: conjuntoBilletes2000 },
            { valor: 1000, contenedor: conjuntoBilletes1000 },
            { valor: 500, contenedor: conjuntoBilletes500 },
        ];

        let cantidadRestante = cantidad;

        billetesDisponibles.forEach(billete => {
            while (cantidadRestante >= billete.valor) {
                const nuevoBillete = document.createElement("span");
                nuevoBillete.classList.add("billete", `b-${billete.valor}`);
                nuevoBillete.setAttribute("data-cantidad", billete.valor);
                nuevoBillete.setAttribute("draggable", true);
                nuevoBillete.textContent = billete.valor;

                // Configurar eventos de arrastre para el nuevo billete
                configurarArrastreBillete(nuevoBillete);

                billete.contenedor.appendChild(nuevoBillete);
                cantidadRestante -= billete.valor;
            }
        });

        calcularDineroObrero(); // Actualizar el dinero del obrero
    }

    // Configurar eventos de arrastre para un billete
    function configurarArrastreBillete(billete) {
        billete.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text", e.target.dataset.cantidad);
            e.target.classList.add("dragging");
            const sonidoArrastrar2 = new Audio("/audio/seleccionpop.mp3");
            sonidoArrastrar2.play();
            
        });

        billete.addEventListener("dragend", function (e) {
            e.target.classList.remove("dragging");
        });

        billete.addEventListener("click", function (e) {
            const sonidoArrastrar = new Audio("/audio/seleccionpop.mp3");
            sonidoArrastrar.play();
        });
    }

    // Configurar eventos de arrastre para los billetes iniciales
    document.querySelectorAll(".billete").forEach(billete => {
        configurarArrastreBillete(billete);
    });

    // Permite soltar billetes en el depósito solo si hay una deuda activa
    depositoBilletes.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    depositoBilletes.addEventListener("drop", function (e) {
        e.preventDefault();

        const sonidoDejar = new Audio("/audio/pop.mp3");
        sonidoDejar.play();

        if (parseInt(dineroPorPagarSpan.textContent, 10) === 0) {
            alert("No hay una deuda activa para pagar.");
            return;
        }

        const draggingElement = document.querySelector(".dragging");
        if (!draggingElement || !draggingElement.classList.contains("billete")) return;

        depositoBilletes.appendChild(draggingElement);
    });

    // Permite soltar billetes en sus respectivos contenedores
    function permitirDropEnConjunto(conjunto, valor) {
        conjunto.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        conjunto.addEventListener("drop", function (e) {
            e.preventDefault();

            const draggingElement = document.querySelector(".dragging");
            if (!draggingElement || !draggingElement.classList.contains("billete")) return;

            if (parseInt(draggingElement.dataset.cantidad, 10) === valor) {
                if (draggingElement.parentElement === conjunto) {
                    return;
                }

                conjunto.appendChild(draggingElement);
            } else {
                alert("No puedes soltar este billete aquí.");
            }
        });
    }

    permitirDropEnConjunto(conjuntoBilletes500, 500);
    permitirDropEnConjunto(conjuntoBilletes1000, 1000);
    permitirDropEnConjunto(conjuntoBilletes2000, 2000);

    // Evento para pagar la deuda
    pagarBtn.addEventListener("click", function () {
        const totalDepositado = Array.from(depositoBilletes.querySelectorAll(".billete")).reduce((total, billete) => {
            return total + parseInt(billete.dataset.cantidad, 10);
        }, 0);

        const sonidoPagar = new Audio("/audio/seleccion.mp3");
        sonidoPagar.play();


        if (totalDepositado >= deudaMaxima) {
            depositoBilletes.innerHTML = "";

            const cartaActiva = document.querySelector(".carta-situacion.active");
            if (cartaActiva) {
                cartaActiva.classList.remove("active");
            }

            calcularDineroObrero();
            dineroPorPagarSpan.textContent = "0";
            deudaPagada = true;
        } else {
            alert("No has depositado suficiente dinero para pagar la deuda.");
        }
    });

    pagarBtn.addEventListener("click", pagarDeuda);
    pagarBtn.addEventListener("touchstart", pagarDeuda);
    pagarBtn.addEventListener("touchend", pagarDeuda);

    // Animación del dado
    function animarDado(resultado, callback) {
        let contador = 0;
        const interval = setInterval(() => {
            dados.forEach(dado => dado.classList.remove("activo"));
            const randomDado = Math.floor(Math.random() * 6) + 1;
            document.getElementById(`dado-${randomDado}`).classList.add("activo");

            contador++;
            if (contador > 10) {
                clearInterval(interval);
                dados.forEach(dado => dado.classList.remove("activo"));
                document.getElementById(`dado-${resultado}`).classList.add("activo");
                callback();
            }
        }, 100);
    }

    // Animación del movimiento del jugador
    function animarMovimiento(posicionAnterior, nuevaPosicion, callback) {
        const jugador = document.getElementById("player-1");
        let actual = posicionAnterior;

        function mover() {
            let siguientePosicion = actual + 1;
            const sonidoPaso = new Audio("/audio/paso.mp3");
            sonidoPaso.play();

            if (siguientePosicion > totalCasillas) {
                siguientePosicion = 1;
                contadorVueltas++; // Incrementar el contador de vueltas
            }

            const casillaAnterior = document.getElementById(`e-${actual}`);
            const nuevaCasilla = document.getElementById(`e-${siguientePosicion}`);

            if (casillaAnterior) {
                casillaAnterior.innerHTML = "";
            }

            if (nuevaCasilla) {
                nuevaCasilla.appendChild(jugador);
            }

            actual = siguientePosicion;

            if (actual !== nuevaPosicion) {
                setTimeout(mover, 300);
            } else {
                // Verificar si el jugador ha pasado por la casilla de salario
                if (nuevaCasilla && nuevaCasilla.dataset.casilla === "salario" && contadorVueltas > 0) {
                    agregarDineroAlJugador(500); // Agregar billete de 500
                }

                callback();
            }
        }
        mover();
    }

    // Inicializa el dinero del obrero
    calcularDineroObrero();
});