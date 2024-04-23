/* BOTON DARK MODE */
const botonColorMode = document.querySelector("#color-mode");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

// Función del botón para activar el modo oscuro
function activarDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "activado");
    actualizarTextoModo();
}

// Función del botón para desactivar el modo oscuro
function desactivarDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado");
    actualizarTextoModo();
}

// Iniciar con el modo oscuro si está activado
if (darkMode === "activado") {
    activarDarkMode();
} else {
    desactivarDarkMode();
}

// Función para cambiar el texto del botón según el modo
function actualizarTextoModo() {
    const botonColorMode = document.getElementById("color-mode");
    if (body.classList.contains("dark-mode")) {
        botonColorMode.textContent = "Claro";
    } else {
        botonColorMode.textContent = "Oscuro";
    }
}

// Lógica para activar/desactivar el modo oscuro al hacer clic en el botón
botonColorMode.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
});

