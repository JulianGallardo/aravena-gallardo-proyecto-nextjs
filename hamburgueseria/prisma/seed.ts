import prisma from '@/lib/db';
import { Burger, Category, Product } from './generated/client';
import bcrypt from 'bcryptjs';
import { connect } from 'http2';

const burgers = [
  {
    name: 'Byte Clásica', //
    category: Category.SIMPLE,
    description: 'La Byte Clásica es una hamburguesa que nunca pasa de moda. Preparada con un medallón de carne vacuna jugosa, acompañada de hojas frescas de lechuga, rodajas de tomate maduro y nuestra inigualable salsa especial. Ideal para aquellos que disfrutan de los sabores tradicionales en su máxima expresión.',
    price: 4000 // Precio ajustado
  },
  {
    name: 'Doble Byte', //
    category: Category.DOBLE,
    description: 'La Doble Byte es para los verdaderos amantes de la carne. Dos medallones de carne vacuna perfectamente cocidos, cubiertos con queso derretido y tiras crujientes de panceta. Todo esto acompañado de los ingredientes clásicos y frescos que hacen que cada mordisco sea una explosión de sabor.',
    price: 8000 // Precio ajustado
  },
  {
    name: 'Triple Byte',//
    category: Category.TRIPLE,
    description: 'La Triple Byte es una experiencia única para los que no se conforman con poco. Tres jugosos medallones de carne vacuna, cada uno con su porción de queso derretido, coronados con cebolla crujiente que añade una textura irresistible. Una hamburguesa que desafía todos los límites de la indulgencia.',
    price: 12000 // Precio ajustado
  },
  {
    name: 'Byte Picante',//
    category: Category.SIMPLE,
    description: 'Para los que buscan una experiencia intensa, la Byte Picante es la opción perfecta. Un medallón de carne vacuna jugosa, complementado con jalapeños picantes, queso pepper jack y una generosa cantidad de salsa picante. Cada bocado te llevará a un nuevo nivel de sabor y especias.',
    price: 4500 // Precio ajustado
  },
  {
    name: 'Byte BBQ', //
    category: Category.DOBLE,
    description: 'La Byte BBQ es una celebración de los sabores ahumados. Con dos medallones de carne vacuna, bañados en nuestra deliciosa salsa barbacoa casera y acompañados de aros de cebolla crujientes. Esta hamburguesa es un homenaje a las parrillas argentinas y su inconfundible sabor.',
    price: 7500 // Precio ajustado
  },
  {
    name: 'Byte Vegana',
    category: Category.SIMPLE,
    description: 'Nuestra Byte Vegana es una opción deliciosa y consciente. Un medallón a base de plantas que no sacrifica sabor, acompañado de lechuga fresca, tomate y mayonesa vegana. Perfecta para aquellos que buscan disfrutar de una hamburguesa sabrosa sin ingredientes de origen animal.',
    price: 5500 // Precio ajustado
  },
  {
    name: 'Byte Vegana Deluxe',
    category: Category.DOBLE,
    description: 'La Byte Vegana Deluxe lleva la experiencia vegana a otro nivel. Con dos medallones a base de plantas, palta cremosa y queso vegano derretido, cada bocado es una delicia. Ideal para quienes desean una opción sustanciosa y completamente libre de productos animales.',
    price: 8500 // Precio ajustado
  },
  {
    name: 'Chicken Byte',//
    category: Category.SIMPLE,
    description: 'La Byte de Pollo es una opción crocante y sabrosa. Con un medallón de pollo empanado, acompañado de lechuga fresca, tomate y mayonesa. Esta hamburguesa combina lo mejor del pollo crujiente con ingredientes frescos para una experiencia deliciosa en cada mordisco.',
    price: 5000 // Precio ajustado
  },
  {
    name: 'Chicken Byte Picante',//
    category: Category.SIMPLE,
    description: 'Para los amantes del picante, la Byte de Pollo Picante es una elección perfecta. Un medallón de pollo crujiente y picante, acompañado de jalapeños y mayonesa picante. Cada bocado ofrece una combinación explosiva de sabores y texturas que no podrás resistir.',
    price: 5500 // Precio ajustado
  },
  {
    name: 'Chicken Byte BBQ',//
    category: Category.DOBLE,
    description: 'La Byte de Pollo BBQ es una deliciosa combinación de sabores ahumados y crujientes. Dos medallones de pollo empanado, bañados en salsa barbacoa y acompañados de aros de cebolla. Esta hamburguesa es una verdadera celebración de lo mejor del pollo y la barbacoa.',
    price: 7500 // Precio ajustado
  },
  {
    name: 'Byte Doble Cheddar',//
    category: Category.DOBLE,
    description: 'La Byte Doble Cheddar es una experiencia irresistible para los amantes del queso. Dos jugosos medallones de carne vacuna, cada uno coronado con abundante queso cheddar derretido. Acompañada de panceta crocante, cebolla caramelizada y nuestra salsa especial. Una hamburguesa que te llenará de sabor y satisfacción.',
    price: 8500 // Precio ajustado
  },
  {
    name: 'Byte Triple Deluxe', //
    category: Category.TRIPLE,
    description: 'La Byte Triple Deluxe es una verdadera obra maestra. Tres medallones de carne vacuna perfectamente cocidos, acompañados de queso suizo, panceta crocante, cebolla morada, pepinillos y nuestra salsa secreta. Cada bocado es una explosión de sabor que te dejará completamente satisfecho.',
    price: 12000 // Precio ajustado
  },
  {
    name: 'Byte Doble Criolla', //
    category: Category.DOBLE,
    description: 'La Byte Doble Criolla es una celebración de los sabores argentinos. Dos medallones de carne vacuna, queso provolone, tomate, lechuga, huevo a la plancha y salsa criolla. Esta hamburguesa combina lo mejor de nuestra tradición culinaria en cada mordisco.',
    price: 8500 // Precio ajustado
  },
  {
    name: 'Byte Triple Bacon Supreme',//
    category: Category.TRIPLE,
    description: 'La Byte Triple Bacon Supreme es para los verdaderos fanáticos de la panceta. Tres medallones de carne vacuna, cubiertos con queso cheddar, una generosa cantidad de panceta crocante y cebolla crispy. Coronada con nuestra salsa especial y pepinillos. Una hamburguesa que desafía todas las expectativas de sabor y tamaño.',
    price: 13000 // Precio ajustado
  }
];

const promos = [
  {
    name: 'Combo Familiar Byte',
    description: 'El Combo Familiar Byte es perfecto para compartir en familia. Incluye cuatro de nuestras hamburguesas a elección, dos generosas porciones de papas fritas crocantes y cuatro bebidas a tu elección. Una opción ideal para disfrutar con los seres queridos.',
    price: 32000 // Precio ajustado
  },
  {
    name: 'Banquete Mega Byte',
    description: 'El Banquete Mega Byte es un festín para compartir entre amigos. Tres hamburguesas a elección, tres porciones de papas fritas y tres bebidas. Perfecto para esos momentos en los que se quiere disfrutar de buena comida y buena compañía.',
    price: 24000 // Precio ajustado
  },
  {
    name: 'Oferta Dúo Byte', //
    description: 'La Oferta Dúo Byte es ideal para parejas o amigos. Incluye dos hamburguesas a elección, dos porciones de papas fritas y dos bebidas. Una oferta perfecta para disfrutar juntos de una experiencia deliciosa.',
    price: 16000 // Precio ajustado
  },
  {
    name: 'Pack Fiesta Byte',
    description: 'El Pack Fiesta Byte está diseñado para las grandes reuniones. Cinco hamburguesas a elección, cinco porciones de papas fritas y cinco bebidas. La opción perfecta para que todos tus invitados disfruten de una comida deliciosa y completa.',
    price: 40000 // Precio ajustado
  },
  {
    name: 'Especial Solo Byte',
    description: 'El Especial Solo Byte es perfecto para quienes disfrutan de comer bien sin compartir. Incluye una hamburguesa a elección, una porción de papas fritas y una bebida. Una opción completa y deliciosa para una comida individual.',
    price: 8000 // Precio ajustado
  },
  {
    name: 'Combo Gigante Byte',
    description: 'El Combo Gigante Byte es perfecto para compartir entre grandes comedores. Incluye dos hamburguesas Triple Deluxe, dos porciones grandes de papas fritas y dos bebidas grandes. Ideal para cuando tienes un gran apetito y quieres compartir una experiencia épica.',
    price: 35000 // Precio ajustado
  },
  {
    name: 'Super Byte Pack',
    description: 'El Super Byte Pack es la mejor opción para una comida abundante en grupo. Incluye tres hamburguesas Doble Cheddar, tres porciones grandes de papas fritas y tres bebidas grandes. Perfecto para disfrutar con amigos y saciar el hambre de todos.',
    price: 34000 // Precio ajustado
  },
  {
    name: 'Festín Byte Triple',
    description: 'El Festín Byte Triple es la elección definitiva para una comida impresionante. Incluye tres hamburguesas Triple Bacon Supreme, tres porciones de papas fritas, tres bebidas y una porción de aros de cebolla. Ideal para una comida que nadie olvidará.',
    price: 48000 // Precio ajustado
  },
  {
    name: 'Byte Familiar Deluxe',
    description: 'El Byte Familiar Deluxe está diseñado para una comida en familia con gran estilo. Incluye cuatro hamburguesas Doble Criolla, cuatro porciones de papas fritas, cuatro bebidas y una porción de nachos con queso. Una opción completa y deliciosa para disfrutar en familia.',
    price: 52000 // Precio ajustado
  }
];



const bcryptPassword = bcrypt.hashSync('admin', 10);

const extras = [
  { name: 'Extra Cheddar', price: 1000.00, maxQuantity: 3 },
  { name: 'Bacon', price: 1500.00, maxQuantity: 2 },
  { name: 'Jalapeños', price: 1000, maxQuantity: 3 },
  { name: 'Aros de Cebolla', price: 1000.00, maxQuantity: 2 },
  { name: 'Avocado', price: 1500.00, maxQuantity: 1 },
  { name: 'Mushrooms', price: 800.00, maxQuantity: 2 },
  { name: 'Cebolla Caramelizada', price: 1000, maxQuantity: 3 },
  { name: 'Pickles', price: 1500.00, maxQuantity: 3 },
  { name: 'Salsa BBQ', price: 500.00, maxQuantity: 3 },
  { name: 'Salsa Byte', price: 500.00, maxQuantity: 3 }
];

const seed = async () => {
  await prisma.order.deleteMany();
  await prisma.extra.deleteMany();
  await prisma.burger.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.product.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.user.deleteMany();
  await prisma.client.deleteMany();
  await prisma.productsOnOrder.deleteMany();
  await prisma.burgerOnPromo.deleteMany();
  await prisma.extraOnOrder.deleteMany();

  // Create Clients, Users, and Guests
  await prisma.client.create({
    data: {
      clientId: 1,
      user: {
        create: {
          email: 'admin@admin.com',
          password: bcryptPassword, // admin
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
  const products: Product[] = [];
  const burgerIds:number[] = [];
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
    prisma.burger.findUnique({
      where: { productId: product.productId },
    }).then((burger) => {
      burgerIds.push(Number(burger?.burgerId)); //saco el burgerId
    }
    );
    productCount++;
  }

  for (const promo of promos) {
    const product: Product = await prisma.product.create({
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
        burgers: {
          create: [
            {
              burger: {
                connect: { burgerId: burgerIds[Math.floor(Math.random()*burgerIds.length)]}  // ID de la hamburguesa existente
              },
              quantity: 2,
              newPrice: 12.99
            },
            {
              burger: {
                connect: { burgerId: burgerIds[Math.floor(Math.random()*burgerIds.length)] } // ID de otra hamburguesa existente
              },
              quantity: 1,
              newPrice: 10.99
            }
          ]
        }
      },
      include: {
        burgers: true // Incluye las relaciones PromoBurger creadas
      }
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
      let product: Product, productExists;
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
