import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { secretOrKey } from "../config/keys.js"

export class userController {

    static login = async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findByEmail(email)
        if (!user) {
            res.status(401).json({ 
                success: false,
                message: 'El email no fue encontrado',
                error: error.message
             }); 
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json({ 
                success: false,
                message: 'Contraseña incorrecta',
                error: error.message
             }); 
        }
        const token = jwt.sign({id: user.id, email: user.email}, secretOrKey, {})
        const data = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            image: user.image,
            session_token: `JWT ${token}`
        }
        res.status(201).json({
            success: true,
            message: 'El usuario fue autenticado',
            data
        })
    }
    
    static register = async (req, res) => {
        const user = req.body
        try {
            const newUser = await User.create(user)
            res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente',
                data: newUser
            })
        } catch (error) {
            console.log(error);
            res.status(501).json({ 
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error.message
             }); 
        }
    }
}