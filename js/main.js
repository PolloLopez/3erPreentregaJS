function toggleTexto() {
    const textoCompleto = document.getElementById("textoCompleto");
    const botonLeer = document.querySelector(".botonLeer");

    if (textoCompleto.classList.contains("textoCompleto")) {
        textoCompleto.classList.remove("textoCompleto");
        botonLeer.textContent = "Leer menos";
    } else {
        textoCompleto.classList.add("textoCompleto");
        botonLeer.textContent = "Leer mas";
    }
}