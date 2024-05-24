import { NextApiRequest, NextApiResponse } from 'next';
import { ClientService } from '../services/clientService';

const clientService = new ClientService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.clientId) {
          const client = await clientService.getClientById(Number(req.query.clientId));
          res.status(200).json(client);
        } else {
          const clients = await clientService.getAllClients();
          res.status(200).json(clients);
        }
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
      case 'PUT':
        if (req.body.type === 'user') {
          const updatedUser = await clientService.updateUser(Number(req.body.clientId), req.body.data);
          res.status(200).json(updatedUser);
        } else if (req.body.type === 'guest') {
          const updatedGuest = await clientService.updateGuest(Number(req.body.clientId), req.body.data);
          res.status(200).json(updatedGuest);
        } else {
          res.status(400).json({ error: 'Invalid client type' });
        }
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
