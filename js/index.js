
// Carga de productos desde el json

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
    window.location.href = "index.html#novedades"
})

const nodoBuscador = document.getElementById("buscador")
nodoBuscador.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        filtrarTexto(nodoBuscador.value)
        e.preventDefault()
        window.location.href = "index.html#novedades"
    }
})

nodoBuscador.addEventListener("input", () => {
    filtrarTexto(nodoBuscador.value)
})

function filtrarTexto(nodoBuscador) {
    const titulo = document.getElementById('novedades')
    const nodoPrincipal = document.getElementById("tienda")
    const filtrados = listaProductos.filter((producto) =>
        producto.nombre.toLowerCase().indexOf(nodoBuscador) !== -1)
    verProductos(filtrados)
    titulo.innerHTML=`
                    Resultado de la búsqueda: <span class="ms-2 fs-5">${nodoBuscador}</span>
    `

    if(filtrados.length === 0){
        nodoPrincipal.innerHTML=`
                                <div class="noResultado">
                                    <img src="img/lupa.png" class="px-3 lupa">
                                    <div class="flex-column ms-4">
                                        <p class="oops">OOPSS... </p>
                                        <p>No se encontraron resultados</p>
                                    </div>
                                </div>
        `
    }

    nodoBuscador == "" ? titulo.innerText= 'Productos Destacados' : null

}


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
                html: `<input type="text" id="login" class="inputs swal2-input my-2 " style="box-shadow: none" placeholder="Usuario">
                    <input type="password" id="password" class="inputs swal2-input my-2 " style="box-shadow: none" placeholder="Contraseña">`,
                confirmButtonText: 'Ingresar',
                confirmButtonColor: '#91C612',
                showCloseButton: true,
                focusConfirm: false,
                customClass: {
                    confirmButton: 'btn btn-primary botonConfirmar',
                    closeButton: 'btn botonCerrar',
                    loader: 'custom-loader'
                },
                loaderHtml: '<div class="loader"></div>',
                preConfirm: () => {
                    const login = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value
                    if (!login || !password) {
                        setTimeout(() => {
                            Swal.showValidationMessage(`Ingrese un usuario y una contraseña válida`)
                        }, 3000);
                    }
                    else{
                        setTimeout(() => {
                            let textBienvenido = document.createElement(`span`)
                            textBienvenido.classList.add(`spanSesion`)
                            textBienvenido.innerHTML = `<i class="px-1 d-flex align-items-center bi bi-person-circle"><p class="m-0 px-2" style="font-size:16px;">Bienvenido/a ${login}!`
                            botonInicio.replaceWith(textBienvenido)
                            setUser()
                        }, 3000);
                    }
                    Swal.showLoading()
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(true)
                        }, 3000)
                    })
                }
            })
        });
    }
}

// Guarda el usuario en el localStorage

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
}

// Muestra los productos en el carrito

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
                                <button class="btn btn-danger botonBorrar" type="button"><i class="bi bi-trash3-fill"></i></button>
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

// Funcion para sumar y actualizar el precio

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

// Botones para sumar y/o restar en la cantidad

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

// Guarda los productos del carrito en el localStorage

function setProductos() {
    localStorage.setItem("productos", JSON.stringify(productosCarrito))
}

// Boton de vaciar el carrito

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

// Boton de comprar

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