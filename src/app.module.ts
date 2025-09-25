import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule, ConfigService } from './config';

@Module({
  imports: [configModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
