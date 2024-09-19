import { Address } from "../models/address.js"

export class addressController {

    static create = async (req, res) => {
        const address = req.body
        try {
            const newAddress = await Address.create(address)
            return res.status(201).json({
                success: true,
                message: 'La dirección se creó correctamente', 
                data: `${newAddress}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la creación de la dirección',
                error: error.message
            })
        }
    }

    static findByUser = async (req, res) => {
        const id_user = req.params.id_user
        try {
            const addresses = await Address.findByUser(id_user)
            return res.status(201).json({
                success: true,
                message: 'La direcciones se han traído correctamente', 
                data: addresses
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error obtenidendo las direcciones',
                error: error.message
            })
        }
    }
}