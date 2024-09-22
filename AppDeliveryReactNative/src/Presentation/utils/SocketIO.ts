import io from "socket.io-client"
import * as dotenv from 'dotenv'

dotenv.config()

const socket = io(`${process.env.BACKEND_URL}/orders/delivery`)

export default socket