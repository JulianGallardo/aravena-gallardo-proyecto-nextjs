"use server";

import { CartItem } from "@/lib/types";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function payment(cart: CartItem[]) {
  const title = "Hamburgueseria ByteBurger";
  const preference = await new Preference(client).create({
    body: {
      items: cart.map((item) => ({
        id: "burger",
        title: title,
        quantity: item.cartItemBurger?.quantity ?? 0,
        currency_id: "ARS",
        unit_price: item.cartItemBurger?.price ?? 0,
      })),
      notification_url: "https://localhost:3000/api/payment",
      redirect_urls: {
        success: "http://localhost:3000/api/payment",
        failure: "https://byteburger.vercel.app/failure",
        pending: "https://byteburger.vercel.app/pending",
      },
    },
  });
  console.log(preference);
  redirect(preference.sandbox_init_point!);
}
