const productos = [
    { id: 1, nombre: "Placa de Video Asrock RX 570 8GB Phantom", precio: 53050, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_28822_Placa_de_Video_Asrock_RX_570_8GB_GDDR5_Phantom_Gaming_Elite_9ecf3ec5-grn.jpg" },
    { id: 2, nombre: "PC Intel I3 10100F SSD 240GB 8GB", precio: 69900, img: "https://www.venex.com.ar/products_images/1607972440_1604925619_pcintelcorei39100ssd240gb8gbddr4.jpg" },
    { id: 3, nombre: "Monitor LG LED 19'' 19M38A-B VGA", precio: 30450, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_8683_Monitor_LG_LED_19___19M38A-B_VGA_4607eba4-grn.jpg" },
    { id: 4, nombre: "Teclado HP HyperX Alloy CORE RGB LA", precio: 6650, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_26222_Teclado_HP_HyperX_Alloy_CORE_RGB_LA_dd3acd58-grn.jpg" },
    { id: 5, nombre: "Silla Gamer Cooler Master Caliber R2C Grey", precio: 107400, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30964_Silla_Gamer_Cooler_Master_Caliber_R2C_Grey_21bb1177-grn.jpg" },
]

let productosCarrito = []

const catalogoProducto = new CatalogoProducto(productos)
console.log("Productos Iniciales", catalogoProducto.productos)


verProductos(productos)
iniciarSesion()
vaciarBoton()
comprarBoton()

// Muestra los productos en el DOM

function verProductos(productoLista) {

    const nodoPrincipal = document.getElementById("tienda")
    nodoPrincipal.innerHTML = ""
    productoLista.forEach((producto) => {
        const cardProducto = `
                    <div class="col-12 col-md-4 my-4 d-flex auto">
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top d-flex align-self-center" alt="...">
                            <div class="card-body text-center">
                                <h5 class="card-title fw-bolder">${producto.nombre}</h5>
                                <p class="card-text">$${producto.precio}</p>
                                <button id="list-product-${producto.id}" class="btn botonCarrito">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>`

        nodoPrincipal.innerHTML += cardProducto

        // productoBtn = document.getElementById(`list-product-${producto.id}`)
        // productoBtn.addEventListener("click", () => {
        //     agregarCarrito(producto)
        // })
    })
}

// Hace funcional el buscador

const nodoBoton = document.getElementById("botonBuscador")

nodoBoton.addEventListener("click", () => {
    const nodoBuscador = document.getElementById("buscador").value
    filtrarTexto(nodoBuscador)
    // borrarForm(nodoBuscador.value)
})

const nodoBuscador = document.getElementById("buscador")
nodoBuscador.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        filtrarTexto(nodoBuscador.value)
        e.preventDefault()
        // borrarForm(nodoBuscador.value)
    }
})

nodoBuscador.addEventListener("input", () => {
    filtrarTexto(nodoBuscador.value)
})

function filtrarTexto(nodoBuscador) {
    const filtrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().indexOf(nodoBuscador) !== -1)
    verProductos(filtrados)

}

// function borrarForm() {
//     return nodoBuscador.value = ""
// }

// if(!encontrado){
//     nodoResultado.innerHTML = `
//     <div class="alert alert-danger d-flex align-items-center alerta" role="alert">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>            

//         <div class="px-1">Producto no encontrado...</div>

//     </div>
//     `
// }
// }


// Boton de Iniciar Sesion

function iniciarSesion() {

    if (localStorage.getItem("usuario")) {
        let textBienvenido = document.createElement('span')
        textBienvenido.classList.add(`spanSesion`)
        textBienvenido.innerHTML = `<i class="px-1 d-flex align-items-center bi bi-person-circle"><p class="m-0 px-2" style="font-size:16px;">Bienvenido/a ${localStorage.getItem("usuario")}!`
        botonInicio.replaceWith(textBienvenido)
    }

    else {
        const botonInicio = document.getElementById(`botonInicio`)
        const formulario = document.getElementById("iniciarSesion")
        const inputUser = document.getElementById("user")
        const inputPass = document.getElementById("pass")
        const btnIngresar = document.getElementById("btnSubmit")


        botonInicio.addEventListener('click', () => {
            if (formulario.getAttribute('state') == 'closed') {
                formulario.style.display = 'block'
                botonInicio.innerHTML = `<button type="button" class="btn-close" aria-label="Close"></button>`
                formulario.setAttribute('state', 'opened')
            }
            else {
                formulario.style.display = 'none';
                botonInicio.innerHTML = `<i class="px-1 d-flex align-items-center bi bi-person-circle"></i>Iniciar Sesion`
                formulario.setAttribute('state', 'closed')
            }
        });

        inputPass.addEventListener('keypress', (e) => {
            e.keyCode == 13 ? (botonForm(formulario, inputUser), setUser(inputUser)) : false
        });

        btnIngresar.addEventListener("click", () => {
            btnIngresar.classList.add(`botones`)
            btnIngresar ? (botonForm(formulario, inputUser), setUser(inputUser)) : false
        })
    }
}

function botonForm(formulario, inputUser) {
    let textBienvenido = document.createElement(`span`)
    textBienvenido.classList.add(`spanSesion`)
    textBienvenido.innerHTML = `<i class="px-1 d-flex align-items-center bi bi-person-circle"><p class="m-0 px-2" style="font-size:16px;">Bienvenido/a ${inputUser.value}!`
    formulario.style.display = 'none'
    botonInicio.replaceWith(textBienvenido)
    formulario.setAttribute('state', 'closed')
}

function setUser(inputUser) {
    localStorage.setItem("usuario", `${inputUser.value}`)
}


// Agregar productos al carrito

productos.forEach((producto) => {
    productoBtn = document.getElementById(`list-product-${producto.id}`)
    // console.log(`list-product-${producto.id}`)
    productoBtn.addEventListener("click", () => {
        agregarCarrito(producto)
    })
})

if (localStorage.getItem("productos")) {
    carrito.style.display = 'block'
    let productos = localStorage.getItem("productos")
    productosCarrito = JSON.parse(productos)

    // mostrarProductoAgregado(productosCarrito)

    productoAgregado()
}

function agregarCarrito(producto) {
    const carrito = document.getElementById("carrito")

    carrito.getAttribute('situation' == 'hide')
    carrito.style.display = 'block'

    mostrarProductoAgregado(producto)

}

function mostrarProductoAgregado(producto) {

    productosCarrito.push(producto)
    productoAgregado(producto)
}

function productoAgregado() {
    let listaProducto = document.getElementById("lista")

    listaProducto.innerHTML = ""
    productosCarrito.forEach((producto) => {
        const createDiv = document.createElement('div')
        const cardCarrito = `
                        <div class="clase d-flex justify-content-between h-25">
                            <li>${producto.nombre} - <span class="precio">$${producto.precio}</span></li>
                            <div class="d-flex">
                            <input class="cantidad" type="number" value="1">
                            <button class="btn btn-danger botonBorrar" type="button"><i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>
                        `

        createDiv.innerHTML += cardCarrito
        listaProducto.appendChild(createDiv)

        createDiv
            .querySelector('.botonBorrar')
            .addEventListener("click", eliminarProductoDelCarrito)

        sumarPrecio()
    })
}

function sumarPrecio() {
    let total = Number(0)
    const sumado = document.getElementById("total")
    const elementoCarrito = document.querySelectorAll('.clase')

    elementoCarrito.forEach((producto) => {

        const precioDelProducto = producto.querySelector('.precio')
        const precioTotalCarrito = Number(precioDelProducto.textContent.replace('$', ''))

        const quantity = producto.querySelector('.cantidad')
        const quantityProducto = Number(quantity.value)

        total = total + precioTotalCarrito * quantityProducto
    })
    sumado.innerHTML = `$${total}`
    setProductos()
}

function eliminarProductoDelCarrito(event) {
    // eliminarArrProducto(event)
    const botonClickeado = event.target;
    botonClickeado.closest('.clase').remove();
    sumarPrecio();
}

// function eliminarArrProducto(){
//     productosCarrito.indexOf((producto)=>{
//         console.log(productosCarrito)
//         productosCarrito.splice(event, producto)
//     })
// }













function setProductos() {
    localStorage.setItem("productos", JSON.stringify(productosCarrito))
}

function vaciarBoton() {
    const botonVaciar = document.getElementById("boton-vaciar")
    let listaProducto = document.getElementById("lista")
    let sumado = document.getElementById("total")

    botonVaciar.addEventListener("click", () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#C1C1C1',
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'Cancelar',
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Tu carrito se ha vaciado',
                    'success'
                )
                productosCarrito = []
                listaProducto.innerHTML = []
                sumado.innerHTML = "$0"
                localStorage.removeItem("productos")
                carrito.setAttribute('situation', 'open')
                carrito.style.display = 'none'
            }
        })
    })
}

function comprarBoton() {
    const botonComprar = document.getElementById("boton-comprar")
    let listaProducto = document.getElementById("lista")
    let sumado = document.getElementById("total")

    botonComprar.addEventListener("click", () => {
        productosCarrito = []
        listaProducto.innerHTML = []
        sumado.innerHTML = "$0"
        localStorage.removeItem("productos")
        Swal.fire("Buen trabajo!", "Tu compra ha sido realizada!", "success")
    })
}