import { OrdenExtendida } from '@/lib/definitions';
import { PrismaClient, Order } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class OrderRepository {
    async getAllOrders(): Promise<Order[]> {
        return prisma.order.findMany();
    }

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return prisma.order.findMany({
            where: {
                clientId: userId,
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                burger: true,
                                promo: true,
                            },
                        }
                    },
                },
            },
        });
    }

    async getOrderById(orderId: number): Promise<Order | null> {
        return prisma.order.findUnique({
            where: {
                orderId: orderId,
            },
            include: {
                products: true,
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