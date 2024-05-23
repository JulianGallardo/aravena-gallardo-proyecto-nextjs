import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Definir tipo para los parámetros del middleware
type MiddlewareParams = {
  model?: string;
  action?: string;
  args?: {
    data?: {
      price?: number;
      burgers?: {
        create?: PromoBurgerCreateInput[];
        updateMany?: PromoBurgerUpdateManyWithWhereWithoutPromoInput[];
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

// Middleware para calcular el precio de la promoción antes de crear o actualizar
prisma.$use(async (params: MiddlewareParams, next: (params: MiddlewareParams) => Promise<any>) => {
  if (params.model === 'Promo' && (params.action === 'create' || params.action === 'update')) {
    const promoBurgers = params.args?.data?.burgers?.create ?? params.args?.data?.burgers?.updateMany;

    if (promoBurgers) {
      const burgerIds = (promoBurgers as Array<{ burger: { connect: { burgerId: number } } }>).map(promoBurger => promoBurger.burger.connect.burgerId);

      // Fetch all burgers in one query
      const burgers = await prisma.burger.findMany({
        where: {
          burgerId: {
            in: burgerIds,
          },
        },
      });

      let finalPrice = 0;

      for (const promoBurger of promoBurgers as Array<{ burger: { connect: { burgerId: number } }; discount: number; quantity: number }>) {
        const burger = burgers.find((b: { burgerId: number; }) => b.burgerId === promoBurger.burger.connect.burgerId);
        const originalPrice = (burger?.price || 0) * promoBurger.quantity;
        const discountAmount = originalPrice * (promoBurger.discount / 100);
        finalPrice += originalPrice - discountAmount;
      }

      params.args!.data!.price = finalPrice;
    }
  }

  return next(params);
});
