import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_JWT

const generateToken = (user) => {
    const token = jwt.sign({user}, secretKey, {expiresIn: '1h'})
    return token
}

export default generateToken