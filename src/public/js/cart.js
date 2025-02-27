
document.addEventListener('DOMContentLoaded', ()=> {


let btnCart = document.getElementsByClassName('button') //agregar carrito
let btnL = document.getElementsByClassName('btn-less')
let btnP = document.getElementsByClassName('btn-plus')
const cartL = document.getElementById('cart-length')
let p = 1 //quantity product por defecto
const btn = [...btnCart]
const btnLess = [...btnL]
const btnPlus = [...btnP]


//localCart
const cart = localStorage.getItem('cart')
const quantityCartLocal = localStorage.getItem('cantidadCarrito')
if(quantityCartLocal){
    cartL.innerHTML = quantityCartLocal
}


//btns sumar restar cantidad

btnLess.forEach(el => el.addEventListener('click', (e)=> {
    p = e.target.parentElement.children[1]
    if(p.innerText >= 1 ){
        p.innerText = parseInt(p.innerText) - 1
        p = p.innerText
        console.log(p)
        return p
    }
}))
btnPlus.forEach(el => el.addEventListener('click', (e)=> {
    p = e.target.parentElement.children[1]
    if(p.innerText >= 0){
        p.innerText = parseInt(p.innerText) + 1 
        p = p.innerText
        console.log(p)
        return p
    }
}))

//msg SweetAlert
const mostrarMsg = (data) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2000
      });
}

const loginRegister = (data) => {
   
    Swal.fire({
        title: "¿Has iniciadio sesion?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Iniciar sesion",
        denyButtonText: `Registrarse`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
           window.location.href = 'http://localhost:8080/api/session/viewlogin'
        } else if (result.isDenied) {
           window.location.href = 'http://localhost:8080/api/session/viewregister'
        }
      });
}
//carrito length
const cartLenght = (data) => {
    let cantidadCarrito = data.cart.products.length
    localStorage.setItem('cantidadCarrito', cantidadCarrito)
    cartL.innerHTML = cantidadCarrito 
}

//agregar producto
btn.forEach(el => {
    el.addEventListener('click',  (e)=>{

        const product = e.target.parentElement.id
        fetch(`http://localhost:8080/api/cart/${cart}/${product}`,{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({quantity : parseInt(p)})
        })
        .then(res => {
            if(res.status == 500){
                loginRegister()
            }else{
                return res.json()
            }
        })
        .then(data => {
            cartLenght(data)
            mostrarMsg(data)})
        .catch( (e) => {
            return console.log(e)
        })
    })
})

//link a cart
let cartLink = document.getElementById('cart')
cartLink.addEventListener('click', ()=>{
    window.location.href = `http://localhost:8080/api/cart/${cart}`
})

})

// Renderizar al terminar compra a la pagina home 