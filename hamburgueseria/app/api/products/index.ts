import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../../../prisma/services/productService';

const productService = new ProductService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.productType === 'burger') {
          const burgers = await productService.getAllBurgers();
          res.status(200).json(burgers);
        } else if (req.query.productType === 'promo') {
          const promos = await productService.getAllPromos();
          res.status(200).json(promos);
        } else if (req.query.productType === 'extra') {
          const extras = await productService.getAllExtras();
          res.status(200).json(extras);
        } else {
          res.status(400).json({ error: 'Invalid product type' });
        }
        break;
      case 'POST':
        const { data, burgers, productType } = req.body;
        if (productType === 'burger') {
          const newBurger = await productService.createBurger(data);
          res.status(201).json(newBurger);
        } else if (productType === 'promo') {
          const newPromo = await productService.createPromo(data, burgers);
          res.status(201).json(newPromo);
        } else if (productType === 'extra') {
          const newExtra = await productService.createExtra(data);
          res.status(201).json(newExtra);
        } else {
          res.status(400).json({ error: 'Invalid product type' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
