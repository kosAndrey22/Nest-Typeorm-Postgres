import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as packageJson from '../../../package.json';
import { ApiModule } from './api.module';

class ApiBootstrapper {

  public static async bootstrap(): Promise<void> {
    const api = await ApiBootstrapper.create();
    ApiBootstrapper.setupCors(api);
    ApiBootstrapper.setGlobalPrefix(api);
    ApiBootstrapper.setupInterceptors(api);
    ApiBootstrapper.setupPipes(api);
    ApiBootstrapper.setupSwagger(api);
    await ApiBootstrapper.launch(api);
  }

  private static async create(): Promise<NestExpressApplication> {
    const api = await NestFactory.create<NestExpressApplication>(ApiModule);
    return api;
  }

  private static setupCors(api: NestExpressApplication): void {
    if (config.CORS) {
      const corsOptions = {
        origin: (origin, callback): void => {
          callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        headers: ['x-user', 'X-Signature', 'accept', 'content-type', 'authorization'],
      };

      api.use(cors(corsOptions));
    }
  }

  private static setGlobalPrefix(api: NestExpressApplication): void {
    const apiPrefix = 'api/v1';
    api.setGlobalPrefix(apiPrefix);
  }

  private static setupInterceptors(api: NestExpressApplication): void {
    api.useGlobalInterceptors(
      new ClassSerializerInterceptor(api.get(Reflector), {
        excludeExtraneousValues: true,
      }),
    );
  }

  private static setupPipes(api: NestExpressApplication): void {
    api.useGlobalPipes(
      new ValidationPipe(),
    );
  }

  private static setupSwagger(api: NestExpressApplication): void {
    const options = new DocumentBuilder()
      .setTitle(packageJson.name)
      .setDescription(packageJson.description)
      .setVersion(packageJson.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(api, options);
    SwaggerModule.setup('api', api, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  private static async launch(api: NestExpressApplication): Promise<void> {
    const port = config.API.PORT;
    api.use(cookieParser());
    await api.startAllMicroservices();
    await api.listen(port);
  }

}

ApiBootstrapper.bootstrap();
