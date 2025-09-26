import { NodeEnvs } from 'src/types';
import z from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(
    [NodeEnvs.Development, NodeEnvs.Production],
    NodeEnvs.Development,
  ),
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

export type Config = z.infer<typeof configSchema>;
