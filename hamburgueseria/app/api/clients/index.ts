import { NextApiRequest, NextApiResponse } from 'next';
import { ClientService } from '../../../prisma/services/clientService';

const clientService = new ClientService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
        break;
      case 'POST':
        if (req.body.type === 'user') {
          const newUser = await clientService.createUser(req.body.data);
          res.status(201).json(newUser);
        } else if (req.body.type === 'guest') {
          const newGuest = await clientService.createGuest(req.body.data);
          res.status(201).json(newGuest);
        } else {
          res.status(400).json({ error: 'Invalid client type' });
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
