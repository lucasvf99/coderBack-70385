const form = document.querySelector('form')

form.addEventListener('submit', e =>{
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    fetch('http://localhost:8080/api/session/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
    .then(res => res.json())
    .then(data => console.log('succes',  data))
    .catch(error => {
        console.log(error)  
    })
})