import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as packageJson from '../../../package.json';
import { MainModule } from './main.module';

class ApiBootstrapper {

  public static async bootstrap(): Promise<void> {
    const app = await ApiBootstrapper.create();
    ApiBootstrapper.setupCors(app);
    ApiBootstrapper.setGlobalPrefix(app);
    ApiBootstrapper.setupInterceptors(app);
    ApiBootstrapper.setupPipes(app);
    ApiBootstrapper.setupSwagger(app);
    await ApiBootstrapper.launch(app);
  }

  private static async create(): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(MainModule);
    return app;
  }

  private static setupCors(app: NestExpressApplication): void {
    if (config.CORS) {
      const corsOptions = {
        origin: (origin, callback): void => {
          callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        headers: ['x-user', 'X-Signature', 'accept', 'content-type', 'authorization'],
      };

      app.use(cors(corsOptions));
    }
  }

  private static setGlobalPrefix(app: NestExpressApplication): void {
    const apiPrefix = 'api/v1';
    app.setGlobalPrefix(apiPrefix);
  }

  private static setupInterceptors(app: NestExpressApplication): void {
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        excludeExtraneousValues: true,
      }),
    );
  }

  private static setupPipes(app: NestExpressApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({ transform: true }),
    );
  }

  private static setupSwagger(app: NestExpressApplication): void {
    const options = new DocumentBuilder()
      .setTitle(packageJson.name)
      .setDescription(packageJson.description)
      .setVersion(packageJson.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('app', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  private static async launch(app: NestExpressApplication): Promise<void> {
    const port = config.API.PORT;
    app.use(cookieParser());
    await app.startAllMicroservices();
    await app.listen(port);
  }

}

ApiBootstrapper.bootstrap();
