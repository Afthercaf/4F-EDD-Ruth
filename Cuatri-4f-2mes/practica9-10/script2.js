class Coche {
    constructor(color) {
        this.color = color;
        this.elemento = this.crearElemento();
    }

    crearElemento() {
        const cocheElemento = document.createElement('div');
        cocheElemento.className = 'car-card';
        cocheElemento.innerHTML = `
            <div class="car-image">
                <img src="https://i.pinimg.com/originals/44/22/0d/44220d44fc40f353a24d17b0ca5efd10.png" alt="Coche">
            </div>
            <div class="car-color-label">${this.color}</div>
        `;
        return cocheElemento;
    }
}

class Juego {
    constructor() {
        this.colaCoches = [];
        this.cochesPintados = 0;
        this.tiempoTotal = 0;
        this.intervaloEncolar = 20000; // 20 segundos
        this.tiempoActualizacion = null;
        this.iniciarJuego();
    }

    generarColorAleatorio() {
        const colores = ['red', 'green', 'blue', 'yellow', 'black'];
        return colores[Math.floor(Math.random() * colores.length)];
    }

    encolarProximoCoche() {
        if (this.colaCoches.length < 5) {
            const colorCoche = this.generarColorAleatorio();
            const coche = new Coche(colorCoche);
            document.querySelector('.car-queue-horizontal').appendChild(coche.elemento);
            this.colaCoches.push(coche);

            if (this.intervaloEncolar > 10000) {
                this.intervaloEncolar -= 5000; // Aumentar velocidad de encolado
            }

            setTimeout(() => this.encolarProximoCoche(), this.intervaloEncolar);
        } else {
            alert('El juego ha terminado, no se pueden encolar más de 5 coches.');
            document.getElementById('restartButton').style.display = 'block';
        }
    }

    pintarCoche(colorSeleccionado) {
        if (this.colaCoches.length > 0) {
            const primerCoche = this.colaCoches.shift();
            if (primerCoche.color === colorSeleccionado) {
                primerCoche.elemento.remove();
                this.cochesPintados++;
                document.getElementById('cochesPintados').textContent = this.cochesPintados;

                if (this.cochesPintados === 3) {
                    this.intervaloEncolar -= 5000; // Aumentar velocidad de encolado
                }
                alert(`Has pintado correctamente el coche de color ${colorSeleccionado}.`);
            } else {
                alert(`Color incorrecto. Se solicitaba ${primerCoche.color}.`);
                this.colaCoches.unshift(primerCoche);
            }
        } else {
            alert('No hay coches para pintar.');
        }
    }

    actualizarTiempoTotal() {
        this.tiempoTotal++;
        document.getElementById('tiempoTotal').textContent = `${this.tiempoTotal}s`;
        this.tiempoActualizacion = setTimeout(() => this.actualizarTiempoTotal(), 1000);
    }

    reiniciarJuego() {
        // Reiniciar todas las variables y limpiar los elementos
        this.colaCoches = [];
        this.cochesPintados = 0;
        this.tiempoTotal = 0;
        this.intervaloEncolar = 20000;
        document.getElementById('cochesPintados').textContent = this.cochesPintados;
        document.getElementById('tiempoTotal').textContent = `${this.tiempoTotal}s`;
        document.querySelector('.car-queue-horizontal').innerHTML = '';
        document.getElementById('restartButton').style.display = 'none';
        clearTimeout(this.tiempoActualizacion);

        // Reiniciar encolado y contador de tiempo
        this.encolarProximoCoche();
        this.actualizarTiempoTotal();
    }

    iniciarJuego() {
        this.encolarProximoCoche();
        this.actualizarTiempoTotal();
    }
}

// Inicializar el juego
const juego = new Juego();

// Función para manejar el botón de reinicio
document.getElementById('restartButton').addEventListener('click', () => {
    juego.reiniciarJuego();
});
