import jwt from 'jsonwebtoken'

const secretKey = 'codercoder'

const generateToken = (user) => {
    const token = jwt.sign({user}, secretKey, {expiresIn: '1h'})
    return token
}

export default generateToken