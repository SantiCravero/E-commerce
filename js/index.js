const productos = [
    { id: 1, nombre: "Placa de Video Asrock RX 570 8GB Phantom", precio: 53050, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_28822_Placa_de_Video_Asrock_RX_570_8GB_GDDR5_Phantom_Gaming_Elite_9ecf3ec5-grn.jpg" },
    { id: 2, nombre: "PC Intel I3 10100F SSD 240GB 8GB", precio: 69900, img: "https://www.venex.com.ar/products_images/1607972440_1604925619_pcintelcorei39100ssd240gb8gbddr4.jpg" },
    { id: 3, nombre: "Monitor LG LED 19'' 19M38A-B VGA", precio: 30450, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_8683_Monitor_LG_LED_19___19M38A-B_VGA_4607eba4-grn.jpg" },
    { id: 4, nombre: "Teclado HP HyperX Alloy CORE RGB LA", precio: 6650, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_26222_Teclado_HP_HyperX_Alloy_CORE_RGB_LA_dd3acd58-grn.jpg" },
    { id: 5, nombre: "Silla Gamer Cooler Master Caliber R2C Grey", precio: 107400, img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_30964_Silla_Gamer_Cooler_Master_Caliber_R2C_Grey_21bb1177-grn.jpg" },
]

const catalogoProducto = new CatalogoProducto(productos)
console.log("Productos Iniciales", catalogoProducto.productos)


verProductos(productos)
buscador()
iniciarSesion()

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
                                <button id="btn-product-${producto.id}" class="btn botonCarrito">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>`

        nodoPrincipal.innerHTML += cardProducto
    })
}

function buscador() {
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

}

function filtrarTexto(nodoBuscador) {
    const filtrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().indexOf(nodoBuscador) !== -1)
    verProductos(filtrados)

}






















// function borrarForm(nodoBuscador) {
//     nodoBuscador.value = ""
// }


// function buscador() {



// const nodoBuscador = document.getElementById("buscador").value
// const nodoBoton = document.getElementById("botonBuscador")
// let nodoResultado = document.getElementById("resultadoBusqueda")

// nodoBoton.addEventListener("click", ()=>{
//     completarBuscador()
//     borrarForm(nodoBuscador)
// })

// }

// function filtrarTexto(productos){
//     // let index = nodoBuscador.value.toLowerCase()
//     // let encontrado = false
//     // if(index){
//     //     for(let producto of productos){
//     //         let nombre = producto.nombre.toLowerCase()
//     //         if(nombre.indexOf(index) !== -1){
//     //             encontrado = true
//     //             window.location.href = `index.html#novedades`
//     //         }
//     //     }       
//     const filtrados = productos.filter((producto)=>{
//         producto.nombre.indexOf(nodoBuscador !== -1)})
//         filtrarTexto(filtrados)

//     }
// if(!encontrado){
//     nodoResultado.innerHTML = `
//     <div class="alert alert-danger d-flex align-items-center alerta" role="alert">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>            

//         <div class="px-1">Producto no encontrado...</div>

//     </div>
//     `
// }
// }


guardarPreferencias()

function guardarPreferencias(inputUser) {

    const user = localStorage.getItem("usuario").value
    if (user) //mode !=== null, undefined, 0, false, ""
    {
        setUser(inputUser.value)
    }
}



function iniciarSesion() {

    if(localStorage.getItem("usuario")){
        guardarPreferencias()
    }

    else{

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
        if (e.keyCode == 13) {
            botonForm(formulario, inputUser)
        }
    });

    btnIngresar.addEventListener("click", () => {
        btnIngresar.classList.add(`botones`)
        botonForm(formulario, inputUser)
        setUser(inputUser)
    })
}}

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








