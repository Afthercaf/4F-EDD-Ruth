
// Función para calcular el MCD usando recursividad
function mcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return mcd(b, a % b);
    }
}

// Función para manejar el cálculo del MCD en la interfaz
function calcularMCD() {
    const num1 = parseInt(document.getElementById("mcdInput1").value);
    const num2 = parseInt(document.getElementById("mcdInput2").value);
    if (num1 > 0 && num2 > 0) {
        const resultado = mcd(num1, num2);
        document.getElementById("mcdResultado").innerText = `El MCD de ${num1} y ${num2} es: ${resultado}`;
    } else {
        document.getElementById("mcdResultado").innerText = "Introduce números enteros válidos.";
    }
}
