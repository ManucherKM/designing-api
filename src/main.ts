import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import env from 'env-var';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;
const CLIENT_URL = env.get('CLIENT_URL').asString();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.enableCors({ credentials: true, origin: CLIENT_URL });

  await app.listen(PORT);
}

bootstrap();
