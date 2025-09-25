import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { configModule, ConfigService } from './config';
import { ALL_ROUTES_CAPTURE_WILDCARD, LoggerMiddleWare } from './common';

@Module({
  imports: [configModule],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(ALL_ROUTES_CAPTURE_WILDCARD);
  }
}
