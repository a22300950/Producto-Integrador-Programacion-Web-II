import {paypalConfig} from '../config/paypal.config.js';

function getBasicAuth(){
    return Buffer.from(`${paypalConfig.clientId}:${paypalConfig.clientSecret}`).toString('base64');
}

export async function getAccessToken(){
    const response = await fetch(`${paypalConfig.baseUrl}/v1/oauth2/token`, {
        method: 'POST', 
        headers: {
            'Authorization': `Basic ${getBasicAuth()}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if(!response.ok){
        throw new Error(`Error obteniendo access token: JSON: ${JSON.stringify(data)}`);
    }

    return data.access_token;
}

export async function createPaypalOrder(orderData){
    const accessToken = await getAccessToken();

     const body = {
        intent: 'CAPTURE',
        purchase_units: [
        {
            amount: {
            currency_code: 'MXN',
            value: Number(orderData.total).toFixed(2),
            breakdown: {
                item_total: {
                currency_code: 'MXN',
                value: Number(orderData.total).toFixed(2)
                }
            }
            },
            items: orderData.items.map(item => ({
            name: item.name,
            quantity: '1',
            unit_amount: {
                currency_code: 'MXN',
                value: Number(item.price).toFixed(2)
            }
            }))
            }
        ]
    };

    const response = await fetch(`${paypalConfig.baseUrl}/v2/checkout/orders`, {
        method: 'POST', 
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(`Error creando orden de PayPal: JSON: ${JSON.stringify(data)}`);
    }

    return data;
}

export async function capturePaypalOrder(orderId){
    const accessToken = await getAccessToken();

    const response = await fetch(`${paypalConfig.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(`Error capturando orden de PayPal: JSON: ${JSON.stringify(data)}`);
    }

    return data;
}