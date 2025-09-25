import { ConfigModule } from '@nestjs/config';
import { configSchema } from './config.schema';
import z from 'zod';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.env.${process.env.NODE_ENV}.local`],
  validate(config) {
    const parsed = configSchema.safeParse(config);

    if (parsed.success === false) {
      throw new Error(
        `Environment validation failed: ${JSON.stringify(z.treeifyError(parsed.error), null, 2)}`,
      );
    }

    return parsed.data;
  },
});
