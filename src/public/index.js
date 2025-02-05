if(document.querySelector('form')){
    const form = document.querySelector('form')

    if(window.location.href == "http://localhost:8080/api/session/viewregister"){
        form.addEventListener('submit', (e)=> {

            e.preventDefault()

            const email = e.target[0].value
            const name = e.target[1].value
            const lastName = e.target[2].value
            const age = e.target[3].value
            const password = e.target[4].value
    
            console.log(email, password, lastName, age, password, name)
    
            fetch('http://localhost:8080/api/session/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: name,
                    last_name: lastName,
                    age: age,
                    password: password,
                    email: email
                })
            })
            .then(res=> res.json())
            .then(data => {
                if(data.succes){
                    localStorage.setItem('userName', name)
                    window.location.href = data.render
                }else{
                    console.log('Error al crear usuario')
                }
            })
            .catch(error => {
                 console.log('usuario existente', error)
            })
        })
       
    }
    else if (window.location.href=="http://localhost:8080/api/session/viewlogin"){  
        console.log(form)
        form.addEventListener('submit',(e)=>{

        const email = e.target[0].value
        const password = e.target[1].value

        console.log(email, password)
        fetch('http://localhost:8080/api/session/login',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
            .then(res => res.json())
            .then(data => {
        if(data.success){
            return window.location.href = data.render
        }else{
            console.log('Error en la peticion')
        }
        })
        .catch(error => {
            return  console.log(error)  
        })
})
}
}  

document.addEventListener('DOMContentLoaded', ()=> {
    const name = localStorage.getItem('userName')
    if(name){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Bienvenido/a ${name}`,
            showConfirmButton: false,
            timer: 2000
          });
        
    }
      localStorage.removeItem('userName')
})