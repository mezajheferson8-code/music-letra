const cancion = document.getElementById("cancion");
const progreso = document.getElementById("progreso");
const iconoControl = document.getElementById("iconoControl");
const titulo = document.querySelector(".reproduction-music h1");
const artista = document.querySelector(".reproduction-music p");

const btnPlay = document.querySelector(".boton-reproducir-pausar");
const btnAtras = document.querySelector(".atras");
const btnAdelante = document.querySelector(".adelante");

// Lista de canciones (Asegúrate de que los nombres de archivo sean correctos)
const canciones = [
    {
        titulo: 'Hislerim',
        artista: 'Serhat Durmus',
        fuente: 'music/(27-34Hz) Serhat Durmus - Hislerim (ft. Zerrin) (Rebassed by XCLSV)_256k.mp3'
    },
    {
        titulo: 'Summertime Sadness',
        artista: 'Lana Del Rey',
        fuente: 'music/(26-46Hz) Lana Del Rey - Summertime Sadness (Rebassed by Florian)_256k.mp3'
    },
    {
        titulo: 'Brother Louie',
        artista: 'Modern Talking',
        fuente: 'music/(35-52hz) Modern Talking - Brother Louie (Rebassed)_256k.mp3'
    }
];

let indice = 0;

function actualizarIcono(reproduciendo) {
    iconoControl.classList.toggle('bi-play-fill', !reproduciendo);
    iconoControl.classList.toggle('bi-pause-fill', reproduciendo);
}

function cargarCancion(i) {
    const cancionSeleccionada = canciones[i];
    titulo.innerText = cancionSeleccionada.titulo;
    artista.innerText = cancionSeleccionada.artista;
    cancion.src = cancionSeleccionada.fuente;
    cancion.load();
    progreso.value = 0;
}

function reproducir() {
    cancion.play();
    actualizarIcono(true);
}

function pausar() {
    cancion.pause();
    actualizarIcono(false);
}

function reproducirPausar() {
    if (cancion.paused || cancion.ended) {
        reproducir();
    } else {
        pausar();
    }
}

function siguienteCancion() {
    indice = (indice + 1) % canciones.length;
    cargarCancion(indice);
    reproducir();
}

function cancionAnterior() {
    indice = (indice - 1 + canciones.length) % canciones.length;
    cargarCancion(indice);
    reproducir();
}

cancion.addEventListener("timeupdate", () => {
    if (cancion.duration && !isNaN(cancion.duration)) {
        const porcentaje = (cancion.currentTime / cancion.duration) * 100;
        progreso.value = porcentaje;
    }
});

cancion.addEventListener("ended", siguienteCancion);

progreso.addEventListener("input", () => {
    if (cancion.duration && !isNaN(cancion.duration)) {
        const tiempoDestino = (progreso.value * cancion.duration) / 100;
        cancion.currentTime = tiempoDestino;
    }
});

btnAdelante.addEventListener("click", siguienteCancion);
btnAtras.addEventListener("click", cancionAnterior);

cargarCancion(indice);
btnPlay.addEventListener("click", reproducirPausar);