import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  const body = await req
    .json()
    
    console.log(body)

    const payment = await new Payment(client).get({id: body.data.id});
    console.log(payment);

    const donation = {
        id: payment.id,
        amount: payment.transaction_amount,
        message: payment.description,
    }
    
    return Response.json({success: true});
}
