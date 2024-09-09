// Función para calcular el término Fibonacci usando recursividad
function fibonacci(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

// Función para manejar el cálculo de la serie de Fibonacci en la interfaz
function calcularFibonacci() {
    const terminos = parseInt(document.getElementById("fibonacciInput").value);
    let resultado = "";
    for (let i = 0; i < terminos; i++) {
        resultado += fibonacci(i) + " ";
    }
    document.getElementById("fibonacciResultado").innerText = `Serie de Fibonacci: ${resultado}`;
}
