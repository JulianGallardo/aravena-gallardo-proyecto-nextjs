import { NextApiRequest, NextApiResponse } from 'next';
import { OrderService } from '../../../prisma/services/orderService';

const orderService = new OrderService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { clientId, products, paymentMethod } = req.body;
      const order = await orderService.createOrder({ clientId, products, paymentMethod });
      res.status(201).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
