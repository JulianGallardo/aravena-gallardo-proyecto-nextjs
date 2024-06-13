import { PrismaClient, Order } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class OrderRepository {
    async getAllOrders(): Promise<Order[]> {
        return prisma.order.findMany();
    }

    async getOrderById(orderId: number): Promise<Order | null> {
        return prisma.order.findUnique({
            where: {
                orderId: orderId,
            },
        });
    }

    async createOrder(orderData: any): Promise<Order> {
        return prisma.order.create({
            data: orderData,
        });
    }

    async updateOrder(orderId: number, orderData: any): Promise<Order | null> {
        return prisma.order.update({
            where: {
                orderId: orderId,
            },
            data: orderData,
        });
    }

    async deleteOrder(orderId: number): Promise<Order | null> {
        return prisma.order.delete({
            where: {
                orderId: orderId,
            },
        });
    }
};