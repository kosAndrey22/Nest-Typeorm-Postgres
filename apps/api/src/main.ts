import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as packageJson from '../../../package.json';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const port = config.API.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (config.CORS) {
    const corsOptions = {
      origin: (origin, callback): void => {
        callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
      headers: ['x-user', 'X-Signature', 'accept', 'content-type', 'authorization'],
    };

    app.use(cors(corsOptions));
    app.use(cookieParser());
  }
  const apiPrefix = 'api/v1';

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  const options = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
}

bootstrap();
