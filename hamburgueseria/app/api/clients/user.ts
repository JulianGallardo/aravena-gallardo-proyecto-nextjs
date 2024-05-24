import { NextApiRequest, NextApiResponse } from 'next';
import { ClientService } from '../../../prisma/services/clientService';

const clientService = new ClientService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.clientId) {
          const user = await clientService.getClientById(Number(req.query.clientId));
          res.status(200).json(user);
        } else {
          const users = await clientService.getAllUsers();
          res.status(200).json(users);
        }
        break;
      case 'POST':
        const newUser = await clientService.createUser(req.body.data);
        res.status(201).json(newUser);
        break;
      case 'PUT':
        const updatedUser = await clientService.updateUser(Number(req.body.clientId), req.body.data);
        res.status(200).json(updatedUser);
        break;
      case 'DELETE':
        await clientService.deleteClient(Number(req.body.clientId));
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
