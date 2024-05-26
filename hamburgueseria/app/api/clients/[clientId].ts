import { NextApiRequest, NextApiResponse } from 'next';
import { ClientService } from '../../../prisma/services/clientService';

const clientService = new ClientService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { clientId } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        const client = await clientService.getClientById(Number(clientId));
        res.status(200).json(client);
        break;
      case 'DELETE':
        await clientService.deleteClient(Number(clientId));
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
