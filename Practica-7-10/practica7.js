function contarCerosEnFilas() {
    const matriz = [
        [
            parseInt(document.getElementById('m-00').value),
            parseInt(document.getElementById('m-01').value),
            parseInt(document.getElementById('m-02').value),
            parseInt(document.getElementById('m-03').value),
            parseInt(document.getElementById('m-04').value)
        ],
        [
            parseInt(document.getElementById('m-10').value),
            parseInt(document.getElementById('m-11').value),
            parseInt(document.getElementById('m-12').value),
            parseInt(document.getElementById('m-13').value),
            parseInt(document.getElementById('m-14').value)
        ],
        [
            parseInt(document.getElementById('m-20').value),
            parseInt(document.getElementById('m-21').value),
            parseInt(document.getElementById('m-22').value),
            parseInt(document.getElementById('m-23').value),
            parseInt(document.getElementById('m-24').value)
        ],
        [
            parseInt(document.getElementById('m-30').value),
            parseInt(document.getElementById('m-31').value),
            parseInt(document.getElementById('m-32').value),
            parseInt(document.getElementById('m-33').value),
            parseInt(document.getElementById('m-34').value)
        ],
        [
            parseInt(document.getElementById('m-40').value),
            parseInt(document.getElementById('m-41').value),
            parseInt(document.getElementById('m-42').value),
            parseInt(document.getElementById('m-43').value),
            parseInt(document.getElementById('m-44').value)
        ]
    ];

    // Contar los ceros en cada fila
    const conteoCeros = matriz.map(fila => fila.filter(num => num === 0).length);

    // Mostrar el resultado
    let resultado = "Ceros en cada renglón:\n";
    conteoCeros.forEach((conteo, indice) => {
        resultado += `Renglón ${indice + 1}: ${conteo} ceros\n`;
    });

    document.getElementById('practica7-resultado').textContent = resultado;
}