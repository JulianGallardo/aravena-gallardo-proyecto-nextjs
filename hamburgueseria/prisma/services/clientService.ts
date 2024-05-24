import { ClientRepository } from '../repositories/clientRepository';
import { Prisma, User, Guest } from '@prisma/client';

const clientRepository = new ClientRepository();

export class ClientService {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return clientRepository.createUser(data);
  }

  async createGuest(data: Prisma.GuestCreateInput): Promise<Guest> {
    return clientRepository.createGuest(data);
  }

  async getAllClients(): Promise<(User | Guest)[]> {
    return clientRepository.findAllClients();
  }

  async getClientById(clientId: number): Promise<User | Guest | null> {
    return clientRepository.findClientById(clientId);
  }

  async updateUser(clientId: number, data: Prisma.UserUpdateInput): Promise<User> {
    return clientRepository.updateUser(clientId, data);
  }

  async updateGuest(clientId: number, data: Prisma.GuestUpdateInput): Promise<Guest> {
    return clientRepository.updateGuest(clientId, data);
  }

  async deleteClient(clientId: number): Promise<void> {
    return clientRepository.deleteClient(clientId);
  }
}
