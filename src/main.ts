import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from '../config/config.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(config.PORT);
}
bootstrap();
