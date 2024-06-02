import { faker } from '@faker-js/faker';
import prisma from '@/lib/db';

const seed = async () => {
  await prisma.productsOnOrder.deleteMany();
  await prisma.extrasOnBurgers.deleteMany();
  await prisma.promoBurger.deleteMany();
  await prisma.order.deleteMany();
  await prisma.extra.deleteMany();
  await prisma.burger.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.product.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();

  // Create Clients, Users, and Guests
  await prisma.client.create({
    data: {
      clientId: 1,
      user: {
        create: {
          email: 'admin@admin.com',
          password: '$2b$10$6v6b7Q1v2Y5k0nX1tK0QKu9F5s4hQjP1tUd5Wn7tJpX6QY6qg9U2q', // admin
          role: 'ADMIN',
          fullName: 'Admin',
          
    },
  });



  // Create Products, Burgers, Promos, and Extras
  const products = [];
  for (let i = 0; i < 20; i++) {
    const product = await prisma.product.create({
      data: {},
    });
    products.push(product);

    if (i % 2 === 0) {
      await prisma.burger.create({
        data: {
          productId: product.productId,
          name: faker.commerce.productName(),
          category: 'SIMPLE',
          description: faker.lorem.sentence(),
          stock: faker.number.int({ min: 0, max: 100 }),
          price: faker.number.float({ min: 5, max: 20 }),
        },
      });
    } else {
      await prisma.promo.create({
        data: {
          productId: product.productId,
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: faker.number.float({ min: 10, max: 50 }),
        },
      });
    }
  }

  // Create Extras
  const extras = [];
  for (let i = 0; i < 10; i++) {
    const extra = await prisma.extra.create({
      data: {
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 1, max: 5 }),
        maxQuantity: faker.number.int({ min: 1, max: 5 }),
      },
    });
    extras.push(extra);
  }

  // Create Orders
  for (let i = 0; i < 10; i++) {
    const client = await prisma.client.findFirst({
      skip: i,
    });

    if (!client) continue;

    const order = await prisma.order.create({
      data: {
        clientId: client.clientId,
        totalAmount: 0,
        paymentMethod: 'EFECTIVO',
      },
    });

    const orderProducts = [];
    let totalAmount = 0;

    for (let j = 0; j < 5; j++) {
      let product, productExists;
      do {
        product = products[faker.number.int({ min: 0, max: products.length - 1 })];
        productExists = orderProducts.some(op => op.productId === product.productId);
      } while (productExists);

      const quantity = faker.number.int({ min: 1, max: 5 });
      const price = faker.number.float({ min: 5, max: 20 });

      orderProducts.push({
        orderId: order.orderId,
        productId: product.productId,
        quantity,
        price,
      });

      totalAmount += price * quantity;
    }

    await prisma.productsOnOrder.createMany({
      data: orderProducts,
    });

    await prisma.order.update({
      where: {
        orderId: order.orderId,
      },
      data: {
        totalAmount,
      },
    });
  }

  console.log('Seeding completed.');
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
