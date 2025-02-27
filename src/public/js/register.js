document.addEventListener('DOMContentLoaded', () => {
    if(window.location.href == "http://localhost:8080/api/session/viewregister"){
            
        const form = document.getElementById('formulario')
        if(window.location.href == "http://localhost:8080/api/session/viewregister"){
            form.addEventListener('submit', async (e)=> {
    
                e.preventDefault()
                const dataForm = new FormData(form)
                const dataUser = Object.fromEntries(dataForm) 
        
                console.log(dataUser)
                    await fetch('http://localhost:8080/api/session/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataUser)
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
    
})
