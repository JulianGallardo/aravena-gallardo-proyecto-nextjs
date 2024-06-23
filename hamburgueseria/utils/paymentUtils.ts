"use server";

import { CartItem } from "@/lib/CartTypes";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { OrderService } from "@/prisma/services/orderService";
import { Session } from "next-auth";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const orderService = new OrderService();


export async function payment(cart: CartItem[], totalAmount: number,session:Session | null) {
  const title = "Hamburgueseria ByteBurger";
  var clientId = 1; //Id del admin, si no esta logeado se registra con su id
  if(session){
    clientId = session.user.clientId;
  }
  

  const order = await orderService.createOrder(cart, totalAmount,clientId);

  if (process.env.NODE_ENV === "development") {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            title,
            description: "La mejor hamburguesa de la ciudad",
            unit_price: totalAmount,
            quantity: 1,
            id: order.orderId.toString(),

          },
        ],
        external_reference: order.orderId.toString(),
        back_urls: {
          success: "http://localhost:3000 ",
          failure: "http://localhost:3000/cart",
        },
        auto_return: "approved",
      },

    });
    redirect(preference.init_point!);
  }
  else {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            title,
            description: "La mejor hamburguesa de la ciudad",
            unit_price: totalAmount,
            quantity: 1,
            id: order.orderId.toString(),

          },
        ],
        external_reference: order.orderId.toString(),
        back_urls: {
          success: "https://byteburgers.vercel.app/cart/success",
          failure: "https://byteburgers.vercel.app/cart",
        },
        auto_return: "approved",
      },

    });

    redirect(preference.init_point!);
  }
  }
