import express from 'express'
import path from 'path'
import {__dirname} from './path.js'
import {create} from 'express-handlebars'
import cookieParser from 'cookie-parser'
import  session  from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import initializatePassport from './config/passport.config.js'
import passport from 'passport'
//rutas
import sessionRouter from './routes/session.routes.js'
import productsRouter from './routes/products.routes.js'

const app = express()
const PORT = 8080
const hbs = create()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//cookie
app.use(cookieParser('lucasSecret'))
//session
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://lucasvf4379:FwKkhXrPcqUrKIoR@cluster0.qqzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        mongoOptions: {} ,
        ttl: 15
    }),
    secret: 'SessionSecret',
    resave: true,
    saveUninitialized: true   
}))
mongoose.connect("mongodb+srv://lucasvf4379:FwKkhXrPcqUrKIoR@cluster0.qqzul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Db conectada'))
.catch((e) => console.log('Error al conectar a Mongo', e))

//passport
initializatePassport()
app.use(passport.initialize())
app.use(passport.session())

//hbs
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))

console.log('Directorio base', __dirname)

app.use('/public', express.static(__dirname + '/public'))
app.use('/', productsRouter)
app.use('/api/session', sessionRouter)

// app.get('/', (req,res) => {
//     res.status(200).render( 'templates/home')
// })

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})