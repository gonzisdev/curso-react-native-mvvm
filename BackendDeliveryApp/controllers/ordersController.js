import { Order } from "../models/order.js"
import { OrderHasProducts } from "../models/order_has_products.js"

export class ordersController {

    static create = async (req, res) => {
        const order = req.body
        try {
            const newOrder = await Order.create(order)
            for(const product of order.products) {
                await OrderHasProducts.create(newOrder, product.id, product.quantity)
            }
            return res.status(201).json({
                success: true,
                message: 'La orden se creó correctamente', 
                data: `${newOrder}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la creación de la orden',
                error: error.message
            })
        }
    }
}