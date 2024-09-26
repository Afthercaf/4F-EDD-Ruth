// Función para crear la matriz y realizar los cálculos
function calcularMatriz(fila = 0, sumaFilas = [], sumaColumnas = Array(10).fill(0), matriz = []) {
   
    if (fila >= 5) {
        // Calcular promedios por fila y columna
        let promedioFilas = sumaFilas.map(suma => suma / 10);
        let promedioColumnas = sumaColumnas.map(suma => suma / 5);
        mostrarResultados(matriz, sumaFilas, promedioFilas, sumaColumnas, promedioColumnas);
        return;
    }

    
    let currentRow = [];
    for (let j = 0; j < 10; j++) {
        let id = `celda_${fila}_${j}`;
        let valor = parseInt(document.getElementById(id).value) || 0;
        currentRow.push(valor);
        sumaColumnas[j] += valor; // Sumar en la columna
    }
    matriz.push(currentRow);
    sumaFilas.push(currentRow.reduce((a, b) => a + b, 0)); // Sumar en la fila

    
    calcularMatriz(fila + 1, sumaFilas, sumaColumnas, matriz);
}

// Función para mostrar los resultados
function mostrarResultados(matriz, sumaFilas, promedioFilas, sumaColumnas, promedioColumnas) {
    let resultado = "<table border='1'>";
    
    // Mostrar la matriz con sumas y promedios por fila
    for (let i = 0; i < 5; i++) {
        resultado += "<tr>";
        for (let j = 0; j < 10; j++) {
            resultado += `<td>${matriz[i][j]}</td>`;
        }
        resultado += `<td><strong>${sumaFilas[i]}</strong></td>`;
        resultado += `<td><strong>${promedioFilas[i].toFixed(1)}</strong></td>`;
        resultado += "</tr>";
    }

    // Mostrar sumas por columna
    resultado += "<tr>";
    for (let j = 0; j < 10; j++) {
        resultado += `<td><strong>${sumaColumnas[j]}</strong></td>`;
    }
    resultado += "<td colspan='2'></td></tr>";

    // Mostrar promedios por columna
    resultado += "<tr>";
    for (let j = 0; j < 10; j++) {
        resultado += `<td><strong>${promedioColumnas[j].toFixed(1)}</strong></td>`;
    }
    resultado += "<td colspan='2'></td></tr>";

    resultado += "</table>";

    document.getElementById('resultado').innerHTML = resultado;
}

// Función para generar números aleatorios
function generarAleatorios() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
            let id = `celda_${i}_${j}`;
            document.getElementById(id).value = Math.floor(Math.random() * 10);
        }
    }
    calcularMatriz();
}

// Crear la estructura de la matriz en el HTML
function crearMatrizHTML() {
    let matrizHTML = "<table>";
    for (let i = 0; i < 5; i++) {
        matrizHTML += "<tr>";
        for (let j = 0; j < 10; j++) {
            matrizHTML += `<td><input type="number" id="celda_${i}_${j}" style="width:50px"></td>`;
        }
        matrizHTML += "</tr>";
    }
    matrizHTML += "</table>";
    document.getElementById('matriz').innerHTML = matrizHTML;
}

// Inicializar la página
window.onload = function() {
    crearMatrizHTML();
};




// Práctica 13: Procesar Calificaciones
function generarFormulario() {
    const numAlumnos = parseInt(document.getElementById('numAlumnos').value);
    const numParciales = parseInt(document.getElementById('numParciales').value);
    const formularioAlumnos = document.getElementById('formularioAlumnos');
    formularioAlumnos.innerHTML = '';

    for (let i = 1; i <= numAlumnos; i++) {
        for (let j = 1; j <= numParciales; j++) {
            formularioAlumnos.innerHTML += `
                <input type="number" placeholder="Alumno ${i} - Parcial ${j}" id="alumno${i}_parcial${j}" required>
            `;
        }
    }

    document.getElementById('procesarCalificaciones').style.display = 'block';
}

function procesarCalificaciones() {
    const numAlumnos = parseInt(document.getElementById('numAlumnos').value);
    const numParciales = parseInt(document.getElementById('numParciales').value);
    let calificaciones = [];
    let reprobados = 0; // Counter for failed partial grades

    for (let i = 1; i <= numAlumnos; i++) {
        let alumno = [];
        for (let j = 1; j <= numParciales; j++) {
            let calificacion = parseFloat(document.getElementById(`alumno${i}_parcial${j}`).value);
            alumno.push(calificacion);
        }
        calificaciones.push(alumno);
    }

    // Calcular los promedios de cada alumno
    const promedios = calificaciones.map(alumno => alumno.reduce((acc, nota) => acc + nota, 0) / numParciales);
    const promedioMax = Math.max(...promedios);
    const promedioMin = Math.min(...promedios);

    // Obtener el índice del alumno con el promedio más alto y más bajo
    const indiceMax = promedios.indexOf(promedioMax) + 1;
    const indiceMin = promedios.indexOf(promedioMin) + 1;

    // Contar cuántos promedios son menores a 7.0
    const reprobadosPromedio = promedios.filter(promedio => promedio < 7.0).length;
    const Aprobados = promedios.filter(promedio => promedio >  7.0).length;

    let promediosHTML = '<h3>Promedios de cada alumno:</h3>';
    promedios.forEach((promedio, index) => {
        promediosHTML += `<p>Alumno ${index + 1}: ${promedio.toFixed(2)}</p>`;
    });

    document.getElementById('resultado13').innerHTML = `
        ${promediosHTML}
        <p>Promedio más alto: Alumno ${indiceMax} con ${promedioMax.toFixed(2)}</p>
        <p>Promedio más bajo: Alumno ${indiceMin} con ${promedioMin.toFixed(2)}</p>
        <p>Alumnos con promedio reprobado (menor a 7.0): ${reprobadosPromedio}</p>
         <p>Alumnos con promedio aprobado : ${Aprobados}</p>
    `;
}
