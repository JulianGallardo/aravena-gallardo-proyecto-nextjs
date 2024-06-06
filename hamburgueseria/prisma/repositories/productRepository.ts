import { PrismaClient, Prisma, Burger, Promo,PromoBurger } from '@/prisma/generated/client';

import prisma from '@/lib/db';

export class ProductRepository {
  async createBurger(data: Prisma.BurgerCreateInput): Promise<Burger> {
    return prisma.burger.create({ data });
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

  async findAllPromos(): Promise<Promo[]> {
    return prisma.promo.findMany({
      include: {
        burgers: {
          include: {
            burger: true,
          },
        },
      },
    });
  }

  async findBurgerById(burgerId: number): Promise<Burger | null> {
    return prisma.burger.findUnique({ where: { burgerId } });
  }

  async findPromoById(promoId: number): Promise<Promo | null> {
    return prisma.promo.findUnique({
      where: { promoId },
      include: {
        burgers: {
          include: {
            burger: true,
          },
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
