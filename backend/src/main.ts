import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const corsAllowAllConfig = {cors: true}
  const app = await NestFactory.create(AppModule, corsAllowAllConfig);
  console.log("[nest] starting on port 3777")
  await app.listen(3777);
}
bootstrap();
