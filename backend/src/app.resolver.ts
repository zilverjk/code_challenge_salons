import { Resolver, Query } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Resolver()
export class AppResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    const helloWorld = await prisma.helloWorld.findFirst();
    return helloWorld ? helloWorld.message : 'No message found';
  }
}
