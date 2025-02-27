import generateToken from "../utils/jwt.js"

export const login = async (req, res) => {
    try {
        if(!req.user){
            res.status(401).send('Usuario o contraseña erronea')
        }
        console.log(req.user)
        const user = req.user
        const token =  generateToken(req.user)

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }

        res.cookie('coderCookie', token, {
            httpOnly: true,
            secure: false,
            masAge: 360000
        })

        res.status(200).json({ success: true, render: '/', cart: user.cart})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error al loguearse'})
    }
}

export const register = async (req, res) => {
    try {
        if(!req.user){
            res.status(400).send('Ya existe un usuario con ese mail')
        }
        res.status(201).send({succes: true, render:'/api/session/viewlogin'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al crear usuario')
    }
}

export const gitHub = async (req,res)=> {
    try {
        console.log(req.newUser)
        res.send(req)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error loguearse')
    }
}

export const viewLogin = async (req, res) => {
    try {
        res.status(200).render('templates/login', {
            url_js: "/js/login.js",
            url_css: "/css/login.css"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al mostrar vistas')
    }
}
export const viewRegister = async (req, res) => {
    try {
        res.status(200).render('templates/register',{
            url_js: "/js/register.js",
            url_css: "/css/register.css"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al mostrar vistas')
    }
}

export const githubLogin = async (req,res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        res.status(200).redirect('/')
    } catch (error) {
        console.log(error)
    }
}

export const datosUser = async (req,res) => {
    try {
        
        let userCartId = req.user.cart.toString()
        console.log(userCartId)
        res.status(200).send({userCartId: userCartId})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al loguearse')
    }
}