import { OrderService } from "@/prisma/services/orderService";
import { NextRequest, NextResponse } from "next/server";

const orderService = new OrderService();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const orderId = searchParams.get("orderId");
    if (orderId) {
      {
        const orders = await orderService.getOrderById(Number(orderId));
        return NextResponse.json({
          status: 200,
          body: orders,
        });
      }
    } else {
      const orders = await orderService.getAllOrders();
      return NextResponse.json({
        status: 200,
        body: orders,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clientId, products, paymentMethod } = await req.json();
    const order = await orderService.createOrder({
      clientId,
      products,
      paymentMethod,
    });
    return NextResponse.json({
      status: 201,
      body: order,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: error.message,
    });
  }
}
