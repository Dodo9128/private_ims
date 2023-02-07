import { Module } from "@nestjs/common";
import { FdpdController } from "./controller/fdpd.controller";
import { FdrsController } from "./controller/fdrs.controller";
import { FdmlController } from "./controller/fdml.controller";
import { CmsController } from "./controller/cms.controller";
import { CommonController } from "./controller/common.controller";

@Module({
  // TODO: import other modules what need
  // imports: [ChannelModule, SystemModule, VenueModule, EventModule, NodeModule, ScaleModule,],
  imports: [],
  controllers: [FdpdController, FdrsController, FdmlController, CmsController, CommonController],
})
export class ApiModule {}
