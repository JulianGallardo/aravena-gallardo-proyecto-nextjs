import { OrderService } from "@/prisma/services/orderService";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { OrderStatus } from "@/prisma/generated/client";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const orderService = new OrderService();

export async function POST(req: NextRequest) {
  const body = await req
    .json()
    
    const payment = await new Payment(client).get({id: body.data.id});
    console.log(JSON.stringify(payment));

    if (payment !=null && payment.status === "approved") {
      orderService.updateOrderStatus(Number(payment.external_reference),OrderStatus.CONFIRMED );
      return Response.json({success: true});
    }
    else{
      orderService.updateOrderStatus(Number(payment.external_reference),OrderStatus.REJECTED );
      return Response.json({success: false});
    }
}
