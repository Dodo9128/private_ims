// import configuration from "../../ims_nest_1/config/configuration";
import configuration from "../config/configuration";
import { LoggerMiddleware } from "./libs/middlewares/logger.middleware";
import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AppController } from "./app.controller";
import { WorldModule } from "./world/world.module";
import { WorldController } from "./world/world.controller";
import { ApiModule } from "./api/api.module";
import { FdpdController } from "./api/controller/fdpd.controller";
import { FdrsController } from "./api/controller/fdrs.controller";
import { FdmlController } from "./api/controller/fdml.controller";
import { CmsController } from "./api/controller/cms.controller";
import { CommonController } from "./api/controller/common.controller";
import { FdssController } from "./api/controller/fdss.controller";
import { FdlsController } from "./api/controller/fdls.controller";
import { ExcelModule } from "./excel/excel.module";
import { ExcelController } from "./excel/excel.controller";
import { WebModule } from "./web/web.module";
import { NodeModule } from "./node/node.module";
import { RuleModule } from "./rule/rule.module";

const node_env = process.env.NODE_ENV || "development";

let envPath = "";
switch (node_env) {
  case "development":
    envPath = ".env.development";
    break;
  case "production":
    envPath = ".env.production";
    break;
  case "local":
    envPath = ".env.local";
    break;
  case "test":
    envPath = ".env.test";
    break;

  default:
    envPath = ".env.development";
}

console.log(`Node Version: ${process.version}`);
console.log(`Environment Path is: ${envPath}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `${envPath}`,
    }),
    //TypeOrmModule.forRoot(typeormConfig),
    DatabaseModule,
    WorldModule,
    ApiModule,
    ExcelModule,
    WebModule,
    NodeModule,
    RuleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(LoggerMiddleware).forRoutes(WorldController);
    consumer.apply(LoggerMiddleware).forRoutes(FdpdController);
    consumer.apply(LoggerMiddleware).forRoutes(FdrsController);
    consumer.apply(LoggerMiddleware).forRoutes(FdmlController);
    consumer.apply(LoggerMiddleware).forRoutes(CmsController);
    consumer.apply(LoggerMiddleware).forRoutes(CommonController);
    consumer.apply(LoggerMiddleware).forRoutes(FdssController);
    consumer.apply(LoggerMiddleware).forRoutes(FdlsController);
    consumer.apply(LoggerMiddleware).forRoutes(ExcelController);
    //consumer.apply(LoggerMiddleware).forRoutes(WebController);
  }
}
