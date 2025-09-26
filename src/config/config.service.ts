import { Injectable } from '@nestjs/common';
import { ConfigService as NConfigService } from '@nestjs/config';
import { DbConfig } from './config.types';
import { Config } from './config.schema';
import { ConfigKeys } from './config.constants';

@Injectable()
export class ConfigService {
  constructor(private readonly nConfigService: NConfigService<Config>) {}

  get nodeEnv(): Config['NODE_ENV'] {
    return this.nConfigService.getOrThrow<Config['NODE_ENV']>(
      ConfigKeys.NODE_ENV,
    );
  }

  get dbConfig(): DbConfig {
    const host = this.nConfigService.getOrThrow<Config['DB_HOST']>(
      ConfigKeys.DB_HOST,
    );
    const port = this.nConfigService.getOrThrow<Config['DB_PORT']>(
      ConfigKeys.DB_PORT,
    );
    const dbName = this.nConfigService.getOrThrow<Config['DB_NAME']>(
      ConfigKeys.DB_NAME,
    );
    const user = this.nConfigService.getOrThrow<Config['DB_USER']>(
      ConfigKeys.DB_USER,
    );
    const password =
      this.nConfigService.getOrThrow<Config['DB_PASSWORD']>(
        ConfigKeys.DB_PASSWORD,
      ) ?? '';

    return {
      host,
      dbName,
      port,
      password,
      user,
    };
  }

  get port(): number {
    return this.nConfigService.getOrThrow<Config['PORT']>(ConfigKeys.PORT);
  }
}
