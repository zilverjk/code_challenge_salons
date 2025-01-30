import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { PrismaClient } from '@prisma/client';

describe('AppResolver', () => {
  let resolver: AppResolver;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppResolver,
        {
          provide: PrismaClient,
          useValue: {
            helloWorld: {
              findFirst: jest.fn().mockResolvedValue({ message: 'Hello, World!' }),
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return "Hello, World!"', async () => {
    const result = await resolver.hello();
    expect(result).toBe('Hello, World!');
    expect(prisma.helloWorld.findFirst).toHaveBeenCalled();
  });
});
