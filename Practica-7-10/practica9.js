// Práctica 9: Operaciones con Matrices
function realizarOperacionesMatrices() {
    // Obtener los valores de los inputs
    const matriz1 = [
        [document.getElementById('m1-00').value, document.getElementById('m1-01').value],
        [document.getElementById('m1-10').value, document.getElementById('m1-11').value]
    ];
    const matriz2 = [
        [document.getElementById('m2-00').value, document.getElementById('m2-01').value],
        [document.getElementById('m2-10').value, document.getElementById('m2-11').value]
    ];

    // Validación: Asegurarse que todos los campos estén llenos y sean números válidos
    if (!validarMatrices(matriz1, matriz2)) {
        alert('Por favor, ingrese todos los números correctamente en las matrices.');
        return; // Detener la ejecución si hay un error
    }

    // Convertir los valores a números enteros
    const matriz1Numerica = matriz1.map(fila => fila.map(Number));
    const matriz2Numerica = matriz2.map(fila => fila.map(Number));

    // Operaciones con matrices
    const suma = matriz1Numerica.map((fila, i) => fila.map((val, j) => val + matriz2Numerica[i][j]));
    const resta = matriz1Numerica.map((fila, i) => fila.map((val, j) => val - matriz2Numerica[i][j]));
    const producto = matriz1Numerica.map((fila, i) => fila.map((val, j) => val * matriz2Numerica[i][j]));
    const division = matriz1Numerica.map((fila, i) => fila.map((val, j) => val / matriz2Numerica[i][j]));

    // Mostrar resultados en la página
    document.getElementById('resultado-suma').textContent = `Suma:\n${suma[0].join(' ')}\n${suma[1].join(' ')}`;
    document.getElementById('resultado-resta').textContent = `Resta:\n${resta[0].join(' ')}\n${resta[1].join(' ')}`;
    document.getElementById('resultado-producto').textContent = `Producto:\n${producto[0].join(' ')}\n${producto[1].join(' ')}`;
    document.getElementById('resultado-division').textContent = `División:\n${division[0].join(' ')}\n${division[1].join(' ')}`;
}

// Función de validación para asegurarse de que todas las entradas sean números válidos
function validarMatrices(matriz1, matriz2) {
    for (let i = 0; i < matriz1.length; i++) {
        for (let j = 0; j < matriz1[i].length; j++) {
            // Si algún valor no es un número o está vacío, la validación falla
            if (isNaN(matriz1[i][j]) || matriz1[i][j].trim() === '' || isNaN(matriz2[i][j]) || matriz2[i][j].trim() === '') {
                return false;
            }
        }
    }
    return true;
}
