import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GlobalExceptionFilter,
  GlobalResponseTransformInterceptor,
} from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new GlobalResponseTransformInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
