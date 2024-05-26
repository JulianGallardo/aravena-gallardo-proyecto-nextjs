import { PrismaClient, Prisma, User, Guest } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export class ClientRepository {  
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const client = await prisma.client.create({
      data: {
        user: {
          create: data,
        },
      },
      include: {
        user: true,
      },
    });
    return client.user!;
  }   
  
  async createGuest(data: Prisma.GuestCreateInput): Promise<Guest> {
    const client = await prisma.client.create({
      data: {
        guest: {
          create: data,
        },
      },
      include: {
        guest: true,
      },
    });
    return client.guest!;
  }

  async findAllUsers(): Promise<User[]> {
    const clients = await prisma.client.findMany({
      include: {
        user: true,
      },
    });

    return clients.map(client => client.user!);
  }

  async findAllGuests(): Promise<Guest[]> {
    const clients = await prisma.client.findMany({
      include: {
        guest: true,
      },
    });

    return clients.map(client => client.guest!);
  }

  async findAllClients(): Promise<(User | Guest)[]> {
    const clients = await prisma.client.findMany({
      include: {
        user: true,
        guest: true,
      },
    });

    return clients.map(client => client.user ?? client.guest!);
  }
  
  async findClientById(clientId: number): Promise<User | Guest | null> {
    const client = await prisma.client.findUnique({
      where: { clientId },
      include: {
        user: true,
        guest: true,
      },
    });

    if (client) {
      return client.user ?? client.guest ?? null;
    }
    return null;
  }

  async updateUser(clientId: number, data: Prisma.UserUpdateInput): Promise<User> {
    const client = await prisma.client.update({
      where: { clientId },
      data: {
        user: {
          update: data,
        },
      },
      include: {
        user: true,
      },
    });

    return client.user!;
  }

  async updateGuest(clientId: number, data: Prisma.GuestUpdateInput): Promise<Guest> {
    const client = await prisma.client.update({
      where: { clientId },
      data: {
        guest: {
          update: data,
        },
      },
      include: {
        guest: true,
      },
    });

    return client.guest!;
  }

  async deleteClient(clientId: number): Promise<void> {
    await prisma.client.delete({
      where: { clientId },
    });
  }
}
