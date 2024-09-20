document.getElementById('btnResolverTorres').addEventListener('click', resolverTorres);

function resolverTorres() {
    const numDiscos = parseInt(document.getElementById('numDiscos').value);
    let movimientos = document.getElementById('movimientos');
    movimientos.innerHTML = '';

    if (isNaN(numDiscos) || numDiscos <= 0) {
        movimientos.innerHTML = 'Por favor, ingrese un número válido de discos.';
        return;
    }

    const pasos = [];
    resolver(numDiscos, 'A', 'C', 'B', pasos);
    // 
    let salida = '<h2>Movimientos:</h2>';
    pasos.forEach(paso => {
        salida += `Mover disco de ${paso[0]} a ${paso[1]}<br>`;
    });
    movimientos.innerHTML = salida;
}

function resolver(n, origen, destino, auxiliar, pasos) {
    if (n === 1) {
        pasos.push([origen, destino]);
    } else {
        resolver(n - 1, origen, auxiliar, destino, pasos);
        pasos.push([origen, destino]);
        resolver(n - 1, auxiliar, destino, origen, pasos);
    }
}
