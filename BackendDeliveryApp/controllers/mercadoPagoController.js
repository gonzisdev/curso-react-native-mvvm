import mercadopago from 'mercadopago'
import { Order } from "../models/order.js"
import { OrderHasProducts } from "../models/order_has_products.js"

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-4332423066954571-102200-779dd861dfaa9f6acb7609a1887ee3f3-191014229'
})

export class mercadoPagoController {

    static createPayment = async (req, res) => {
        try {
            let payment = req.body;
            console.log('PAYMENT: ', payment)
            const payment_data = {
              token: payment.token,
              issuer_id: payment.issuer_id,
              payment_method_id: payment.payment_method_id,
              transaction_amount: payment.transaction_amount,
              installments: parseInt(payment.installments),
              payer: {
                email: payment.payer.email,
                identification: {
                  type: payment.payer.identification.type,
                  number: payment.payer.identification.number
                },
              },
            }
            const data = await mercadopago.payment.create(payment_data)
            if (data !== undefined && data !== null) {
                console.log('Los datos del cliente son correctos', data.response);
                const order = payment.order;
                Order.create(order)
                for (const product of order.products) {
                    await OrderHasProducts.create(id, product.quantity, product.id) 
                }
                return res.status(201).json({
                    success: true,
                    message: 'La orden se ha creado correctamente',
                    data: data.response
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(501).json({ 
                success: false,
                message: 'Hubo un error con la creación del pago',
                error: error.message
            })
        }
    }
}