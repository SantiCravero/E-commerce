let productosCarrito = []
let listaProductos = [];
cargardata();
async function cargardata() {
    let res = await fetch("/js/data/productos.data.json")
    let json = await res.json();
    listaProductos = json;
    console.log(listaProductos)
    verProductos(listaProductos);
}

const catalogoProducto = new CatalogoProducto(listaProductos)

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
    })

    productoLista.forEach((producto) => {
        const productoBtn = document.getElementById(`list-product-${producto.id}`)
        productoBtn.addEventListener("click", () => {
            agregarCarrito(producto)
        })
    })
}

// Hace funcional el buscador

const nodoBoton = document.getElementById("botonBuscador")

nodoBoton.addEventListener("click", () => {
    const nodoBuscador = document.getElementById("buscador").value
    filtrarTexto(nodoBuscador)

})

const nodoBuscador = document.getElementById("buscador")
nodoBuscador.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        filtrarTexto(nodoBuscador.value)
        e.preventDefault()
    }
})

nodoBuscador.addEventListener("input", () => {
    filtrarTexto(nodoBuscador.value)
})

function filtrarTexto(nodoBuscador) {
    const filtrados = listaProductos.filter((producto) =>
        producto.nombre.toLowerCase().indexOf(nodoBuscador) !== -1)
    verProductos(filtrados)

}

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

        botonInicio.addEventListener('click', () => {
            Swal.fire({
                title: '<h2 style="font-size: 25px"><strong>Iniciar Sesión</strong></h2>',
                html: `<input type="text" id="login" class="swal2-input my-2" style="box-shadow: none" placeholder="Usuario">
                <input type="password" id="password" class="swal2-input my-2" style="box-shadow: none" placeholder="Contraseña">`,
                confirmButtonText: 'Ingresar',
                confirmButtonColor: '#91C612',
                focusConfirm: false,
                preConfirm: () => {
                    const login = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value
                    if (!login || !password) {
                        Swal.showValidationMessage(`Ingrese un usuario y una contraseña válida`)
                    }
                    setTimeout(() => {

                    }, 3000);
                    let textBienvenido = document.createElement(`span`)
                    textBienvenido.classList.add(`spanSesion`)
                    textBienvenido.innerHTML = `<i class="px-1 d-flex align-items-center bi bi-person-circle"><p class="m-0 px-2" style="font-size:16px;">Bienvenido/a ${login}!`
                    botonInicio.replaceWith(textBienvenido)
                    setUser()
                }
            })
        });
    }
}

function setUser() {
    localStorage.setItem("usuario", `${login.value}`)
}


// Agregar productos al carrito

if (localStorage.getItem("productos")) {
    carrito.style.display = 'block'
    let productos = localStorage.getItem("productos")
    productosCarrito = JSON.parse(productos)

    productoAgregado()
}

function agregarCarrito(producto) {
    const carrito = document.getElementById("carrito")

    carrito.getAttribute('situation' == 'hide')
    carrito.style.display = 'block'

    mostrarProductoAgregado(producto)

}

function mostrarProductoAgregado(producto) {
    const enCarrito = productosCarrito.find(productosCarrito => productosCarrito.id === producto.id)
    if (!enCarrito) {
        productosCarrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, img: producto.img, cantidad: 1 })
    }
    else {
        const index = productosCarrito.indexOf(enCarrito)
        productosCarrito[index].cantidad++
    }
    productoAgregado()
    console.log(productosCarrito);
}

function productoAgregado() {
    let listaProducto = document.getElementById("lista")

    listaProducto.innerHTML = ""
    productosCarrito.forEach((producto) => {
        const createDiv = document.createElement('div')
        const cardCarrito = `
                        <div class="clase d-flex justify-content-between h-25 align-items-center">
                            <li><img src=${producto.img} class="tamaño mx-3 my-1">${producto.nombre} - <span class="precio">$${producto.precio}</span></li>
                            <div class="d-flex">
                                <div class="d-flex mx-3 align-items-center divBorrar">
                                    <button id="boton-restar" class="btn fs-4 suma_resta">-</button>
                                    <p class="cantidad px-2 m-0">${producto.cantidad}</p>
                                    <button id="boton-sumar" class="btn fs-4 suma_resta">+</button>                            
                                </div>
                                <button class="btn btn-danger botonBorrar" type="button"><i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>
                        `

        createDiv.innerHTML += cardCarrito
        listaProducto.appendChild(createDiv)

        createDiv
            .querySelector('.botonBorrar')
            .addEventListener("click", eliminarProductoDelCarrito)

        const botonRestar = createDiv.querySelector('#boton-restar')
        const botonSumar = createDiv.querySelector('#boton-sumar')

        botonRestar.addEventListener('click', () => {
            funcionRestar(producto)
        })

        botonSumar.addEventListener('click', () => {
            funcionSumar(producto)
        })

        sumarPrecio()
    })
}

function sumarPrecio() {
    const sumado = document.getElementById("total")

    const total = productosCarrito.map(producto => producto.cantidad * producto.precio).reduce((prev, curr) => prev + curr, 0)


    sumado.innerHTML = `$${total}`
    setProductos()
}

function eliminarProductoDelCarrito(event) {
    eliminarArrProducto()
    const botonClickeado = event.target;
    botonClickeado.closest('.clase').remove();
    sumarPrecio();
}

function eliminarArrProducto(producto) {
    productosCarrito.splice(producto, 1)
}

function funcionRestar(producto) {
    const index = productosCarrito.indexOf(producto)
    productosCarrito[index].cantidad--

    producto.cantidad <= 0 ? producto.cantidad = 1 : null
    productosCarrito[index].cantidad

    productoAgregado()

    setProductos()
    sumarPrecio()
}

function funcionSumar(producto) {
    const index = productosCarrito.indexOf(producto)
    productosCarrito[index].cantidad++

    productoAgregado()

    setProductos()
    sumarPrecio()
}

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