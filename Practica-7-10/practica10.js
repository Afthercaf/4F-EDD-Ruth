// Práctica 10: Generador de Matriz con 1's en la Diagonal Principal
function generarMatrizConDiagonalUnos() {
    const tamanoInput = document.getElementById('tamano-matriz');
    const resultadoElement = document.getElementById('practica10-resultado');

    if (!tamanoInput || !resultadoElement) {
        console.error('No se encontraron los elementos necesarios en el HTML');
        return;
    }

    const tamano = parseInt(tamanoInput.value);

    if (isNaN(tamano) || tamano < 1) {
        resultadoElement.textContent = "Por favor, ingrese un tamaño válido (número entero positivo).";
        return;
    }

    const matriz = Array(tamano).fill().map(() => Array(tamano).fill(0));

    for (let i = 0; i < tamano; i++) {
        matriz[i][i] = 1;
    }

    let resultado = "Matriz con 1's en la diagonal principal:\n";
    matriz.forEach(fila => {
        resultado += fila.join(' ') + '\n';
    });

    resultadoElement.textContent = resultado;
}