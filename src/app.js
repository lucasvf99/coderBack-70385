import 'dotenv/config'
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
//ruta
import indexRouter from './routes/index.routes.js'

const app = express()
const PORT = 8080
const hbs = create()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//cookie
app.use(cookieParser(process.env.SECRET_COOKIE))
//session
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        mongoOptions: {} ,
        ttl: 15000000
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true   
}))
mongoose.connect(process.env.URL_MONGO)
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

app.use(express.static(path.join(__dirname, "public")))
console.log('Directorio base', __dirname)
//routes
app.use('/', indexRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})