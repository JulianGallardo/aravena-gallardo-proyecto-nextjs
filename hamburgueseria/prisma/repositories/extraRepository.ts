import { PrismaClient, Prisma, Extra } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class ExtraRepository {
    
  async createExtra(data: Prisma.ExtraCreateInput): Promise<Extra> {
    return prisma.extra.create({ data });
  }

  async findAllExtras(): Promise<Extra[]> {
    return prisma.extra.findMany();
  }

  async findExtraById(extraId: number): Promise<Extra | null> {
    return prisma.extra.findUnique({ where: { extraId } });
  }

  async getExtrasByBurgerId(burgerId: number): Promise<Extra[]> {
    const burger = await prisma.burger.findUnique({
      where: { burgerId },
      include: {
        extras: {
          include: {
            extra: true,
          },
        },
      },
    });

    if (!burger) {
      throw new Error("Burger not found");
    }

    const extras = burger.extras.map(extraOnBurger => extraOnBurger.extra);
    return extras;
  }

  async updateExtra(extraId: number, data: Prisma.ExtraUpdateInput): Promise<Extra> {
    return prisma.extra.update({
      where: { extraId },
      data,
    });
  }

  async deleteExtra(extraId: number): Promise<void> {
    await prisma.extra.delete({ where: { extraId } });
  }
}
