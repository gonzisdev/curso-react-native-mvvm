import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import passport from "passport"
import { auth } from "./config/passport.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

dotenv.config()

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(!origin || whitelist.includes(origin)){
            // Puede consultar la API
            callback(null, true)
        }else{
            // No esta permitido
            callback(new Error('Error de CORS') )
        }
    }
}

app.use(cors(corsOptions))
app.use(passport.initialize())
app.use(passport.session())
auth(passport)

const PORT = process.env.PORT || 4000
const SERVER = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

app.use('/api/users', userRoutes)

