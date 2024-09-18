document.getElementById('btnCalcularCambio').addEventListener('click', calcularCambio);

function calcularCambio() {
    const denominaciones = [100, 50, 20, 10, 5, 1, 0.50, 0.20, 0.01];
    let monto = parseFloat(document.getElementById('amount').value);
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (isNaN(monto) || monto <= 0) {
        resultado.innerHTML = 'Por favor, ingrese un monto válido.';
        return;
    }

    let montoCentavos = Math.round(monto * 100);
    let conteoMonedas = {};

    for (let denom of denominaciones) {
        let denomCentavos = Math.round(denom * 100);
        if (montoCentavos >= denomCentavos) {
            conteoMonedas[denom] = Math.floor(montoCentavos / denomCentavos);
            montoCentavos %= denomCentavos;
        }
    }

    let salida = '<h2>Cambio:</h2>';
    for (let denom of denominaciones) {
        if (conteoMonedas[denom]) {
            salida += `${conteoMonedas[denom]} moneda(s) de ${denom.toFixed(2)} pesos<br>`;
        }
    }

    resultado.innerHTML = salida;
}
