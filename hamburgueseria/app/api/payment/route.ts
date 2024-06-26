import { OrderService } from "@/prisma/services/orderService";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@/prisma/generated/client";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const orderService = new OrderService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payment = await new Payment(client).get({ id: body.data.id });

    if (payment && payment.status === "approved") {
      await orderService.updateOrderStatus(
        Number(payment.external_reference),
        OrderStatus.CONFIRMED
      );
      return NextResponse.json({ success: true });
    } else {
      await orderService.updateOrderStatus(
        Number(payment.external_reference),
        OrderStatus.REJECTED
      );
      return NextResponse.json({ success: false });
    }
  } catch (error: any) {
    console.error("Error processing payment:", error);
    return Response.json({ success: false, error: error.message });
  }
}
