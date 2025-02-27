document.addEventListener('DOMContentLoaded', ()=>{
//localCart
const cart = localStorage.getItem('cart')
const cartL = document.getElementById('cart-length')
const totalCart = document.getElementById('total-cart') 
const btnEmpty = document.getElementById('empty-cart')
let btnCheckout = document.getElementById('btn-checkout')
let btnD = document.getElementsByClassName('delete-product')

cartL.innerHTML = localStorage.getItem('cantidadCarrito')

const btnDelete = [...btnD]

const msgConfirm = (data) => {
    Swal.fire({
        title: "Compra realizada",
        text: `Id de compra ${data.tiket.code}.
               Total: ${data.tiket.amount} €`,
        icon: "success"
      }).then((result)=> {
        if(result.isConfirmed){
            window.location.href = data.render
        }
      });
}

//btn deleteProductCart
btnDelete.forEach(el => el.addEventListener('click', (e)=>{
    const priceProduct = Math.round(e.target.parentElement.parentElement.children[0].children[2].children[0].children[0].innerText)
    const pId = e.target.parentElement.parentNode.parentNode.parentElement.id
    fetch(`http://localhost:8080/api/cart/deleteproduct/${cart}/${pId}`,{
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById(pId).remove()
        totalCart.innerText = totalCart.innerText - priceProduct
        let cartLength = data.cart.products.length
        localStorage.setItem('cantidadCarrito', cartLength )
        cartL.innerText = cartLength
    })
    .catch((e) => console.log(e))
}))

//vaciar carrito
const cartProducts = document.getElementsByClassName('card')
const arrayCartProducts = [...cartProducts]
const deleteCardsProducts = () => {
    arrayCartProducts.forEach(el => {
        el.remove()
    })
}

btnEmpty.addEventListener('click', ()=>{
    fetch(`http://localhost:8080/api/cart/emptycart/${cart}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deleteCardsProducts()
        totalCart.innerText = 0
        let cartLength = data.cart.products.length
        localStorage.setItem('cantidadCarrito', cartLength )
        cartL.innerText = cartLength
    })
    .catch((e)=> console.log(e))
})

//checkout
btnCheckout.addEventListener('click', ()=>{
    
    fetch(`http://localhost:8080/api/cart/checkout/${cart}`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: {}
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        localStorage.removeItem('cantidadCarrito')
        localStorage.removeItem('cart')
        msgConfirm(data)
    })
})


//link carrito
let cartLink = document.getElementById('cart')
cartLink.addEventListener('click', ()=>{
    window.location.href = `http://localhost:8080/api/cart/${cart}`
})
})