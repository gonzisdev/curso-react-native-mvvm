import { Category } from "../models/category.js"
import storage from "../utils/cloud_storage.js"

export class categoriesController {

    static create = async (req, res) => {
        const category = JSON.parse(req.body.category) 
        const files = req.file
        if (files.length > 0) {
            const path = `image_${Date.now()}`
            const url = await storage(files[0], path)
            if (url != undefined && url != null) {
                category.image = url
            }
        }
        try {
            const newCategory = await Category.create(user)
            return res.status(201).json({
                success: true,
                message: 'La categoría se creó correctamente', 
                data: `${newCategory}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la creación de la categoría',
                error: error.message
            })
        }
    }
}