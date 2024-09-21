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

    static findByStatus = async (req, res) => {
        const status = req.params.status
        try {
            const data = await Order.findByStatus(status)
            for(const d of data) {
                d.address = JSON.parse(d.address)
                d.client = JSON.parse(d.client)
                d.products = JSON.parse(d.products)
                d.delivery = JSON.parse(d.delivery)
            }
            return res.status(201).json({
                success: true,
                message: 'Las ordenes se listaron correctamente', 
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error listando las ordenes',
                error: error.message
            })
        }
    }

    static findByDeliveryAndStatus = async (req, res) => {
        const id_delivery = req.params.id_delivery
        const status = req.params.status
        try {
            const data = await Order.findByDeliveryAndStatus(id_delivery, status)
            for(const d of data) {
                d.address = JSON.parse(d.address)
                d.client = JSON.parse(d.client)
                d.products = JSON.parse(d.products)
                d.delivery = JSON.parse(d.delivery)
            }
            return res.status(201).json({
                success: true,
                message: 'Las ordenes se listaron correctamente', 
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error listando las ordenes',
                error: error.message
            })
        }
    }

    static updateToDispatched = async (req, res) => {
        const order = req.body
        try {
            const toDispatched = await Order.updateToDispatched(order.id, order.id_delivery)
            return res.status(201).json({
                success: true,
                message: 'El estado de la orden se cambió a despachado correctamente', 
                data: `${toDispatched}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error cambiando el estado a despachado',
                error: error.message
            })
        }
    }

    static updateToOnTheWay = async (req, res) => {
        const order = req.body
        try {
            const toOnTheWay = await Order.updateToOnTheWay(order.id, order.id_delivery)
            return res.status(201).json({
                success: true,
                message: 'El estado de la orden se cambió a en camino correctamente', 
                data: `${toOnTheWay}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error cambiando el estado a en camino',
                error: error.message
            })
        }
    }

    static updateToDelivered = async (req, res) => {
        const order = req.body
        try {
            const toDelivered = await Order.updateToDelivered(order.id, order.id_delivery)
            return res.status(201).json({
                success: true,
                message: 'El estado de la orden se cambió a entregado correctamente', 
                data: `${toDelivered}`
            })
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error cambiando el estado a entregado',
                error: error.message
            })
        }
    }
}