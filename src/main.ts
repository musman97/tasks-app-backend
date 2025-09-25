import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GlobalExceptionFilter,
  GlobalResponseTransformInterceptor,
} from './common';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new GlobalResponseTransformInterceptor());

  const service = app.get(ConfigService);

  await app.listen(service.port);
}
void bootstrap();
