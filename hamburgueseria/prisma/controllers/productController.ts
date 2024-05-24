import { NextApiRequest, NextApiResponse } from 'next';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.productType === 'burger') {
          if (req.query.productId) {
            const burger = await productService.getBurgerById(Number(req.query.productId));
            res.status(200).json(burger);
          } else {
            const burgers = await productService.getAllBurgers();
            res.status(200).json(burgers);
          }
        } else if (req.query.productType === 'promo') {
          if (req.query.productId) {
            const promo = await productService.getPromoById(Number(req.query.productId));
            res.status(200).json(promo);
          } else {
            const promos = await productService.getAllPromos();
            res.status(200).json(promos);
          }
        } else if (req.query.productType === 'extra') {
          if (req.query.productId) {
            const extra = await productService.getExtraById(Number(req.query.productId));
            res.status(200).json(extra);
          } else {
            const extras = await productService.getAllExtras();
            res.status(200).json(extras);
          }
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
      case 'PUT':
        if (req.body.productType === 'burger') {
          const updatedBurger = await productService.updateBurger(Number(req.body.productId), req.body.data);
          res.status(200).json(updatedBurger);
        } else if (req.body.productType === 'promo') {
          const updatedPromo = await productService.updatePromo(Number(req.body.productId), req.body.data, req.body.burgers);
          res.status(200).json(updatedPromo);
        } else if (req.body.productType === 'extra') {
          const updatedExtra = await productService.updateExtra(Number(req.body.productId), req.body.data);
          res.status(200).json(updatedExtra);
        } else {
          res.status(400).json({ error: 'Invalid product type' });
        }
        break;
      case 'DELETE':
        if (req.body.productType === 'burger') {
          await productService.deleteBurger(Number(req.body.productId));
          res.status(204).end();
        } else if (req.body.productType === 'promo') {
          await productService.deletePromo(Number(req.body.productId));
          res.status(204).end();
        } else if (req.body.productType === 'extra') {
          await productService.deleteExtra(Number(req.body.productId));
          res.status(204).end();
        } else {
          res.status(400).json({ error: 'Invalid product type' });
        }
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
