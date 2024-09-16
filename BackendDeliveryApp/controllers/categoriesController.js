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
            const newCategory = await Category.create(category)
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

    static updateWithImage = async (req, res) => {
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
            const updatedCategory = await Category.update(category)
            return res.status(201).json({
                success: true,
                message: 'La categoría se actualizó correctamente', 
                data: `${updatedCategory}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la actualización de la categoría',
                error: error.message
            })
        }
    }

    static update= async (req, res) => {
        const category = req.body
        try {
            const updatedCategory = await Category.update(category)
            return res.status(201).json({
                success: true,
                message: 'La categoría se actualizó correctamente', 
                data: `${updatedCategory}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la actualización de la categoría',
                error: error.message
            })
        }
    }

    static getAll = async (req, res) => {
        try {
            const data = await Category.getAll()
            return res.status(201).json({
                success: true,
                message: 'Las categorías se listaron correctamente', 
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error al listar las categorías',
                error: error.message
            })
        }
    }

    static delete = async (req, res) => {
        try {
            const id = req.params.id
            const data = await Category.delete(id)
            return res.status(201).json({
                success: true,
                message: 'Las categoría se eliminó correctamente', 
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error al eliminar la categoría',
                error: error.message
            })
        }
    }
}