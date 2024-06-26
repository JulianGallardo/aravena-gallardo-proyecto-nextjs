//definiciones de fetch especiales de prisma
import { Promo, Burger, Prisma } from "@/prisma/generated/client"

export interface PromoExtendida extends Promo { //find all promos, devuelve los atributos de la promoBurger y las burgers
  burgers: {
    burger: Burger,
    quantity: number,
    newPrice: number
  }[]
}

export type OrdenExtendida = Prisma.OrderGetPayload<{
  include: {
    products: {

      select: {
        extras: {
          include: {
            extra: {
              select: {
                name: true,
                price: true
              }
            }
          }
        },
        quantity: true,
        product: {
          select: {
            burger: {
              select: {
                name: true,
                description: true,
                category: true,
                stock: true,
                price: true,
                extras: {
                  select: {
                    quantity: true,
                    extra: {
                      select: {
                        name: true,
                        price: true,

                      }
                    }
                  }
                }
              }
            }
            promo: {
              select: {
                name: true,
                description: true,
                category: true,
                price: true
              }
            }
          }
        }
      }
    };
  };
}>;



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
  burgers: { burger: number; quantity: number; newPrice: number }[];
}

