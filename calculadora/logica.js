// Seleciona o input do visor pelo ID 'display'
const display = document.getElementById('display');

// Flag para controlar se o resultado foi exibido recentemente
let resultadoMostrado = false;

// Função para adicionar valores (números ou operadores) no visor
function adicionarValor(valor) {
    // Pega o último caractere do visor para validação
    const ultimo = display.value.slice(-1);

    // Validação: se o valor é um operador e
    // o visor está vazio ou o último caractere também é operador,
    // ignora a entrada (previne operadores consecutivos)
    if (/[+\-*/]/.test(valor) && (display.value === "" || /[+\-*/]/.test(ultimo))) {
        return;
    }

    // Se o resultado foi mostrado e o usuário digita um número,
    // limpa o visor antes de adicionar o novo valor
    if (resultadoMostrado && /\d/.test(valor)) {
        display.value = "";
        resultadoMostrado = false; // reset da flag
    }

    // Adiciona o valor no visor
    display.value += valor;

    // Garantir que a flag resultadoMostrado está falsa
    resultadoMostrado = false;
}

// Seleciona todos os botões de números
const numeros = document.querySelectorAll('#numeros button');
numeros.forEach(botao => {
    // Para cada botão, adiciona um listener de clique
    botao.addEventListener('click', () => {
        adicionarValor(botao.textContent); // adiciona o número no visor
    });
});

// Seleciona todos os botões de operadores
const operadores = document.querySelectorAll('#operadores button');
operadores.forEach(botao => {
    // Ignora os botões '=' e 'C'
    if (botao.id !== 'igual' && botao.id !== 'limpar') {
        botao.addEventListener('click', () => {
            adicionarValor(botao.textContent); // adiciona operador no visor
        });
    }
});

// Seleciona o botão '='
const botaoIgual = document.getElementById('igual');
botaoIgual.addEventListener('click', () => {
    try {
        // Avalia a expressão do visor e mostra o resultado
        display.value = eval(display.value);
        resultadoMostrado = true; // marca que resultado foi exibido
    } catch (error) {
        // Se houver erro na expressão, mostra "Erro"
        display.value = "Erro";
        resultadoMostrado = true;
    }
});

// Seleciona o botão 'C' para limpar o visor
const botaoLimpar = document.getElementById('limpar');
botaoLimpar.addEventListener('click', () => {
    display.value = ""; // limpa o visor
    resultadoMostrado = false; // reset da flag
});

// Suporte ao teclado: captura pressionamento de teclas
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/\d/.test(key)) {
        // Se for número, adiciona no visor
        adicionarValor(key);
    } else if (/[+\-*/]/.test(key)) {
        // Se for operador, adiciona no visor
        adicionarValor(key);
    } else if (key === "Enter") {
        // Se Enter, simula clique no botão '='
        botaoIgual.click();
    } else if (key === "Backspace") {
        // Se Backspace, remove último caractere do visor
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        // Se Escape, simula clique no botão 'C' (limpar)
        botaoLimpar.click();
    }
});