import { DataSource, type DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config({ path: `.env.${process.env.NODE_ENV}.local` });

const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? ''),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/**/*.entity.{js,ts}'],
  migrations: ['./src/migrations/*.{js,ts}'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
};

export const AppDataSource = new DataSource(dataSourceOpts);
