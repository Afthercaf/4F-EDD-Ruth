
function fibonacci(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

function calcularFibonacci() {
    const terminos = parseInt(document.getElementById("fibonacciInput").value);
    let resultado = "";
    for (let i = 0; i < terminos; i++) {
        resultado += fibonacci(i) + " ";
    }
    document.getElementById("fibonacciResultado").innerText = `Serie de Fibonacci: ${resultado}`;
}
