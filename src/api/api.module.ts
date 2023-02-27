import { Module } from "@nestjs/common";
import { FdpdController } from "./controller/fdpd.controller";
import { FdrsController } from "./controller/fdrs.controller";
import { FdmlController } from "./controller/fdml.controller";
import { CmsController } from "./controller/cms.controller";
import { CommonController } from "./controller/common.controller";
import { FdssController } from "./controller/fdss.controller";
import { FdlsController } from "./controller/fdls.controller";
import { WebModule } from "../web/web.module";

@Module({
  // TODO: import other modules what need
  imports: [WebModule],
  // imports: [],
  controllers: [
    FdpdController,
    FdrsController,
    FdssController,
    FdlsController,
    FdmlController,
    CmsController,
    CommonController,
  ],

})
export class ApiModule {}
