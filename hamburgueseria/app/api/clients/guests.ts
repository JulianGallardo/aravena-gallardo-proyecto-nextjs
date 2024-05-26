import { NextApiRequest, NextApiResponse } from 'next';
import { ClientService } from '../../../prisma/services/clientService';

const clientService = new ClientService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        if (req.query.clientId) {
          const guest = await clientService.getClientById(Number(req.query.clientId));
          res.status(200).json(guest);
        } else {
          const guests = await clientService.getAllGuests();
          res.status(200).json(guests);
        }
        break;
      case 'POST':
        const newGuest = await clientService.createGuest(req.body.data);
        res.status(201).json(newGuest);
        break;
      case 'PUT':
        const updatedGuest = await clientService.updateGuest(Number(req.body.clientId), req.body.data);
        res.status(200).json(updatedGuest);
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
