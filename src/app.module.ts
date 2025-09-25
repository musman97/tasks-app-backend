import { Module } from '@nestjs/common';
import { configModule, ConfigService } from './config';

@Module({
  imports: [configModule],
  providers: [ConfigService],
})
export class AppModule {}
