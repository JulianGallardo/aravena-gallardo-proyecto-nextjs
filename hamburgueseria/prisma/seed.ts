import prisma from '@/lib/db';
import { Category, Product } from './generated/client';
import bcrypt from 'bcryptjs';

const burgers = [
  {
    name: 'Classic Byte',
    category: Category.SIMPLE,
    description: 'A classic burger with lettuce, tomato, and our special sauce.',
    price: 8.99
  },
  {
    name: 'Double Byte',
    category: Category.DOBLE,
    description: 'A double patty burger with cheese, bacon, and all the fixings.',
    price: 12.99
  },
  {
    name: 'Triple Byte',
    category: Category.TRIPLE,
    description: 'Three juicy patties with triple cheese and crispy onions.',
    price: 15.99
  },
  {
    name: 'Spicy Byte',
    category: Category.SIMPLE,
    description: 'A spicy burger with jalapeños, pepper jack cheese, and hot sauce.',
    price: 9.99
  },
  {
    name: 'BBQ Byte',
    category: Category.DOBLE,
    description: 'A BBQ burger with double patties, BBQ sauce, and onion rings.',
    price: 11.99
  },
  {
    name: 'Vegan Byte',
    category: Category.SIMPLE,
    description: 'A vegan burger with a plant-based patty, lettuce, tomato, and vegan mayo.',
    price: 10.99
  },
  {
    name: 'Vegan Deluxe Byte',
    category: Category.DOBLE,
    description: 'A deluxe vegan burger with double plant-based patties, avocado, and vegan cheese.',
    price: 14.99
  },
  {
    name: 'Chicken Byte',
    category: Category.SIMPLE,
    description: 'A crispy chicken burger with lettuce, tomato, and mayo.',
    price: 9.99
  },
  {
    name: 'Spicy Chicken Byte',
    category: Category.SIMPLE,
    description: 'A spicy crispy chicken burger with jalapeños and spicy mayo.',
    price: 10.99
  },
  {
    name: 'BBQ Chicken Byte',
    category: Category.DOBLE,
    description: 'A BBQ chicken burger with double chicken patties, BBQ sauce, and onion rings.',
    price: 12.99
  }
];

const promos = [
  {
    name: 'Family Byte Combo',
    description: 'A combo with four burgers, two fries, and four drinks.',
    price: 29.99
  },
  {
    name: 'Mega Byte Feast',
    description: 'A feast with three burgers, three fries, and three drinks.',
    price: 24.99
  },
  {
    name: 'Byte Duo Deal',
    description: 'A deal for two with two burgers, two fries, and two drinks.',
    price: 19.99
  },
  {
    name: 'Party Byte Pack',
    description: 'A pack with five burgers, five fries, and five drinks.',
    price: 39.99
  },
  {
    name: 'Solo Byte Special',
    description: 'A special solo meal with one burger, one fry, and one drink.',
    price: 11.99
  }
];

const bcryptPassword = bcrypt.hashSync('admin', 10);

const extras = [
  { name: 'Extra Cheese', price: 1.00, maxQuantity: 3 },
  { name: 'Bacon', price: 1.50, maxQuantity: 2 },
  { name: 'Jalapeños', price: 0.75, maxQuantity: 3 },
  { name: 'Onion Rings', price: 1.25, maxQuantity: 2 },
  { name: 'Avocado', price: 2.00, maxQuantity: 1 },
  { name: 'Mushrooms', price: 1.00, maxQuantity: 2 },
  { name: 'Grilled Onions', price: 0.75, maxQuantity: 3 },
  { name: 'Pickles', price: 0.50, maxQuantity: 3 },
  { name: 'BBQ Sauce', price: 0.50, maxQuantity: 3 },
  { name: 'Special Sauce', price: 0.75, maxQuantity: 3 }
];

const seed = async () => {
  await prisma.productsOnOrder.deleteMany();
  await prisma.burgerOnPromo.deleteMany();
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
          password: bcryptPassword , // admin
          role: 'ADMIN',
          fullName: 'Admin',
        },
      },
    },
  });

  // Create Extras
  for (const extra of extras) {
    await prisma.extra.create({
      data: extra,
    });
  }

  // Create Products, Burgers, Promos
  const products = [];
  let productCount = 0;

  for (const burger of burgers) {
    const product = await prisma.product.create({
      data: {},
    });
    products.push(product);

    await prisma.burger.create({
      data: {
        productId: product.productId,
        name: burger.name,
        category: burger.category,
        description: burger.description,
        stock: 100,
        price: burger.price,
      },
    });

    productCount++;
  }

  for (const promo of promos) {
    const product = await prisma.product.create({
      data: {},
    });
    products.push(product);

    await prisma.promo.create({
      data: {
        productId: product.productId,
        category: Category.PROMO,
        name: promo.name,
        description: promo.description,
        price: promo.price,
      },
    });

    productCount++;
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
      let product:Product, productExists;
      do {
        product = products[Math.floor(Math.random() * productCount)];
        productExists = orderProducts.some(op => op.productId === product.productId);
      } while (productExists);

      const quantity = Math.floor(Math.random() * 5) + 1;
      const productData = await prisma.product.findUnique({
        where: { productId: product.productId },
        include: { burger: true, promo: true }
      });

      const price = productData?.burger?.price || productData?.promo?.price || 0;

      orderProducts.push({
        orderId: order.orderId,
        productId: product.productId,
        quantity,
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
