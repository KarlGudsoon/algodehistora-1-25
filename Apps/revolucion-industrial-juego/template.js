document.addEventListener("DOMContentLoaded", function () {
    const cartas = document.querySelectorAll(".carta");
    const fondoJuegoMesa = document.getElementById("juego-mesa-fondo");

    // Evento para detectar clic en una carta
    cartas.forEach(carta => {
        carta.addEventListener("click", function (event) {
            // Removemos la clase 'clickeada' de todas las cartas
            cartas.forEach(c => c.classList.remove("clickeada"));

            // Agregamos la clase 'clickeada' solo a la carta clickeada
            this.classList.add("clickeada");

            // Agregamos la clase 'bloqueado' al fondo
            fondoJuegoMesa.classList.add("bloqueado");

            // Evitamos que el clic en la carta se propague al documento
            event.stopPropagation();
        });
    });

    // Evento para detectar clic fuera de las cartas
    document.addEventListener("click", function () {
        // Removemos la clase 'clickeada' de todas las cartas
        cartas.forEach(carta => carta.classList.remove("clickeada"));

        // Removemos la clase 'bloqueado' del fondo
        fondoJuegoMesa.classList.remove("bloqueado");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dadoBtn = document.querySelector(".boton-dado");
    const dados = document.querySelectorAll(".dado");
    const resultadoDadoSpan = document.getElementById("resultado-dado");
    const resultadoCasillas = document.querySelector(".resultado-casillas");
    const cartasSituacion = document.querySelectorAll(".carta-situacion");
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
    let deudaMaxima = 0; // Almacena el monto máximo de la deuda
    let deudaPagada = false; // Controla si la deuda ha sido pagada

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
        // No permitir lanzar el dado si hay una deuda activa y no se ha pagado
        if (hayDeudaActiva() && !deudaPagada) {
            alert("Debes pagar la deuda antes de lanzar el dado.");
            return;
        }

        // No permitir lanzar el dado si el jugador está en movimiento
        if (enMovimiento) {
            alert("No puedes lanzar el dado mientras te mueves.");
            return;
        }

        enMovimiento = true;
        dadoBtn.disabled = true; // Deshabilitar el botón del dado

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
                    dadoBtn.disabled = false; // Habilitar el botón del dado

                    const nuevaCasilla = document.getElementById(`e-${nuevaPosicion}`);
                    if (nuevaCasilla && nuevaCasilla.dataset.casilla === "situacion") {
                        const cartaAleatoria = cartasSituacion[Math.floor(Math.random() * cartasSituacion.length)];
                        cartaAleatoria.classList.add("active");
                        const sonidoCarta = new Audio("/audio/arrastrar.mp3");
                        sonidoCarta.play();

                        setTimeout(() => {
                            const cartaDinero = cartaAleatoria.querySelector(".carta-dinero");
                            if (cartaDinero && cartaDinero.dataset.dinero === "pierde") {
                                deudaMaxima = parseInt(cartaDinero.textContent, 10); // Establece el monto máximo de la deuda
                                dineroPorPagarSpan.textContent = deudaMaxima;
                                deudaPagada = false; // Reiniciar el estado de la deuda
                            }
                        }, 1000);
                    }
                }, 500);
            });

            posicionActual = nuevaPosicion;
        });
    });

    // Habilita el arrastre de billetes
    document.querySelectorAll(".billete").forEach(billete => {
        billete.setAttribute("draggable", true);
        billete.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text", e.target.dataset.cantidad);
            e.target.classList.add("dragging");
        });
        billete.addEventListener("dragend", function (e) {
            e.target.classList.remove("dragging");
            
        });
    });

    // Permite soltar billetes en el depósito solo si hay una deuda activa
    depositoBilletes.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    depositoBilletes.addEventListener("drop", function (e) {
        e.preventDefault();

        // Verificar si hay una deuda activa
        if (parseInt(dineroPorPagarSpan.textContent, 10) === 0) {
            alert("No hay una deuda activa para pagar.");
            return; // Detener la función si no hay deuda
        }

        const draggingElement = document.querySelector(".dragging");
        if (!draggingElement || !draggingElement.classList.contains("billete")) return;

        // Agregar el billete directamente al contenedor .deposito-billetes
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

            // Verificar si el billete corresponde al contenedor
            if (parseInt(draggingElement.dataset.cantidad, 10) === valor) {
                // Verificar si el billete se está soltando en el mismo contenedor del que proviene
                if (draggingElement.parentElement === conjunto) {
                    return; // No hacer nada si se suelta en el mismo contenedor
                }

                // Agregar el billete directamente al contenedor correspondiente
                conjunto.appendChild(draggingElement);
            } else {
                alert("No puedes soltar este billete aquí.");
            }
        });
    }

    // Configurar los eventos para cada conjunto de billetes
    permitirDropEnConjunto(conjuntoBilletes500, 500);
    permitirDropEnConjunto(conjuntoBilletes1000, 1000);
    permitirDropEnConjunto(conjuntoBilletes2000, 2000);

    // Evento para pagar la deuda
    pagarBtn.addEventListener("click", function () {
        const totalDepositado = Array.from(depositoBilletes.querySelectorAll(".billete")).reduce((total, billete) => {
            return total + parseInt(billete.dataset.cantidad, 10);
        }, 0);

        if (totalDepositado >= deudaMaxima) {
            // Eliminar los billetes del depósito
            depositoBilletes.innerHTML = "";

            // Remover la clase .active de la carta activa
            const cartaActiva = document.querySelector(".carta-situacion.active");
            if (cartaActiva) {
                cartaActiva.classList.remove("active");
            }

            // Recalcular el dinero del obrero
            calcularDineroObrero();

            // Restablecer el dinero por pagar
            dineroPorPagarSpan.textContent = "0";

            // Marcar la deuda como pagada
            deudaPagada = true;
        } else {
            alert("No has depositado suficiente dinero para pagar la deuda.");
        }
    });

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
                callback();
            }
        }
        mover();
    }

    // Inicializa el dinero del obrero
    calcularDineroObrero();
});