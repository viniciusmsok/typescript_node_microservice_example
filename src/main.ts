import { urlencoded } from 'express';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import {
  SwaggerModule,
  DocumentBuilder
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ENVIRONMENT_PORT } from './core/environment';
import { HttpExceptionFilter } from './basic-api';


async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    { cors: true }
  );

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get(ENVIRONMENT_PORT);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true
    })
  );

  app.enableCors();
  app.use(urlencoded({ extended: true }));

  const config = new DocumentBuilder()
    .setTitle('TYPESCRIPT NODE MICROSERVICE EXAMPLE')
    .setDescription('Microservice | Typescript | Node | MongoDB | Validator | Swagger')
    .setVersion('1.0')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.startAllMicroservices();

  await app.listen(port);
}

bootstrap();
