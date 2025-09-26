import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from './config';
import { ALL_ROUTES_CAPTURE_WILDCARD, LoggerMiddleWare } from './common';
import { AuthModule } from './v1/auth';
import { UsersModule } from './v1/users';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.dbConfig;
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.dbName,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.nodeEnv !== 'production',
          logging: configService.nodeEnv !== 'production',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(ALL_ROUTES_CAPTURE_WILDCARD);
  }
}
