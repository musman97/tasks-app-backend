import { Injectable } from '@nestjs/common';
import { ConfigService as NConfigService } from '@nestjs/config';
import { DbConfig } from './config.types';
import { Config } from './config.schema';
import { ConfigKeys } from './config.constants';

@Injectable()
export class ConfigService {
  constructor(private readonly nConfigService: NConfigService<Config>) {}

  get dbConfig(): DbConfig {
    const host =
      this.nConfigService.get<Config['DB_HOST']>(ConfigKeys.DB_HOST) ?? '';
    const port =
      this.nConfigService.get<Config['DB_PORT']>(ConfigKeys.DB_PORT) ?? -1;
    const dbName =
      this.nConfigService.get<Config['DB_NAME']>(ConfigKeys.DB_NAME) ?? '';
    const user =
      this.nConfigService.get<Config['DB_USER']>(ConfigKeys.DB_USER) ?? '';
    const password =
      this.nConfigService.get<Config['DB_PASSWORD']>(ConfigKeys.DB_PASSWORD) ??
      '';

    console.log(
      'host',
      JSON.stringify(this.nConfigService),
      this.nConfigService.getOrThrow('DB_HOST'),
    );

    return {
      host,
      dbName,
      port,
      password,
      user,
    };
  }

  get port(): number {
    return this.nConfigService.get<Config['PORT']>(ConfigKeys.PORT) ?? -1;
  }
}
