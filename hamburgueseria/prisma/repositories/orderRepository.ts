import { CartItem } from '@/lib/CartTypes';
import { OrdenExtendida } from '@/lib/definitions';
import { PrismaClient, Order, PaymentMethod, OrderStatus } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class OrderRepository {
    updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {

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
                    select: {
                        quantity: true,
                    },
                    include: {
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

                        product: {
                            include: {
                                burger: {
                                    select: {
                                        name: true,
                                        description: true,
                                        category: true,
                                        stock: true,
                                        price: true,
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
                    select: {
                        quantity: true,
                    },
                    include: {
                        extras: {
                            select: {
                                quantity: true,
                                extra: {
                                    select: {
                                        name: true,
                                        price: true,
                                    }
                                }

                            },
                        },
                        
                    product: {
                        include: {

                            burger: {
                                select: {
                                    name: true,
                                    description: true,
                                    category: true,
                                    stock: true,
                                    price: true,
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

    async getOrderById(orderId: number): Promise < Order | null > {
    return prisma.order.findUnique({
        where: {
            orderId: orderId,
        },
        include: {
            products: true,
        },
    });
}

    async createOrder(orderData: CartItem[], totalAmount: number): Promise < Order > {
    return prisma.order.create({
        data: {
            clientId: 1, // Dejamos hardcodeado para que se le guarden todas al mismo cliente
            paymentMethod: PaymentMethod.MERCADO_PAGO,
            totalAmount: totalAmount,

            products: {
                create: orderData.map((item) => ({
                    product: {
                        connect: {
                            productId: item.cartItemBurger?.productId ?? item.cartItemPromo?.productId ?? 0,
                        },
                    },
                    quantity: Number(item.cartItemBurger?.quantity) ?? Number(item.cartItemPromo?.quantity) ?? 0,
                    extra: {
                        create: item.cartItemBurger?.extras?.map((extra) => ({
                            extra: {
                                connect: {
                                    extraId: extra.extra.extraId,

                                },
                            },

                            quantity: Number(extra.quantity),
                        })) ?? [],
                    }
                })),

            },
        },
    });
}

    async updateOrder(orderId: number, orderData: any): Promise < Order | null > {
    return prisma.order.update({
        where: {
            orderId: orderId,
        },
        data: orderData,
    });
}

    async deleteOrder(orderId: number): Promise < Order | null > {
    return prisma.order.delete({
        where: {
            orderId: orderId,
        },
    });
}
};
