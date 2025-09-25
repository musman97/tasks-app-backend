import { Config } from './config.schema';

type KeyOfConfig = keyof Config;
export const ConfigKeys: Record<KeyOfConfig, KeyOfConfig> = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  DB_HOST: 'DB_HOST',
  DB_NAME: 'DB_NAME',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_PORT: 'DB_PORT',
  DB_USER: 'DB_USER',
};
