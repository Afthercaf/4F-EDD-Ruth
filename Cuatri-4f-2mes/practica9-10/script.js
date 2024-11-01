

class Cliente {
    constructor(turno, nombre, movimiento, horaLlegada) {
        this.turno = turno;
        this.nombre = nombre;
        this.movimiento = movimiento;
        this.horaLlegada = horaLlegada;
    }
}

class Banco {
    constructor() {
        this.cola = [];
        this.turnoActual = 1;
    }

    agregarCliente(nombre, movimiento) {
        const horaLlegada = new Date().toLocaleTimeString();
        const cliente = new Cliente(this.turnoActual++, nombre, movimiento, horaLlegada);
        this.cola.push(cliente);
        this.mostrarCola();
    }

    atenderCliente() {
        if (this.cola.length === 0) {
            alert('No hay clientes en espera.');
            return;
        }

        const clienteAtendido = this.cola.shift();
        const horaActual = new Date().toLocaleTimeString();
        alert(`Atendiendo a ${clienteAtendido.nombre}. Tiempo de espera: ${this.calcularTiempoEspera(clienteAtendido.horaLlegada, horaActual)} minutos.`);
        this.mostrarCola();
    }

    calcularTiempoEspera(horaInicio, horaFin) {
        const inicio = new Date(`1970/01/01 ${horaInicio}`);
        const fin = new Date(`1970/01/01 ${horaFin}`);
        return Math.round((fin - inicio) / 60000); // minutos
    }

    mostrarCola() {
        const tabla = document.getElementById("colaClientes");
        tabla.innerHTML = "";

        this.cola.forEach((cliente) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${cliente.turno}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.movimiento}</td>
                <td>${cliente.horaLlegada}</td>
            `;
            tabla.appendChild(fila);
        });
    }
}

const banco = new Banco();

function agregarCliente() {
    const nombre = document.getElementById("nombre").value;
    const movimiento = document.getElementById("movimiento").value;

    if (nombre && movimiento) {
        banco.agregarCliente(nombre, movimiento);
        document.getElementById("nombre").value = "";
        document.getElementById("movimiento").value = "";
    } else {
        alert("Completa todos los campos.");
    }
}

function atenderCliente() {
    banco.atenderCliente();
}

