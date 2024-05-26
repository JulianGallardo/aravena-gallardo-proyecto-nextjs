import { PrismaClient } from '@/prisma/generated/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            fullName: "Riquelme",
            email: "user@user.com",
            password: "1234",
            client: {
                create: {
                    clientId: 1
                }
            } // Add the missing 'client' property here
        }
    });
}

main()
    .catch((e) => {
    throw e;
    })
    .finally(async () => {
    await prisma.$disconnect();
    });
