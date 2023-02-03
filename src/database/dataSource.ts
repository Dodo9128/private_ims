import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSource = new DataSource({
  type: (process.env.DATABASE_TYPE as string) || "mariadb",
  host: process.env.DATABASE_HOST as string,
  port: parseInt(process.env.DATABASE_PORT as string, 10) || 3306,
  username: (process.env.DATABASE_USERNAME as string) || "ims",
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  charset: process.env.DATABASE_CHARSET as string,
  timezone: (process.env.DATABASE_TIMEZONE as string) || "+09:00",
} as DataSourceOptions);

// export const AppDataSource = new DataSource({
//   type: process.env.DATABASE_TYPE || "mariadb",
//   host: process.env.DATABASE_HOST as string,
//   // port: process.env.DATABASE_PORT,
//   port: +process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   entities: [__dirname + "/**/**.entity{.ts,.js}"],
//   // synchronize: process.env.'APP_ENV' === 'development',
//   // synchronize: process.env.DATABASE_SYNCHRONIZE,
//   autoLoadEntities: true,
//   // logging: true,
//   logging: process.env.DATABASE_LOGGING,
//   keepConnectionAlive: true,
//   charset: process.env.DATABASE_CHARSET,
//   timezone: process.env.DATABASE_TIMEZONE,
// } as DataSourceOptions);
