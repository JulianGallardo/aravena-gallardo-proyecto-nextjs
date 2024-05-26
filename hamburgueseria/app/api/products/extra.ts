import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../../prisma/services/productService';

const productService = new ProductService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.productId) {
          const extra = await productService.getExtraById(Number(req.query.productId));
          res.status(200).json(extra);
        } else {
          const extras = await productService.getAllExtras();
          res.status(200).json(extras);
        }
        break;
      case 'POST':
        const { data } = req.body;
        const newExtra = await productService.createExtra(data);
        res.status(201).json(newExtra);
        break;
      case 'PUT':
        const updatedExtra = await productService.updateExtra(Number(req.body.productId), req.body.data);
        res.status(200).json(updatedExtra);
        break;
      case 'DELETE':
        await productService.deleteExtra(Number(req.body.productId));
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
