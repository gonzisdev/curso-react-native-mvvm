import { User } from "../models/user.js"
import { Rol } from "../models/rol.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { secretOrKey } from "../config/keys.js"
import storage from "../utils/cloud_storage.js"

export class userController {

    static findDeliveryMen = async (req, res) => {
        try {
            const deliveryMen = await User.findDeliveryMen()
            return res.status(201).json({
                success: true,
                message: 'Los repartidores fueron encontrados',
                data: deliveryMen
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error buscando los repartidores',
                error: error.message
            })
        }
    }

    static login = async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findByEmail(email)
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'El email no fue encontrado'
             }); 
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Contraseña incorrecta'
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
            session_token: `JWT ${token}`,
            roles: JSON.parse(user.roles)
        }
        return res.status(201).json({
            success: true,
            message: 'El usuario fue autenticado',
            data
        })
    }
    
    static register = async (req, res) => {
        const user = req.body
        try {
            const newUser = await User.create(user)
            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente',
                data: newUser
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error.message
            })
        }
    }

    static registerWithImage = async (req, res) => {
        const user = JSON.parse(req.body.user) 
        const file = req.file
        if (file) {
            const path = `image_${Date.now()}`
            const url = await storage(file, path)
            if (url != undefined && url != null) {
                user.image = url
            }
        }
        try {
            const newUser = await User.create(user)
            user.id = `${newUser}`
            const token = jwt.sign({id: user.id, email: user.email}, secretOrKey, {})
            user.session_token = `JWT ${token}`
            Rol.create(user.id, 3)
            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente', 
                data: user
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error.message
            })
        }
    }

    static updateWithImage = async (req, res) => {
        const user = JSON.parse(req.body.user) 
        const files = req.file
        if (files.length > 0) {
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path)
            if (url != undefined && url != null) {
                user.image = url
            }
        }
        try {
            await User.update(user)
            return res.status(201).json({
                success: true,
                message: 'El usuario se actualizó correctamente', 
                data: user
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la actualización del usuario',
                error: error.message
            })
        }
    }

    static updateWithoutImage = async (req, res) => {
        const user = req.body
        try {
            await User.updateWithoutImage(user)
            return res.status(201).json({
                success: true,
                message: 'El usuario se actualizó correctamente', 
                data: user
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la actualización del usuario',
                error: error.message
            })
        }
    }

    static updateNotificationToken = async (req, res) => {
        const id = req.body.id
        const token = req.body.token
        try {
            const update = await User.updateNotificationToken(id, token)
            return res.status(201).json({
                success: true,
                message: 'El token de notificación se actualizó correctamente', 
                data: update
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la actualización del token de notificación',
                error: error.message
            })
        }
    }
}