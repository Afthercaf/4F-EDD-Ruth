// Función para calcular el factorial de un número usando recursividad
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Función para manejar el cálculo del factorial en la interfaz
function calcularFactorial() {
    const numero = parseInt(document.getElementById("factorialInput").value);
    if (numero >= 0) {
        const resultado = factorial(numero);
        document.getElementById("factorialResultado").innerText = `El factorial de ${numero} es: ${resultado}`;
    } else {
        document.getElementById("factorialResultado").innerText = "Introduce un número mayor o igual a 0.";
    }
}

