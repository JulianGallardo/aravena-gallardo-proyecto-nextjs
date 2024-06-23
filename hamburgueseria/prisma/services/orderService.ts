import { PrismaClient, PaymentMethod, Order, OrderStatus } from '@/prisma/generated/client';
import { OrderRepository } from '@/prisma/repositories/orderRepository';
import { OrdenExtendida } from '@/lib/definitions';
import { CartItem } from '@/lib/CartTypes';
const prisma = new PrismaClient();
const orderRepository = new OrderRepository()

export class OrderService {
  async createOrder(data:CartItem[],totalAmount:number,clientId:number): Promise<Order> {
    return orderRepository.createOrder(data,totalAmount,clientId);
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

  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
    return orderRepository.updateOrderStatus(orderId, status);
  }
}
