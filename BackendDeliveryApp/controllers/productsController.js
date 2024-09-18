import storage from "../utils/cloud_storage.js"
import { asyncForEach } from "../utils/async_foreach.js"
import { Product } from "../models/product.js"

export class productsController {

    static create = async (req, res) => {
        const product = JSON.parse(req.body.product) 
        const files = req.files
        let inserts = 0
        if (files.length === 0) {
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error al registrar el producto, no tiene imágenes',
            })
        } else {
            try {
                const newProduct = await Product.create(product)
                product.id = newProduct
                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const path = `image_${Date.now()}`
                        const url = await storage(file, path)
                        if (url != undefined && url != null) {
                            if (inserts == 0 ) {
                                product.image1 = url
                            } else if (inserts == 1) {
                                product.image2 = url
                            } else if (inserts == 2) {
                                product.image3 = url
                            }
                        }
                        const updatedProduct = await Product.update(product)
                        inserts = inserts + 1
                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'El producto se creó correctamente', 
                                data: updatedProduct
                            })
                        }
                    })
                }
                start()
            } catch (error) {
                console.log(error);
                return res.status(501).json({ 
                    success: false,
                    message: 'Hubo un error con el registro del producto',
                    error: error.message
                })
            }
        }
    }

    static findByCategory = async (req, res) => {
        const id_category = req.params.id_category
        try {
            const data = await Product.findByCategory(id_category)
            return res.status(201).json({
                success: true,
                message: 'Laos productos se listaron correctamente', 
                data: data
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error al listar los productos por categoría',
                error: error.message
            })
        }
    }

    static delete = async (req, res) => {
        try {
            const id = req.params.id
            const data = await Product.delete(id)
            return res.status(201).json({
                success: true,
                message: 'El producto se eliminó correctamente', 
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error al eliminar el producto',
                error: error.message
            })
        }
    }
}