
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let productos = [];

/*traer de base de datos local */
fetch("/data/productos.json")
    .then(res => res.json())
    .then(data => {
        productos = data;
        mostrarProductos(data);
    })


const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const btnVaciar = document.querySelector("#vaciar");
const numeritoTotal = document.querySelector("#numerito");


//recorre el array y lo muestra
const mostrarProductos = (productos) => {
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="tiendaImagen" src="${producto.img}" alt="${producto.titulo}">
        <h3 class="producto">${producto.titulo}</h3>
        <p>${producto.descripcion}</p>
        <p>$${producto.precio}</p>
        `;

        const btn = document.createElement("button"); //se crea el boton
        btn.classList.add("producto-btn");
        btn.innerText = "Agregar al carrito";
        btn.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
        div.append(btn);

        contenedorProductos.append(div);
    });

}

const botonesAgregar = document.querySelectorAll(".producto-btn");
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        const id = e.target.id;
        const productoAsignado = productos.find(prod => prod.id === id);
        agregarAlCarrito(productoAsignado);
    });
});

// Funcion para actualizar el carrito
function actualizarCarrito() { //es lo mismo que  :const actualizarCarrito = () => {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        btnVaciar.classList.add("d-none");/*si el carrito esta vacio(length ===0 add clase d-none*/
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        btnVaciar.classList.remove("d-none");/*si no esta vacio, remover la clase d-none dejandolo disponible para vaciar*/

        carritoProductos.innerHTML = "";
        carrito.forEach(producto => {//agregamos los divs
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <h3>${producto.titulo}</h3>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Subtotal: ${producto.cantidad * producto.precio}</p>
            `;

            const btnRestar = document.createElement("button");
            btnRestar.classList.add("carrito-producto-btn");
            btnRestar.innerText = "🔻restar";
            btnRestar.addEventListener("click", () => {
                restarDelCarrito(producto);
            })
            div.append(btnRestar);

            const btnSumar = document.createElement("button");
            btnSumar.classList.add("carrito-producto-btn");
            btnSumar.innerText = "sumar🔺";
            btnSumar.addEventListener("click", () => {
                sumarDelCarrito(producto);
            })
            div.append(btnSumar);

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("carrito-producto-btn");
            btnEliminar.innerText = "eliminar❌";
            btnEliminar.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })
            div.append(btnEliminar);
            carritoProductos.append(div);
        })
    }
    actualizarTotal();
    numerito.innerText = calcularNumerito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// se llama para que agregue al carrito
// el if-else chequea si hay producto, suma una con ++ si no, no sube nada
const agregarAlCarrito = (producto) => {
    const itemEncontrado = carrito.find(item => item.titulo === producto.titulo);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();

    Toastify({
        text: "Producto agregado!",
        gravity: "bottom", // top - bottom
        position: "right", //left - center - right
        duration: 1500
    }).showToast();
}

const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex(item => item.titulo === producto.titulo);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();

    Toastify({
        text: "Producto ELIMINADO!",
        gravity: "bottom",
        position: "right",
        duration: 1800
    }).showToast();
}

const restarDelCarrito = (producto) => { // para que no permita restar el primer producto
    if (producto.cantidad !== 1) {
        producto.cantidad--;
    } else {
    }
    actualizarCarrito();
    Toastify({
        text: "Quitaste 1 producto.",
        gravity: "bottom",
        position: "right",
        duration: 1500
    }).showToast();
}

const sumarDelCarrito = (producto) => {
    producto.cantidad++;
    actualizarCarrito();

    Toastify({
        text: "Agregaste 1 producto.",
        gravity: "bottom",
        position: "right",
        duration: 1500
    }).showToast();
}

const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

const calcularNumerito = () => {
    const numeritoTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    return numeritoTotal;
}

btnVaciar.addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito();
});

actualizarCarrito();; // va al final para que se actualice con el total de carrito









