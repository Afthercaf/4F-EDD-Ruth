class Auto {
    constructor(placas, propietario) {
        this.placas = placas;
        this.propietario = propietario;
        this.horaEntrada = new Date();
    }
}

class Estacionamiento {
    constructor() {
        this.colaAutos = [];
        this.tarifaPorSegundo = 2.00;
    }

    entradaAuto() {
        const placas = document.getElementById("placas").value;
        const propietario = document.getElementById("propietario").value;

        if (placas === "" || propietario === "") {
            alert("Por favor, ingrese las placas y el propietario.");
            return;
        }

        const auto = new Auto(placas, propietario);
        this.colaAutos.push(auto);
        document.getElementById("placas").value = "";
        document.getElementById("propietario").value = "";
        this.actualizarListaAutos();
        alert(`Auto con placas ${auto.placas} ingresado a las ${auto.horaEntrada.toLocaleTimeString()}.`);
    }

    salidaAuto() {
        if (this.colaAutos.length === 0) {
            alert("No hay autos en el estacionamiento.");
            return;
        }

        const auto = this.colaAutos.shift();
        const horaSalida = new Date();
        const duracion = (horaSalida - auto.horaEntrada) / 1000;
        const costo = duracion * this.tarifaPorSegundo;

        alert(
            `Auto con placas ${auto.placas}\n` +
            `Propietario: ${auto.propietario}\n` +
            `Hora de entrada: ${auto.horaEntrada.toLocaleTimeString()}\n` +
            `Hora de salida: ${horaSalida.toLocaleTimeString()}\n` +
            `Tiempo de estacionamiento: ${duracion.toFixed(2)} segundos\n` +
            `Costo: $${costo.toFixed(2)}`
        );

        this.actualizarListaAutos();
    }

    actualizarListaAutos() {
        const autosList = document.getElementById("autosList");
        autosList.innerHTML = "";

        this.colaAutos.forEach(auto => {
            const listItem = document.createElement("li");
            listItem.textContent = `Placas: ${auto.placas} | Propietario: ${auto.propietario} | Entrada: ${auto.horaEntrada.toLocaleTimeString()}`;
            autosList.appendChild(listItem);
        });
    }
}

const estacionamiento = new Estacionamiento();
