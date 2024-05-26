import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../../prisma/services/productService';

const productService = new ProductService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.productId) {
          const burger = await productService.getBurgerById(Number(req.query.productId));
          res.status(200).json(burger);
        } else {
          const burgers = await productService.getAllBurgers();
          res.status(200).json(burgers);
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
