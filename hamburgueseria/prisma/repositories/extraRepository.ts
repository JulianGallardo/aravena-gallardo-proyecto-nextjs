import { PrismaClient, Prisma, Extra } from '@prisma/client';

const prisma = new PrismaClient();

export class ExtraRpository {
    
  async createExtra(data: Prisma.ExtraCreateInput): Promise<Extra> {
    return prisma.extra.create({ data });
  }

  async findAllExtras(): Promise<Extra[]> {
    return prisma.extra.findMany();
  }

  async findExtraById(extraId: number): Promise<Extra | null> {
    return prisma.extra.findUnique({ where: { extraId } });
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
