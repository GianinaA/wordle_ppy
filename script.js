const DICCIONARIO = ["APPLE", "HOUSE", "CLOWN", "ROBOT"];
let PALABRA = "APPLE";
const API = "https://random-word-api.herokuapp.com/word?length=5&lang=en";

fetch(API)
    .then((response) => response.json())
    .then((response) => {
        PALABRA = response[0].toUpperCase();
        console.log(PALABRA);
        BUTTON.disabled = false; 
    })
    .catch((err) => {
        console.log(err);
        let random = Math.floor(Math.random() * DICCIONARIO.length);
        BUTTON.disabled = false; 
    });

let cantIntentos = 6;
const BUTTON = document.getElementById("guess-button");
BUTTON.disabled = true; 

BUTTON.addEventListener("click", () => {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    let row = document.createElement("div");
    row.className = "row";
    for (let i in PALABRA) {
        if (PALABRA[i] === INTENTO[i]) {
            let cuadroLetra = armarLetra(INTENTO[i], "aqua");
            row.appendChild(cuadroLetra);
        } else if (PALABRA.includes(INTENTO[i])) {
            let cuadroLetra = armarLetra(INTENTO[i], "aquamarine");
            row.appendChild(cuadroLetra);
        } else {
            let cuadroLetra = armarLetra(INTENTO[i], "lightblue");
            row.appendChild(cuadroLetra);
        }
    }
    if (INTENTO == PALABRA) {
        terminar("<h1>GANASTE!</h1>");
        BUTTON.disabled = true;
    } else {
        cantIntentos--;
        if (cantIntentos === 0) {
            terminar("<h1>PERDISTE!</h1>");
            BUTTON.disabled = true; 
        }
    }
    GRID.appendChild(row);
});

function leerIntento() {
    return document.getElementById("guess-input").value.toUpperCase();
}

function terminar(mensaje) {
    document.getElementById("mensaje").innerHTML = mensaje;
}

function armarLetra(Letra, color) {
    let span = document.createElement("span");
    span.className = "letter";
    span.innerHTML = Letra;
    span.style.backgroundColor = color;
    return span;
}
