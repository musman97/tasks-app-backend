// data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { NodeEnvs } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config({ path: `.env.${process.env.NODE_ENV}.local` });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? ''),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== NodeEnvs.Production, // Never use true in production
  logging: true, // Optional: Enable SQL logging
});
