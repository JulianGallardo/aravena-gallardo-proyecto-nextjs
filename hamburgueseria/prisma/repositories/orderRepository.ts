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
                ExtraOnOrder: {
                    select: {
                        quantity: true,
                        burger: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                        burgerId: true,
                        extra: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
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
                ExtraOnOrder: {
                    select: {
                        quantity: true,
                        burger: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                        burgerId: true,
                        extra: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
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
                clientId: 1, // Dejamos hardcodeado para que se le guarden todas al mismo cliente
                paymentMethod: PaymentMethod.MERCADO_PAGO,
                totalAmount: totalAmount,
                ExtraOnOrder: {
                    create: orderData.map((item) => ({
                        burger: {
                            connect: {
                                burgerId: item.cartItemBurger?.burgerId ?? 0,
                            },
                        },
                        burgerId: item.cartItemBurger?.burgerId ?? 0,
                        extra: {
                            connect: {
                                extraId: item.cartItemBurger?.extras[0].extra.extraId ?? 0,
                            },
                        },
                        quantity: item.cartItemBurger?.extras[0].quantity ?? 0,
                    })),
                },
                products: {
                    create: orderData.map((item) => ({
                        product: {
                            connect: {
                                productId: item.cartItemBurger?.productId ?? item.cartItemPromo?.productId ?? 0,
                            },
                        },
                        quantity: item.cartItemBurger?.quantity ?? item.cartItemPromo?.quantity ?? 0,
                        burger: item.cartItemBurger ? {
                            create: {
                                name: item.cartItemBurger.name,
                                description: item.cartItemBurger.description,
                                category: item.cartItemBurger.category,
                                stock: item.cartItemBurger.stock,
                                price: item.cartItemBurger.price,
                                extras: {
                                    create: item.cartItemBurger.extras.map(extra => ({
                                        extra: {
                                            connect: {
                                                extraId: extra.extra.extraId,
                                            },
                                        },
                                        quantity: extra.quantity,
                                    })),
                                },
                            },
                        } : undefined,
                        promo: item.cartItemPromo ? {
                            create: {
                                name: item.cartItemPromo.name,
                                description: item.cartItemPromo.description,
                                category: item.cartItemPromo.category,
                                price: item.cartItemPromo.price,
                                burgers: {
                                    create: item.cartItemPromo.burgers.map(burger => ({
                                        burger: {
                                            connect: {
                                                burgerId: burger.burger.burgerId,
                                            },
                                        },
                                        quantity: burger.quantity,
                                        newPrice: burger.newPrice,
                                    })),
                                },
                            },
                        } : undefined,
                    })),

                },
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
