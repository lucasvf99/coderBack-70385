import generateToken from "../utils/jwt.js"



export const login = async (req, res) => {
    try {
        if(!req.user){
            res.status(401).send('Usuario o contraseña erronea')
        }

        // const token =  generateToken(user)

        res.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }

        // res.cookie('coderCookie', token, {
        //     httpOnly: true,
        //     secure: false,
        //     masAge: 360000
        // })

        req.status(200).redirect('/')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al loguear usuario')
    }
}

export const register = async (req, res) => {
    try {
        console.log(req.user)
        if(!req.user){
            res.status(400).send('Ya existe un usuario con ese mail')
        }
        res.status(201).send('Usuario creado correctamente')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al crear usuario')
    }
}

export const viewLogin = async (req, res) => {
    try {
        res.status(200).render('templates/login', {})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al mostrar vistas')
    }
}
export const viewRegister = async (req, res) => {
    try {
        res.status(200).render('templates/register')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al mostrar vistas')
    }
}