const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let ventas = Array(12).fill(null).map(() => Array(5).fill(0)); // Arreglo de 12 meses y 5 días de la semana



// Generar números aleatorios para las ventas
function generarAleatorio() {
    for (let dia = 0; dia < 5; dia++) {
        for (let mes = 0; mes < 12; mes++) {
            const id = `${diasSemana[dia]}_${meses[mes]}`;
            const aleatorio = Math.floor(Math.random() * 101); // Genera un número aleatorio entre 0 y 100
            document.getElementById(id).value = aleatorio;
            ventas[mes][dia] = aleatorio;
        }
    }
}

// Procesar ventas y mostrar resultados
function procesarVentas() {
    let resultadoHTML = "<h3>Resultados de Ventas:</h3>";
    
    // Calcular total de ventas y encontrar menor y mayor venta
    let totalVentas = 0;
    let menorVenta = Infinity;
    let mayorVenta = -Infinity;
    let mesMenor = '', diaMenor = '';
    let mesMayor = '', diaMayor = '';

    const ventasPorDia = Array(5).fill(0); // Array para sumar ventas por día

    for (let mes = 0; mes < 12; mes++) {
        for (let dia = 0; dia < 5; dia++) {
            const venta = ventas[mes][dia];
            totalVentas += venta;
            ventasPorDia[dia] += venta;

            if (venta < menorVenta) {
                menorVenta = venta;
                mesMenor = meses[mes];
                diaMenor = diasSemana[dia];
            }
            if (venta > mayorVenta) {
                mayorVenta = venta;
                mesMayor = meses[mes];
                diaMayor = diasSemana[dia];
            }
        }
    }

    resultadoHTML += `<p>Total de ventas: $${totalVentas.toFixed(2)}</p>`;
    resultadoHTML += `<p>Menor venta: $${menorVenta.toFixed(2)} en ${diaMenor} de ${mesMenor}</p>`;
    resultadoHTML += `<p>Mayor venta: $${mayorVenta.toFixed(2)} en ${diaMayor} de ${mesMayor}</p>`;
    
    // Venta por día
    diasSemana.forEach((dia, index) => {
        resultadoHTML += `<p>${dia}: $${ventasPorDia[index].toFixed(2)}</p>`;
    });

    document.getElementById('resultado12').innerHTML = resultadoHTML;
}
