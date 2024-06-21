//definiciones de fetch especiales de prisma
import { Promo,Burger, Order } from "@/prisma/generated/client"

export interface PromoExtendida extends Promo { //find all promos, devuelve los atributos de la promoBurger y las burgers
    burgers:{
      burger:Burger,
      quantity:number,
      newPrice:number
    }[]
  }

export interface OrdenExtendida extends Order { //find all orders, devuelve los atributos de la orden y los productos
  products:{
    burger:Burger | null,
    promo:Promo | null,
    quantity:number
  }[]
}

export interface BurgerDataForm { //create burger, define los atributos de un burger que son pasados por formulario
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
}

export interface PromoDataForm { //create promo, define los atributos de una promo que son pasados por formulario
  name: string;
  description: string;
  price: number;
  category: string;
  burgers: { burger: number ; quantity: number; newPrice: number }[];
}

