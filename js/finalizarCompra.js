
document.getElementById("finalizarCompra").addEventListener("click", function () {
    let mensaje = "¡Hola pollito! Quiero adquirir los siguientes productos:\n\n";

    // Recorre el carrito y agrega cada producto al mensaje
    carrito.forEach(producto => {
        mensaje += `${producto.titulo}\n`;
        mensaje += `Precio: $${producto.precio}\n`;
        mensaje += `Cantidad: ${producto.cantidad}\n`;
        mensaje += `Subtotal: $${producto.cantidad * producto.precio}\n\n`;
    });

    // Codifica el mensaje para que pueda ser parte del enlace de WhatsApp
    mensaje = encodeURIComponent(mensaje);

    // Redirecciona al usuario al enlace de WhatsApp con el mensaje y el número de teléfono
    window.open(`https://wa.me/2324589620?text=${mensaje}`, '_blank');
});