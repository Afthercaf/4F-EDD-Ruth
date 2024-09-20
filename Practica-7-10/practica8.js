// Práctica 8: Verificador de Cuadrado Mágico
function verificarCuadradoMagico() {
    const tamano = parseInt(document.getElementById('tamano-cuadrado-magico').value);
    const valoresEntrada = document.getElementById('valores-cuadrado-magico').value.split(',').map(Number);

    if (valoresEntrada.length !== tamano * tamano) {
        document.getElementById('practica8-resultado').textContent = "Error: Número incorrecto de valores para el tamaño dado.";
        return;
    }

    const cuadrado = [];
    for (let i = 0; i < tamano; i++) {
        cuadrado.push(valoresEntrada.slice(i * tamano, (i + 1) * tamano));
    }

    const sumaEsperada = tamano * (tamano * tamano + 1) / 2;
    let esMagico = true;

    // Verificar filas, columnas y diagonales
    let sumaDiagonal1 = 0;
    let sumaDiagonal2 = 0;

    for (let i = 0; i < tamano; i++) {
        let sumaFila = 0;
        let sumaColumna = 0;
        
        for (let j = 0; j < tamano; j++) {
            sumaFila += cuadrado[i][j];
            sumaColumna += cuadrado[j][i];
            
            if (i === j) sumaDiagonal1 += cuadrado[i][j];
            if (i + j === tamano - 1) sumaDiagonal2 += cuadrado[i][j];
        }
        
        if (sumaFila !== sumaEsperada || sumaColumna !== sumaEsperada) {
            esMagico = false;
            break;
        }
    }

    if (sumaDiagonal1 !== sumaEsperada || sumaDiagonal2 !== sumaEsperada) {
        esMagico = false;
    }

    const resultado = esMagico
        ? `Es un cuadrado mágico. La constante mágica es ${sumaEsperada}.`
        : "No es un cuadrado mágico.";

    document.getElementById('practica8-resultado').textContent = resultado;
}