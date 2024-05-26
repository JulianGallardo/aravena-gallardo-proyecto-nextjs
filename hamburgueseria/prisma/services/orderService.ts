import { PrismaClient, PaymentMethod, Order } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class OrderService {
  async createOrder(data: { clientId: number; products: { productId: number, quantity: number }[], paymentMethod: PaymentMethod }): Promise<Order> {
    const { clientId, products, paymentMethod } = data;

    // Calcular el totalAmount
    const productDetails = await prisma.product.findMany({
      where: {
        productId: { in: products.map(p => p.productId) },
      },
      include: {
        burger: true,
        promo: true,
      },
    });

    let totalAmount = 0;
    products.forEach((product) => {
      const productDetail = productDetails.find(p => p.productId === product.productId);
      if (productDetail?.burger) {
        totalAmount += productDetail.burger.price * product.quantity;
      } else if (productDetail?.promo) {
        totalAmount += productDetail.promo.price * product.quantity;
      }
    });

    const order = await prisma.order.create({
      data: {
        clientId,
        totalAmount,
        paymentMethod,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
    });

    return order;
  }
}
