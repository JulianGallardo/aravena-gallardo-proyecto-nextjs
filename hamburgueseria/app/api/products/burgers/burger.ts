import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../../../prisma/services/productService';

const productService = new ProductService();
type Burger = {
  burgerId: number;
  name: string;
  category: string;
  description: string;
  extras: string[];
  price: number;
};
const burgersPlaceholder: Burger[] = [
  {
    burgerId: 1,
    name: "Classic Burger",
    category: "Beef",
    description: "A delicious classic beef burger",
    extras: ["Cheese", "Lettuce", "Tomato"],
    price: 9.99
  },
  {
    burgerId: 2,
    name: "Chicken Burger",
    category: "Chicken",
    description: "A tasty chicken burger",
    extras: ["Mayonnaise", "Pickles", "Onion"],
    price: 8.99
  },
  {
    burgerId: 3,
    name: "Veggie Burger",
    category: "Vegetarian",
    description: "A flavorful vegetarian burger",
    extras: ["Avocado", "Sprouts", "Salsa"],
    price: 7.99
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handler called');
  console.log('Request method:', req.method);
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.productId) {
          const burger = await productService.getBurgerById(Number(req.query.productId));
          res.status(200).json(burger);
        } else {
          //const burgers = await productService.getAllBurgers();
          res.status(200).json(burgersPlaceholder);
        }
        break;
      case 'POST':
        const { data } = req.body;
        const newBurger = await productService.createBurger(data);
        res.status(201).json(newBurger);
        break;
      case 'PUT':
        const updatedBurger = await productService.updateBurger(Number(req.body.productId), req.body.data);
        res.status(200).json(updatedBurger);
        break;
      case 'DELETE':
        await productService.deleteBurger(Number(req.body.productId));
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
