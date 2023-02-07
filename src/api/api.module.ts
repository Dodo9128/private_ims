import { Module } from "@nestjs/common";
import { FdpdController } from "./controller/fdpd.controller";
import { FdrsController } from "./controller/fdrs.controller";
import { FdmlController } from "./controller/fdml.controller";

@Module({
  // TODO: import other modules what need
  // imports: [ChannelModule, SystemModule, VenueModule, EventModule, NodeModule, ScaleModule,],
  imports: [],
  controllers: [FdpdController, FdrsController, FdmlController],
})
export class ApiModule {}
