import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../../prisma/services/productService';

const productService = new ProductService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId, productType } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        if (productType === 'burger') {
          const burger = await productService.getBurgerById(Number(productId));
          res.status(200).json(burger);
        } else if (productType === 'promo') {
          const promo = await productService.getPromoById(Number(productId));
          res.status(200).json(promo);
        } else if (productType === 'extra') {
          const extra = await productService.getExtraById(Number(productId));
          res.status(200).json(extra);
        } else {
          res.status(400).json({ error: 'Invalid product type' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
