import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  // controllers: [DatabaseController],
  // providers: [DatabaseService]
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get("DATABASE_TYPE"),
          host: configService.get("DATABASE_HOST"),
          // port: configService.get("DATABASE_PORT"),
          port: +configService.get<number>("DATABASE_PORT"),
          username: configService.get("DATABASE_USERNAME"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          // entities: [__dirname + "/**/**.entity{.ts,.js}"],
          entities: [__dirname + "/../entities/**.entity{.ts,.js}"],
          // synchronize: configService.get('APP_ENV') === 'development',
          synchronize: JSON.parse(configService.get("DATABASE_SYNCHRONIZE")),
          autoLoadEntities: true,
          // logging: true,
          logging: JSON.parse(configService.get("DATABASE_LOGGING")),
          keepConnectionAlive: true,
          charset: configService.get("DATABASE_CHARSET"),
          timezone: configService.get("DATABASE_TIMEZONE"),
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
