import { PrismaClient } from '@prisma/client';

// Definir tipo para los parámetros del middleware
type MiddlewareParams = {
  model?: string;
  action?: string;
  args?: {
    data?: {
      price: number;
      burgers?: {
        create?: PromoBurgerCreateInput[];
        updateMany?: PromoBurgerUpdateManyWithWhereWithoutPromoInput;
      };
    };
  };
};

// Definir tipos para los inputs de Prisma
type PromoBurgerCreateInput = {
  burger: { connect: { burgerId: number } };
  discount: number;
  quantity: number;
};

type PromoBurgerUpdateManyWithWhereWithoutPromoInput = {
  where: any; // Tipo específico de tu aplicación para la cláusula where
  data: PromoBurgerCreateInput;
};

const prisma = new PrismaClient();

// Middleware para calcular el precio de la promoción antes de crear o actualizar
prisma.$use(async (params: MiddlewareParams, next: (params: MiddlewareParams) => Promise<any>) => {
  if (params.model === 'Promo' && (params.action === 'create' || params.action === 'update')) {
    const promoBurgers = params.args?.data?.burgers?.create || params.args?.data?.burgers?.updateMany;

    if (promoBurgers) {
        let finalPrice = 0;

        for (const promoBurger of promoBurgers as PromoBurgerCreateInput[]) {
            const burger = await prisma.burger.findUnique({ where: { burgerId: promoBurger.burger.connect.burgerId } });
            const originalPrice = burger?.price || 0; // Valor por defecto en caso de burger nulo
            const discountAmount = originalPrice * (promoBurger.discount / 100);
            const discountedPrice = originalPrice - discountAmount;
            finalPrice += discountedPrice;
        }

        params.args!.data!.price = finalPrice;
    }
  }

  return next(params);
});
