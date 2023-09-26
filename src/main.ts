import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const cookieSession = require('cookie-session');
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({ keys: ['asdf'] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
