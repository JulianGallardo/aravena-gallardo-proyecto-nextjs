import {  Prisma, Burger, Promo, Category } from '@/prisma/generated/client';

import prisma from '@/lib/db';
import { BurgerDataForm, PromoExtendida } from '@/lib/definitions';

export class ProductRepository {
  async createBurger(data:BurgerDataForm): Promise<Burger> {
    const product = await prisma.product.create({
      data: {},
    });

    return await prisma.burger.create({
      data: {
        productId: product.productId,
        name: data.name,
        category: data.category as Category,
        description: data.description,
        stock: data.stock,
        price: data.price,
      },
    });
  }

  async createPromo(data: Prisma.PromoCreateInput, burgers: { burgerId: number, quantity: number, newPrice: number }[]): Promise<Promo> {
    return prisma.promo.create({
      data: {
        ...data,
        burgers: {
          create: burgers.map(b => ({
            burger: { connect: { burgerId: b.burgerId } },
            quantity: b.quantity,
            newPrice: b.newPrice,
          })),
        },
      },
      include: {
        burgers: true,
      },
    });
  }

  async findAllBurgers(): Promise<Burger[]> {
    return prisma.burger.findMany();
  }

  async findAllPromos(): Promise<PromoExtendida[]> {
    return prisma.promo.findMany({
      include: {
        burgers:{
          select:{
            burger:true,
            quantity:true,
            newPrice:true
          }
        }
      },
    });
  }

  async findBurgerById(burgerId: number): Promise<Burger | null> {
    return prisma.burger.findUnique({ where: { burgerId } });
  }

  async findPromoById(promoId: number): Promise<PromoExtendida | null> {
    return prisma.promo.findUnique({
      where: { promoId },
      include: {
        burgers: {
          select: {
            burger: true,
            quantity: true,
            newPrice: true,
          }
        },
      },
    });
  }

  async updateBurger(burgerId: number, data: Prisma.BurgerUpdateInput): Promise<Burger> {
    return prisma.burger.update({
      where: { burgerId },
      data,
    });
  }

  async updatePromo(promoId: number, data: Prisma.PromoUpdateInput, burgers: { burgerId: number, quantity: number, newPrice: number }[]): Promise<Promo> {
    return prisma.promo.update({
      where: { promoId },
      data: {
        ...data,
        burgers: {
          deleteMany: {}, // Delete existing burgers
          create: burgers.map(b => ({
            burger: { connect: { burgerId: b.burgerId } },
            quantity: b.quantity,
            newPrice: b.newPrice,
          })),
        },
      },
      include: {
        burgers: {
          include: {
            burger: true,
          },
        },
      },
    });
  }

  async deleteBurger(burgerId: number): Promise<void> {
    await prisma.burger.delete({ where: { burgerId } });
  }

  async deletePromo(promoId: number): Promise<void> {
    await prisma.promo.delete({ where: { promoId } });
  }
}
