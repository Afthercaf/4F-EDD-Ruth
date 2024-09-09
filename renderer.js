document.addEventListener('DOMContentLoaded', () => {
    const figuraButtons = document.querySelectorAll('.figura-btn');
    const inputContainer = document.getElementById('input-container');
    const calcularButton = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    const svgElement = document.getElementById('figura-svg');

    let figuraActual = null;
    let tipoTriangulo = 'escaleno'; // Valor predeterminado
    let area = null;
    let perimetro = null;

    const figuras = {
        rectangulo: {
            campos: ['base', 'altura'],
            calculo: (base, altura) => {
                if ( base === altura ) {
                    resultadoDiv.textContent = 'Eso no es un rectangulo';
                    const sul = resultadoDiv.textContent;
                    return sul;
                }        
                else {
                 area = base * altura;
                 perimetro = 2 * (base + altura);
                return `Área: ${area.toFixed(2)}, Perímetro: ${perimetro.toFixed(2)}`;}
            },
            dibujar: (base, altura) => {
                const escala = Math.min(200 / base, 200 / altura);
                const anchoEscalado = base * escala;
                const altoEscalado = altura * escala;
                return `<rect x="${(200 - anchoEscalado) / 2}" y="${(200 - altoEscalado) / 2}" width="${anchoEscalado}" height="${altoEscalado}" fill="none" stroke="black" stroke-width="2"/>`;
            }
        },
        circulo: {
            campos: ['radio'],
            calculo: (radio) => {
                 area = Math.PI * (radio * radio);
                 perimetro = 2 * Math.PI * radio;
                return `Área: ${area.toFixed(2)}, Circunferencia: ${perimetro.toFixed(2)}`;
            },
            dibujar: (radio) => {
                const escala = 90 / radio;
                const radioEscalado = radio * escala;
                return `<circle cx="100" cy="100" r="${radioEscalado}" fill="none" stroke="black" stroke-width="2"/>`;
            }
        },
        cuadrado: {
            campos: ['lado'],
            calculo: (lado) => {
                 area = lado * lado;
                 perimetro = 4 * lado;
                return `Área: ${area.toFixed(2)}, Perímetro: ${perimetro.toFixed(2)}`;
            },
            dibujar: (lado) => {
                const escala = 180 / lado;
                const ladoEscalado = lado * escala;
                return `<rect x="${(200 - ladoEscalado) / 2}" y="${(200 - ladoEscalado) / 2}" width="${ladoEscalado}" height="${ladoEscalado}" fill="none" stroke="black" stroke-width="2"/>`;
            }
        },
        triangulo: {
            campos: {
                equilatero: ['lado'],
                isosceles: ['base', 'lado'],
                escaleno: ['lado1', 'lado2', 'lado3']
            },
            calculo: (lado1, lado2, lado3) => {
                // Validar si los lados forman un triángulo
                if (lado1 + lado2 <= lado3 || lado1 + lado3 <= lado2 || lado2 + lado3 <= lado1) {
                    return 'Los lados proporcionados no forman un triángulo.';
                }
            
                const s = (lado1 + lado2 + lado3) / 2;
                area = Math.sqrt(s * (s - lado1) * (s - lado2) * (s - lado3));
                perimetro = lado1 + lado2 + lado3;
                return `Área: ${area.toFixed(2)}, Perímetro: ${perimetro.toFixed(2)}`;
            },
            dibujar: (lado1, lado2, lado3) => {
                const escala = 180 / Math.max(lado1, lado2, lado3);  // Escalar los lados
                const [l1, l2, l3] = [lado1 * escala, lado2 * escala, lado3 * escala];
        
                // Coordenadas basadas en la fórmula de geometría conociendo los tres lados
                const x1 = 10, y1 = 190;
                const x2 = x1 + l1, y2 = 190;
                
                // Utilizando el Teorema del Coseno para calcular las coordenadas del tercer vértice
                const cosC = (l1 * l1 + l2 * l2 - l3 * l3) / (2 * l1 * l2);
                const anguloC = Math.acos(cosC);
                const x3 = x1 + l2 * Math.cos(anguloC);
                const y3 = y1 - l2 * Math.sin(anguloC);
        
                return `
                    <polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="none" stroke="black" stroke-width="2"/>
                    <line x1="${x3}" y1="${y3}" x2="${x3}" y2="${y1}" stroke="black" stroke-width="1" stroke-dasharray="5,5"/>
                `;
            }
        }
        
    };

    figuraButtons.forEach(button => {
        button.addEventListener('click', () => {
            figuraActual = button.dataset.figura;
            figuraButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            mostrarCampos(figuraActual);
        });
    });

    function mostrarCampos(figura) {
        inputContainer.innerHTML = '';

        if (figura === 'triangulo') {
            const selectGroup = document.createElement('div');
            selectGroup.className = 'input-group';
            selectGroup.innerHTML = `
                <label for="tipoTriangulo">Tipo de Triángulo:</label>
                <select id="tipoTriangulo">
                    <option value="equilatero">Equilátero</option>
                    <option value="isosceles">Isósceles</option>
                    <option value="escaleno" selected>Escaleno</option>
                </select>
            `;
            inputContainer.appendChild(selectGroup);

            document.getElementById('tipoTriangulo').addEventListener('change', (e) => {
                tipoTriangulo = e.target.value;
                actualizarCamposTriangulo();
            });

            actualizarCamposTriangulo();
        } else {
            actualizarCampos(figura);
        }
    }

    function actualizarCampos(figura) {
        inputContainer.querySelectorAll('.input-group:not(:first-child)').forEach(group => group.remove());

        const campos = figuras[figura].campos;

        campos.forEach(campo => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <label for="${campo}">${campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                <input type="number" id="${campo}" step="0.01" min="0" required>
            `;
            inputContainer.appendChild(inputGroup);
        });

        // Añadir event listeners para actualizar la figura en tiempo real
        inputContainer.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', dibujarFigura);
        });
    }

    function actualizarCamposTriangulo() {
        inputContainer.querySelectorAll('.input-group:not(:first-child)').forEach(group => group.remove());

        const campos = figuras.triangulo.campos[tipoTriangulo];

        campos.forEach(campo => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <label for="${campo}">${campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                <input type="number" id="${campo}" step="0.01" min="0" required>
            `;
            inputContainer.appendChild(inputGroup);
        });

        // Añadir event listeners para actualizar la figura en tiempo real
        inputContainer.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', dibujarFigura);
        });
    }

    function dibujarFigura() {
        if (!figuraActual) return;

        let valores;
        if (figuraActual === 'triangulo') {
            const campos = figuras.triangulo.campos[tipoTriangulo];
            valores = campos.map(campo => parseFloat(document.getElementById(campo)?.value) || 0);
            
            if (tipoTriangulo === 'equilatero') {
                valores = [valores[0], valores[0], valores[0]];
            } else if (tipoTriangulo === 'isosceles') {
                valores = [valores[0], valores[1], valores[1]];
            }
        } else {
            const campos = figuras[figuraActual].campos;
            valores = campos.map(campo => parseFloat(document.getElementById(campo)?.value) || 0);
        }

        const svgContent = figuras[figuraActual].dibujar(...valores);
        svgElement.innerHTML = svgContent;
    }
    calcularButton.addEventListener('click', () => {
        if (!figuraActual) {
            resultadoDiv.textContent = 'Por favor, selecciona una figura.';
            return;
        }

        let valores;
        if (figuraActual === 'triangulo') {
            const campos = figuras.triangulo.campos[tipoTriangulo];
            valores = campos.map(campo => parseFloat(document.getElementById(campo)?.value));
            
            if (tipoTriangulo === 'equilatero') {
                valores = [valores[0], valores[0], valores[0]];
            } else if (tipoTriangulo === 'isosceles') {
                valores = [valores[0], valores[1], valores[1]];
            }
        } else {
            const campos = figuras[figuraActual].campos;
            valores = campos.map(campo => parseFloat(document.getElementById(campo)?.value));
        }

        if (valores.some(isNaN) || valores.some(valor => valor <= 0)) {
            resultadoDiv.textContent = 'Por favor, completa todos los campos con valores numéricos positivos mayores que cero.';
            return;
        }

        const resultado = figuras[figuraActual].calculo(...valores);
        resultadoDiv.textContent = resultado;
        sul;
    });

    // Inicializar con el primer botón de figura
    figuraButtons[0].click();
});