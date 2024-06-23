import { CartItem } from '@/lib/CartTypes';
import { OrdenExtendida } from '@/lib/definitions';
import { PrismaClient, Order, PaymentMethod, OrderStatus } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class OrderRepository {
    updateOrderStatus(orderId: number, status: OrderStatus):  Promise<Order> {

        return prisma.order.update({
            where: {
                orderId: orderId,
            },
            data: {
                status: status,
            },
        });
    }

    async getAllOrders(): Promise<OrdenExtendida[]> {
        return prisma.order.findMany({
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                burger: {
                                    select: {
                                        name: true,
                                        description: true,
                                        category: true,
                                        stock: true,
                                        price: true,
                                        extras: {
                                            select: {
                                                quantity: true,
                                                extra: {
                                                    select: {
                                                        name: true,
                                                        price: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                promo: {
                                    select: {
                                        name: true,
                                        description: true,
                                        category: true,
                                        price: true,
                                    },
                                },
                            },
                        }
                    },
                },
            },
        });
    }

    async getOrdersByUserId(userId: number): Promise<OrdenExtendida[]> {
        return prisma.order.findMany({
            where: {
                clientId: userId,
            },
            include: {
                products: {
                    include: {
                        product: {
                            include: {
                                burger: {
                                    select: {
                                        name: true,
                                        description: true,
                                        category: true,
                                        stock: true,
                                        price: true,
                                        extras: {
                                            select: {
                                                quantity: true,
                                                extra: {
                                                    select: {
                                                        name: true,
                                                        price: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                promo: {
                                    select: {
                                        name: true,
                                        description: true,
                                        category: true,
                                        price: true,
                                    },
                                },
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

    async createOrder(orderData: CartItem[], totalAmount: number): Promise<Order> {
        return prisma.order.create({
            data: {
                clientId: 1, // Debes reemplazarlo con el ID real del cliente
                paymentMethod: PaymentMethod.MERCADO_PAGO,
                products: {
                    create: orderData.map((item) => ({
                        productId: item.cartItemBurger?.productId ?? item.cartItemPromo?.productId ?? 0,
                        quantity: item.cartItemBurger?.quantity ?? item.cartItemPromo?.quantity ?? 0,
                    })),
                },
                totalAmount: totalAmount,
            },
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
