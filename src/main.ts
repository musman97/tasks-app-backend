import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GLOBAL_API_PREFIX,
  GlobalExceptionFilter,
  GlobalResponseTransformInterceptor,
  VERSION_1,
} from './common';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new GlobalResponseTransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_1,
  });

  const service = app.get(ConfigService);

  await app.listen(service.port);
}
void bootstrap();
