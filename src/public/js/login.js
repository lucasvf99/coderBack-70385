document.addEventListener('DOMContentLoaded',() => {
   
        const form = document.getElementById('formulario')
        const linkGit = document.getElementById('link-github')
   
        linkGit.addEventListener('click',  ()=>{
            fetch('http://localhost:8080/api/session/datauser', {
                method: 'GET',
                headers: {'Content-Type':'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('cart', data.userCartId)
                // window.location.href = data.render
            })
        })

        form.addEventListener('submit',(e)=>{
        e.preventDefault()
        let dataForm = new FormData(form)
        let userData = Object.fromEntries(dataForm)
    
        fetch('http://localhost:8080/api/session/login',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
        if(data.success){
            console.log(data)
            localStorage.setItem('cart', data.cart)
            return window.location.href = data.render
        }else{
            console.log('Error en la peticion')
        }
        })
        .catch(error => {
            return  console.log(error)  
        })



    })
    

    const createCart = (idcart) => {
    let cart =  document.getElementsByClassName('cart')
    cart[0].setAttribute('id', idcart)
    }
    createCart()
    
})

/**
    
    Como hago para captar el id del carrito de github, buscar la
    manera hacer una peticion si se registra con git o con login 
 */