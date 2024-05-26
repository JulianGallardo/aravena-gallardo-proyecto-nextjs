import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../../prisma/services/productService';

const productService = new ProductService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.productId) {
          const promo = await productService.getPromoById(Number(req.query.productId));
          res.status(200).json(promo);
        } else {
          const promos = await productService.getAllPromos();
          res.status(200).json(promos);
        }
        break;
      case 'POST':
        const { data, burgers } = req.body;
        const newPromo = await productService.createPromo(data, burgers);
        res.status(201).json(newPromo);
        break;
      case 'PUT':
        const updatedPromo = await productService.updatePromo(Number(req.body.productId), req.body.data, req.body.burgers);
        res.status(200).json(updatedPromo);
        break;
      case 'DELETE':
        await productService.deletePromo(Number(req.body.productId));
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
