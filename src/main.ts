import { VersioningType } from '@nestjs/common';
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

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: VERSION_1,
  });

  const service = app.get(ConfigService);

  await app.listen(service.port);
}
void bootstrap();
