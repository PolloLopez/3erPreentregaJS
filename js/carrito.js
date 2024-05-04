let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // traido del local storage (tienda.js)

const carritoContenedor = document.querySelector("#carrito-pagina");

if (carrito.length === 0) {
    carritoProductos.innerHTML = "<p class='carrito-vacio'>Sin productos en el carrito</p>";
} else {
    carrito.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("carrito-finalizado"); // Cambia la clase a "carrito-producto"
        div.innerHTML = `
            <p>Título: ${producto.titulo}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Subtotal: $${producto.cantidad * producto.precio}</p> <!-- Muestra el subtotal -->
        `;
        carritoContenedor.append(div);
    })
}