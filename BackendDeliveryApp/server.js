import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import addressRoutes from "./routes/addressRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import passport from "passport"
import { auth } from "./config/passport.js"
import { Server } from "socket.io"
import { createServer } from "http"
import { socketHandler } from "./sockets/ordersSocket.js"

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

app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/orders', orderRoutes)

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL, 
        methods: ["GET", "POST"],         
    },
})

socketHandler(io)

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
