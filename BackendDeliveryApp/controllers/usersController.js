import { User } from "../models/user.js"

export class userController {
    
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