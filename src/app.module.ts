import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ALL_ROUTES_CAPTURE_WILDCARD, LoggerMiddleWare } from './common';
import { ConfigModule, ConfigService } from './config';
import { AuthModule, JwtGuard } from './v1/auth';
import { TaskModule } from './v1/task';
import { UsersModule } from './v1/users';

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
    TaskModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(ALL_ROUTES_CAPTURE_WILDCARD);
  }
}
