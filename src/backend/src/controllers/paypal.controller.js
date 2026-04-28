import {createPaypalOrder, capturePaypalOrder} from '../services/paypal.service.js';

export async function createOrder(req, res){
    try {
        const {items, total} = req.body;

        if(!items || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({error: 'El carrito está vacío'});
        }

        if(!total || Number(total) <= 0){
            return res.status(400).json({error: 'Total inválido'});
        }

        const order = await createPaypalOrder({items, total});

        res.status(200).json({
            id: order.id,
            status: order.status,
        });
    } catch (error) {
        console.error('Error en createOrder:', error);
        res.status(500).json({
            error: 'Error al crear la orden de PayPal',
            details: error.message
        });
    }
}

export async function captureOrder(req, res){
    try {
        const {orderId} = req.body;

        if(!orderId){
            return res.status(400).json({error: 'ID de orden es requerido en el cuerpo de la solicitud'});
        }

        const captureData = await capturePaypalOrder(orderId);

        res.status(200).json(captureData);
    } catch (error) {
        console.error('Error en captureOrder:', error);
        res.status(500).json({
            error: 'Error al capturar la orden de PayPal',
            details: error.message
        });
    }
}