import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.helloWorld.create({
    data: {
      message: 'Hello, Prisma!',
    },
  });

  const salon = await prisma.salon.create({
    data: {
      name: 'Salon 1',
      location: 'Location 1'
    }
  })

  if (!salon) return

  await prisma.service.create({
    data: {
      name: 'Service 1',
      price: 23.5000,
      salonId: salon.id
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
