import { PrismaClient, PaymentMethod, Order } from '@/prisma/generated/client';
import { OrderRepository } from '@/prisma/repositories/orderRepository';
import { OrdenExtendida } from '@/lib/definitions';
const prisma = new PrismaClient();
const orderRepository = new OrderRepository()

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
    return orderRepository.createOrder({ clientId, products, paymentMethod, totalAmount });
  }

  async getAllOrders(): Promise<OrdenExtendida[]> {
    return orderRepository.getAllOrders();
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    return orderRepository.getOrderById(orderId);
  }


  async getAllOrdersByUserId(userId: number): Promise<OrdenExtendida[]> {
    return orderRepository.getOrdersByUserId(userId);
  }
}
